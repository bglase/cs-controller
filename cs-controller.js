/**
 * Entry point for Control Solutions Node.js package
 * 
 * This file exposes the API for communicating via serial port to
 * CS's controller products.
 * 
 */

/*jslint node: true */
"use strict";

var chai = require('chai');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var serialPortFactory = require('serialPort');

function ControllerManager()
{
    var manager = this;
    
    
    manager.list = serialPortFactory.list;
    
    manager.usePorts = function( portArray )
    {
      openPort( portArray[0]);
    };
    
}

/**
 * Sets the port(s) that the manager should open, and keep open.
 * 
 * The manager will attempt to open and initialize the ports supplied in the portArray.
 * If they close (eg disconnected USB cord) the manager will watch them and try to reopen
 * the port if they become available again.
 * Calling this function again updates the set of open ports and cleans up any changes to the list.
 * 
 * @param portArray array of strings corresponding to the O/S device names
 */
ControllerManager.prototype.usePorts = function( portArray )
{
  openPort( portArray[0]);
};


//Open a port, hook its events
function openPort(portName) 
{

  console.log('opening ' + portName);

  var port = new serialPortFactory.SerialPort (portName, null, false);

  var data = new Buffer("hello");
  var sendDataIntervalId;

  port.on('disconnected', function() 
  {
    clearInterval(sendDataIntervalId);
    console.log('disconnected');

    var intervalId = setInterval(function () 
    {
      reconnect(portName, intervalId);
    }, 2000 );

  });

  port.on('error', function(err) {
    chai.assert.fail('no error', err, util.inspect(err));
  });

  port.on('data', function(d) {
    chai.assert.equal(data.toString(), d.toString(), 'incorrect data received');
    process.stdout.write('r'); // data properly received
  });

  port.on('open', function() {
    console.log('opened');

    sendDataIntervalId = setInterval(function () {
      process.stdout.write('s'); // sending data
      port.write(data);
    }, 200 );

  });
  
  port.on('close', function() {

      clearInterval(sendDataIntervalId);
      console.log('closed');

    });

    port.open();
}

function reconnect(portName, intervalId) 
{
    serialPortFactory.list(function(err, ports) {

      chai.assert.isUndefined(err, util.inspect(err));
      chai.assert.isDefined(ports, 'ports is not defined');

      if (ports.length > 0 && portName == ports.slice(-1)[0].comName) {
        clearInterval(intervalId);
        openPort(portName);
      } else {
        console.log('Port ' + portName + ' not found, retrying...');
      }

    });
};



function MotorController( )
{
}



util.inherits(ControllerManager, EventEmitter);

module.exports = new ControllerManager();