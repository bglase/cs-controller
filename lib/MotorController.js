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

function MotorController () {
    var self = this;
    
    // public status variables
    self.status = {
      isOpen      : false,
      isConnected : false,
      
    };

    
    // Define the commands that we can send to the device
    var USB_I2C_WRITE_LO_RAM  = 0x00;
    var USB_I2C_READ_LO_RAM   = 0x01;
    var USB_I2C_WRITE         = 0x06;
    var USB_I2C_READ          = 0x07;
    var USB_I2C_RESET         = 0x0F;
    var USB_I2C_WRITE_HI_RAM  = 0x20;
    var USB_I2C_READ_HI_RAM   = 0x21;

   this.port = serialPortFactory.SerialPort();
    
    // write primitive to send a message to the device
    self._write = function(buffer) {
  //      thePort.write( buffer );
        
    }
    

    // read primitive to read a message from the device
    self._read = function(buffer) {
    //    return thePort.read;
        
    }
    
    // Read one or more elements from the device
    self.read = function( elements ) {
        console.log( 'READING::::::');
        console.log( elements );
        return {};
    }

    self.usePort = function( port ) {
     
        if (port) { 
            // shut down the port being currently used (if any)
            
            // Start trying to open the port
            self.map = require( './DefaultMemoryMap.js');
            
            self.status.isOpen = true;
            self.emit( 'open');
        
            self.status.isConnected = true;
            self.emit( 'connect', {type: '' });
        
            self.status.isConnected = false;
            self.emit( 'disconnect')
        
            self.status.isOpen = false;
            self.emit( 'close');
        }
        else {
            // forget about the port
            
        }
    };
    
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

}




// declare the public interface.
util.inherits(MotorController, EventEmitter);
module.exports = MotorController;

