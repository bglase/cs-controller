/**
 * Demo program showing event hooks
 *
 */
'use strict';


// Declare the serial port interface
var portManager = require('cs-controller');

// Read the config.json file
var config = require('./config');

console.log( 'Attempting to open ' + config.port );

// Attempt to open the serial port
var thePort = portManager.addPort( config.port, {baudrate: config.baudrate} );


// Event hook when serial port is opened or reopened
thePort.on('open', function() {
  console.log('Port Opened: ' + this.name );
});

// Event hook when an error is detected
thePort.on('error', function(err) {
  console.log('Error: ', err);
});

// Event hook when serial port is closed or removed
thePort.on('close', function() {
  console.log('Port Closed');
});

// Event hook when we attempt to reopen the port
thePort.on('reopening', function() {
  console.log('Attempting to Reopen Port');
});

// Event hook when we detect a connected controller
thePort.on('connected', function() {
  console.log('Port Connected');

  // get a parameter from the controller
  thePort.get(thePort.map.pwm, function() {
  });

});

thePort.on('sending', function(buf) {
  console.log( 'Sending ', buf );
});

thePort.on('receiving', function(buf) {
  console.log( 'Receiving ', buf );
});

// Event hook when we detect a disconnected controller
thePort.on('disconnected', function() {
  console.log('disconnected');

});

