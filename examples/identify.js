/**
 * This example opens the serial port and queries the attached controller
 *
 *
 */
'use strict';

// Declare the serial port interface
var portManager = require('cs-controller');

// Read the config.json file
var config = require('./config');

// Attempt to open the serial port
var thePort = portManager.addPort( config.port, { baudrate: config.baudrate });

// Event hook when we detect a connected controller
thePort.once('connected', function() {
  console.log('Port Connected');

  thePort.get( thePort.map.ident, function( err, data ) {
    if( err ) {
      console.log( err );
    }
    else {
      console.log( data );
    }

    process.exit(0);
  });
});
