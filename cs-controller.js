/**
 * Entry point for Control Solutions Node.js package
 *
 * This file exposes the API for communicating via serial port to
 * CS's controller products.
 *
 */
'use strict';

var serialPortFactory = require('serialPort');
var MotorController = require('./lib/MotorController');


function ControllerManager()
{
    var manager = this;

    // Keeps track of all the ports we are managing
    manager.ports = [];

    // Access to the serialport module list function
    manager.list = serialPortFactory.list;

    manager.addPort = function( name, config )
    {
        // Override defaults with caller's config if any
        var portConfig = {
            baudrate: 115200,  dataBits: 8, stopBits: 1,
        };

        for( var prop in config ) {
            portConfig[prop] = config[prop];
        }

        // Create and save the new controller interface object
        var thePort = new MotorController( name, portConfig );
        manager.ports.push( thePort );

        // Attempt to open (and keep open) the port
        thePort.open();

        return thePort;
    };

}

module.exports = new ControllerManager();