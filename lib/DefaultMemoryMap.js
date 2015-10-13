/**
 * This module exports an object that represents the memory map of a controller.
 *
 * The memory map is built by including various portions of the map
 * Usage:
 *  var map = require('./lib/DefaultMemoryMap.js')
 *
 *
 */
'use strict';

module.exports = {

  ident: require( './maps/ident'),

  meters: require( './maps/meters'),

  fault: require( './maps/fault'),

  config: require( './maps/config'),

  status: require( './maps/status'),

};
