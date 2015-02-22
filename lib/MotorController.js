/**
 * This module implements a class which manages communication to a motor controller via a designated serial port
 * 
 * Usage: 
 *  var controller = require('./lib/MotorController.js')
 *  var mycontroller = controller( 'COM1');
 *  
 * 
 */
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var serialPortFactory = require('serialport');

// Define the commands that we can send to the device
var USB_I2C_WRITE_LO_RAM  = 0x00;
var USB_I2C_READ_LO_RAM   = 0x01;
var USB_I2C_WRITE         = 0x06;
var USB_I2C_READ          = 0x07;
var USB_I2C_RESET         = 0x0F;
var USB_I2C_WRITE_HI_RAM  = 0x20;
var USB_I2C_READ_HI_RAM   = 0x21;

// Default time in milliseconds to give up waiting on a response from the controller
var DEFAULT_ITEM_TIMEOUT  = 250;

/**
 * Returns a list of memory map elements that match the requested section name.
 * 
 * @param map - a memory map object, like DefaultMemoryMap
 * @param section a string with the section name that is desired
 */
function filterSection( map, section ) {
    var list = {};
    
    for (property in map ) {
        if( map[property].hasOwnProperty( 'section') && map[property].section.name === section )
            list[property] = map[property];
        
    }
    return list;
}




/**
 * Constructor: initializes the object and declares its public interface
 * 
 * @param string name: the name of the port (as known to the operating system)
 * @param object config: optional object containing configuration parameters:
 *        Options are as stated for the node serialport module:
 *          baudRate, dataBits, stopBits, parity, rtscts, disconnectedCallback, etc
 *          refer to https://github.com/voodootikigod/node-serialport for details.
 */
