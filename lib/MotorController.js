/**
 * This module implements a class which manages communication to a motor controller via a designated serial port
 *
 * Usage:
 *  var controller = require('./lib/MotorController.js')
 *  var mycontroller = controller( 'COM1');
 *
 *
 */
'use strict';

// built-in node utility module
var util = require('util');

// Node event emitter module
var EventEmitter = require('events').EventEmitter;

// Module which manages the serial port
var serialPortFactory = require('serialport');

// object type that represents a data item in the memory map
var MapItem = require('./mapitem');

// Library to run tasks in series or parallel and manage the queue
var async = require('async');



// Default time in milliseconds to give up waiting on a response from the controller
var DEFAULT_ITEM_TIMEOUT  = 1000;

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

  // Device memory map we will use
  me.map = require( './DefaultMemoryMap');

  // Declares a queue and the worker that processes each task
  me.q = async.queue(function (task, callback) {

    // Set a timer in case there is no response to the message we sent
    var timeout = setTimeout( function() {
      // If we get here, the timeout occurred.
      // We clean up as best we can and fail the task

      me.counters.timeout ++;

      // we don't have communication to a controller
      if( me.status.isConnected ) {
        me.status.isConnected = false;
        me.emit( 'disconnected');
      }

      callback( new Error('Message Timeout'));

    }, DEFAULT_ITEM_TIMEOUT );

    me.port.once('data', function( data ) {

      clearTimeout( timeout );

      // emit to the client that we are receiving something
      me.emit('receiving', data );

      if( data.length === 3 ) {

          // If we thought we were disconnected, and we receive a
          // response of some kind, we are now connected to a controller!
          if( !me.status.isConnected ) {
            me.status.isConnected = true;
            me.emit( 'connected');
          }

        // check for errors
        if( data[0] === 0x77 && data[1] === 0x77 && data[2] === 0x77  ) {

          // diagnostic counter
          me.counters.noClock ++;

          callback( new Error( 'No Clock'));
        }
        else if( data[0] === 0x07 && data[1] === 0x07 && data[2] === 0x07 ) {

          // diagnostic counter
          me.counters.bad ++;

          callback( new Error( 'No Sync'));

        }
        else {
          // Success!

          // return the byte
          callback( null, data[0] );
        }
      }
      else {
        callback( new Error('Invalid received buffer'));
      }
    });

    //port.once( 'error', function( err ) {
    //  callback( err );
    //});

    // emit to the client that we are sending something
    me.emit('sending', task.buffer );

    // diagnostic counter
    me.counters.sent++;

    // write to the port
    try {
      me.port.write( task.buffer );
    }
    catch( e ) {
      // This can happen if the port is removed from the system and we
      // try writing before receiving the 'closed' event
      callback( new Error( 'Port Closed'));
    }

  });

  // public status variables
  me.status = {
    isOpen      : false,
    isConnected : false,
  };

  // keep track of reconnection timers
  me.reconnectTimer = null;

  // Our message counters - used for diagnostic purposes
  me.resetCounters = function() {

    me.counters = {
      sent: 0,
      received: 0,
      timeout: 0,
      noClock: 0,
      bad: 0,
      portErrors: 0,
      portClosed: 0
    };

  };


  // The serial port object that is managed by this instance.
  // The port is not opened, just instantiated
  me.port = new serialPortFactory.SerialPort( name, config, false );

  /**
   * Attempt to reopen the port
   *
   */
  me.reconnect = function() {

    me.emit( 'reopening' );

    me.port.open(function (error) {
      if ( error ) {

      } else {
        clearInterval( me.reconnectTimer );
        me.reconnectTimer = null;
        me.status.isOpen = true;

        me.emit('open');

        // The port is open.  Check for pending requests
        if( me.q.paused ) {
          me.q.resume();
        }

      }
    });

  };

  // if there aren't any pending messages,
  // send one out just to see if the controller is still there
  me.ping = function() {
    if( me.status.isOpen && me.q.idle() ) {

      me.getItem( me.map.status.pwm, function() { });
    }
  };


  // Hook event handlers for the serialport object
  // Often we pass them through to our client
  me.port.on('open', function() {
    me.status.isOpen = true;

    me.emit('open');

    // start sending messages
    me.q.resume();

  });

  me.port.on('close', function() {

    if( me.status.isConnected ) {

      // update our status for anyone who cares
      me.status.isConnected = false;
      me.emit('disconnected');
    }

    me.status.isOpen = false;
    me.emit('close');

    me.counters.portClosed++;

    // start a timer to retry opening the port
    me.reconnectTimer = setInterval( me.reconnect, 5000 );

  });

  me.port.on('error', function(err) {
    me.counters.portErrors++;

    me.emit('error', err);
  });

  // Open the serial port.  When complete, start processing requests
  // if any
  me.open = function( callback ) {
    me.port.open( function(error) {

      if( !error ) {
        // start a ping timer to verify the connection to the controller
        setInterval( me.ping, 2000 );
        // and do it now
        me.ping();
      }

      // Notify the caller that the port is open
      if( 'function' === typeof( callback ) ) {
        callback( error );
      }
    });
  };

  // zero our diagnostic counters
  me.resetCounters();

}

