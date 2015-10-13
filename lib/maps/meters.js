/**
 * Memory map for METERs in EEPROM
 *
 */
'use strict';

var MapItem = require('../mapitem');

module.exports = {

  runtimeHours: new MapItem({
    name: 'Runtime Hours',
    writable: false,
    type: 'ee',
    addr: [0x62, 0x63],
    format: function() { return this.value8();}
  }),

  chargeNoFloat: new MapItem({
    name: 'Incomplete Charge',
    writable: false,
    type: 'ee',
    addr: 0x64,
    format: function() { return this.value8();}
  }),


  lowBattHours: new MapItem({
    name: 'Low Batt Hours',
    writable: false,
    type: 'ee',
    addr: [0x65, 0x66],
    format: function() { return this.value16();}
  }),

  overtempCounter: new MapItem({
    name: 'Overtemp Faults',
    writable: false,
    type: 'ee',
    addr: 0x67,
    format: function() { return this.value8();}
  }),

  throttleFaultCounter: new MapItem({
    name: 'Throttle Faults',
    writable: false,
    type: 'ee',
    addr: 0x68,
    format: function() { return this.value8();}
  }),

};