function MotorController (name, config) {
    var me = this;
   
    // Initialize the state of this object instance
    me.name = name;
    me.map = require( './DefaultMemoryMap');
    
    // Init the queue of requests
    me.queue = [];
    
    // public status variables
    me.status = {
      isOpen      : false,
      isConnected : false,
      
    };

    // Event callback when a request to the device times out.
    // This will happen when there is no device attached, or something is 
    // broken
    function itemTimeout( )
    {
        console.log( 'Timeout!!!!!!');
    }
    
    function txItem( action, item )
    {

        if( action == USB_I2C_READ )
            var req = new Buffer( [action, item.eeAddr, item.data ]);
        else if( action == USB_I2C_READ_HI_RAM ) {

            if( item.ramAddr < 256 )
                action = USB_I2C_READ_LO_RAM;

            var req = new Buffer( [action, item.ramAddr % 256, item.data ]);

        }


        console.log( req );
        
        item.timer = setTimeout( itemTimeout, DEFAULT_ITEM_TIMEOUT);
        
        me.port.write( req );
        
    }
    
    // If there is another request on the queue, start processing it
    function sendNextRequest() {
        if( me.queue.length > 0 ) {
            var request = me.queue[0];
            console.log( 'Starting ' + request.action + ' with ' + request.items.length + ' items');
            txItem( request.action, request.items[request.nextItem]);
        }
    }
    
    function clearQueue() {
        while( me.queue.length > 0 ) {
            var req = me.queue.shift();
            if( 'function' == typeof( req.callback ))
                req.callback( 'cancelled');
            
            // cancel timer
            
            // @todo is this request currently in progress, and if so what?
            
        }
            
    }
    
    function enqueue( action, items, callback )
    {
        var list = [];

        if( 'array' == typeof( items )) {
            for( var i = 0; i < items.length; i++ )
                list.push.apply( list, me.map.fn.flatten( items[i] ));
        }
        else
            list = me.map.fn.flatten( items );

        console.log( 'enqueue counted ' + list.length);
        console.log( list);
        
        // @todo resolve the right action to queue
        if( action == 'get') 
            action = USB_I2C_READ;
        else if( action == 'readRam' )
            action = USB_I2C_READ_HI_RAM;
        
        // If timeout was not specified, default it (and add 250 ms for good measure
        //if( 'function' == typeof( timeout ) ) {
        //    callback = timeout;
        //    timeout = itemCount * DEFAULT_ITEM_TIMEOUT + 250;
       // }
            
        // Bundle up all the stuff we want to remember about this request
        var request = {
            action: action,
            //timeout: maxTime,
            callback: callback,
            items: list,
            nextItem: 0,
        };
        
        
        // Add it to the queue
        me.queue.push( request );
        console.log( 'queue length: ' + me.queue.length );
        
        // If this is the first request, start processing the queue
        if( me.queue.length == 1 && me.status.isOpen )
            sendNextRequest();
    }
    
    // The serial port object that is managed by this instance.
    // The port is not opened, just instantiated
    me.port = new serialPortFactory.SerialPort( name, config, false );

    // Event handler which is invoked when data is received on the port
    me.port.on('data', function(data) {
        console.log( data );
       
        // if there is no request, it was probably canceled so just silently ignore
        if( me.queue.length > 0 ) {
            
            var request = me.queue[0];
            var item = request.items[request.nextItem];
            
            //console.log(item);
            //console.log(typeof( item.timer ));
            
            if( 'undefined' != typeof( item.timer )) {
                clearTimeout( item.timer );
                delete item.timer;
            }
            
            // check for errors
            if( data[0] == 0x77 && data[1] == 0x77 && data[2] == 0x77) {
                if( request.callback ) 
                    request.callback( 'I2C Error' );
                me.queue.shift();
                sendNextRequest();
            }
            else if( data == Buffer([ 0x88, 0x88, 0x88 ])) {
                if( request.callback ) 
                    request.callback( 'Invalid Command' );
                me.queue.shift();
                sendNextRequest();
            }
            else {
                // The return message should match the sent type
                if( 'function' == typeof( item.toFriendly))
                    item['value'] = item.toFriendly( item, data[0]);
                else
                    item['value'] = data[0];
                
                request.nextItem++;
                
                if( request.nextItem >= request.items.length ) {
                    // we are done with this request
                    if( request.callback ) 
                        request.callback( false, { complete: true, items: request.items } );
                    
                    me.queue.shift();
                    sendNextRequest();
                }
                else {
                    // send the next item
                    txItem(request.action, request.items[request.nextItem]);
                    
                } 
            }
        }
        
    });

    me.port.on( 'error', function( error ) {
       console.error( 'Serial Port Error: ' + error ); 
        
    });

    // Open the serial port.  When complete, start processing requests
    // if any
    me.open = function( callback ) {
        me.port.open( function(error) {
            
            if( !error ) {
                
                // For now there is only one memory map
                me.map = require( './DefaultMemoryMap.js');
                
                me.status.isOpen = true;
    
                // The port is open.  Check for pending requests
                if( me.queue.length > 0 )
                    sendNextRequest();
            }
            
            // Notify the caller that the port is open
            if( 'function' == typeof( callback ) ) 
                callback( error );
            else
                self.emit( 'open', error );
        } );
    }
    
    me.get = function( items, callback ) {
      enqueue( 'get', items, callback);
    };

    me.readRam = function( items, callback ) {
      enqueue( 'readRam', items, callback);
    };
    
/*
    // Read from the EEPROM and return the value(s) retrieved.
    // Throws an error if the read fails
    // element can be:
    //      a string: returns an array containing the value of all parameters with that section name
    //      a property of the self.map: returns the value of that parameter 
    //      null: returns an array with all the values in the EEPROM
    self.readEeprom = function( element ) {
        
        // if no parameter read the whole map
        if (!element) {
            return self.read( self.map );
        }
        
        // if it's a specific memory map item that is desired
        if( typeof (element) === 'object' ) {
            if( element.hasOwnProperty( 'eeAddr' )) {
                return self.read( element );
            }
            else {
                // assume the element is a section and read all items in the section
                var list = filterSection( self.map, element.name );
                return self.read( list );
            }
                
        }

        
    };
*/
    
}




// declare the public interface.
util.inherits(MotorController, EventEmitter);
module.exports = MotorController;