// This object can emit events.  Note, the inherits
// call needs to be before .prototype. additions for some reason
util.inherits(MotorController, EventEmitter);

/**
 * Adds a MapItem get request to the queue
 *
 * This method queues a request for a single MapItem.  When
 * the request is completed, the callback will be called.
 * If successful, the err parameter of the callback will be null.
 * Otherwise, err is an Error object instance describing the problem that
 * occurred.
 *
 * @param  {MapItem}   item     The item to be retrieved
 * @param  {Function} callback(err, item) completion callback
 */
MotorController.prototype.getItem = function(item, callback) {

  var me = this;

  // Get a list of serial communication primitives needed for the request
  var cmd = item.getReadCommands();

  if( !cmd.length ) {
    callback( new Error('Item has nothing to get'));
  }
  else {

    // Build a list of queue tasks to sequentially send all the cmds
    var tasks = [];
    cmd.forEach( function( t) {
      tasks.push( me.q.push.bind( me.q, {buffer: t }));
    });

    // Run the tasks 'in parallel' (which means they are all added to the
    // serial port command queue at once, not that they will be executed in
    // parallel)
    async.parallel( tasks, function( err, results ) {
      if( err ) {
        callback( err );
      }
      else {
        item.value = results;
        callback( null, item.format());
      }

    });

  }
};

/**
 * Retrieves a MapItem or set of MapItems from the controller.
 *
 * If item is an object, it is recursively searched for MapItems.
 * All of the discovered MapItems are queried from the controller
 * before the callback is invoked.
 *
 * The callback's err parameter will be an Error object instance if
 * an error occurs.  Otherwise, it will be null, and the items object
 * will contain the MapItem values that were requested.
 *
 * Examples:
 *   c.get( c.map.aMapItem, cb );
 *   c.get( c.map.aBunchofMapItems, cb );
 *   c.get( {first: c.map.item1, second: c.map.item2 })
 *
 */
MotorController.prototype.get = function( item, callback ) {

  var me = this;

  if(item instanceof MapItem) {
    me.getItem( item, callback );
  }
  else {

    // it's not a single mapitem; for every key in the object
    // define a task that calls this method to inspect it.
    var tasks = {};
    for( var key in item ) {
      tasks[key] = me.get.bind( me, item[key] );
    }

    // run the task in parallel (at least, load all the serial
    // commands into the queue without waiting)
    async.parallel( tasks, function( err, results ) {

      // somewhere along the chain, an error occurred, so we report to our client
      if( err ) {
        callback( err );
      }
      else {
        // success! return the results object to the caller
        callback( null, results );
      }

    });

  }
};


/**
 * Public interface to this module
 *
 * The object constructor is available to our client
 *
 * @ignore
 */
module.exports = MotorController;

