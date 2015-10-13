/**
 * test of queue
 *
 *
 */
'use strict';

var serialPortFactory = require('serialPort');
var async = require('async');

var map = require('../lib/DefaultMemoryMap');

var MapItem = require('../lib/mapitem');

// Read the config.json file
var config = require('./config');

var port = new serialPortFactory.SerialPort( config.port, {baudrate: config.baudrate} );


var q = async.queue(function (task, callback) {

  port.once('data', function( data ) {
    if( data.length === 3 ) {
      callback( null, data[0] );
    }
    else {
      callback( new Error('Invalid received buffer'));
    }
  });

  //port.once( 'error', function( err ) {
  //  callback( err );
  //});

  port.write( task.buffer );

});



function getItem(item, callback) {

  //console.log('getting item ' + item.name );

  var cmd = item.getReadCommands();

  if( !cmd.length ) {
    callback( new Error('Item has nothing to get'));
  }
  else {

    var tasks = [];
    cmd.forEach( function( t) {
      tasks.push( q.push.bind( q, {buffer: t }));

    });

    async.parallel( tasks, function( err, results ) {
      if( err ) {
        console.log( 'async parallel error', err);
      }
      else {
        item.value = results;
        callback( null, item.format());
      }

    });

  }
}


function get( item, callback ) {

  if(item instanceof MapItem) {
    getItem( item, callback );
  }
  else {

    var tasks = {};
    for( var key in item ) {
      tasks[key] = get.bind( get, item[key] );
    }

    async.parallel( tasks, function( err, results ) {
      if( err ) {
        callback( err );
      }
      else {
        callback( null, results );
      }

    });

  }
}

port.on('open', function () {


  get( map.ident, function(err, item) {
    console.log( 'Ident: ', item );
  } );

  get( map.meters, function(err, item) {
    console.log( 'Meters: ', item );

  } );

  get( map.status, function(err, item) {
    console.log( 'Status: ', item );

  } );

  setInterval( function() {
  get( {
    portB: map.status.targetPortB,
    portC: map.status.targetPortC,
    pwm: map.status.pwm,
    speed: map.status.speed,
    throttleV: map.status.throttleV,
    temperature: map.status.temperature,
    current:  map.status.current
  }, function(err, item) {
    console.log( 'Map: ', item );

  }); }, 1000 );



});

port.on('error', function (err) {
  console.log( err );
});


