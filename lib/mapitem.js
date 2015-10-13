/**
 * Object that represents and manipulates a data item in the memory map of the controller
 *
 *
 */
'use strict';


// Define the commands that we can send to the device
var USB_I2C_WRITE_LO_RAM  = 0x00;
var USB_I2C_READ_LO_RAM   = 0x01;
var USB_I2C_WRITE         = 0x06;
var USB_I2C_READ          = 0x07;
var USB_I2C_RESET         = 0x0F;
var USB_I2C_WRITE_HI_RAM  = 0x20;
var USB_I2C_READ_HI_RAM   = 0x21;


// Constructor for Item object
function MapItem( options ) {

  // Save the address and make sure it's in array format
  this.addr = options.addr ;//|| null;

  if( !Array.isArray(this.addr)) {
    this.addr = [this.addr];
  }

  this.type = options.type || 'ee';

  this.value = options.value || 0;
  this.min = options.min || 0;
  this.max = options.max || 255;
  this.fnFormat = options.format || null;
  this.fnUnformat = options.unformat || null;
  this.name = options.name || this.type + ':' + this.addr[0];
  this.units = options.units || '';

}

MapItem.prototype.getReadCommands = function() {

  var list = [];
  var me = this;

  this.addr.forEach( function( a ) {
    if( me.type === 'ee') {
      list.push( new Buffer( [USB_I2C_READ, a, 0 ]));
    }
    else if( me.addr < 256 ) {
      list.push( new Buffer( [USB_I2C_READ_LO_RAM, a, 0 ]));

    }
    else {
      list.push( new Buffer( [USB_I2C_READ_HI_RAM, a % 256, 0] ));
    }
  });

  return list;

};

/**
 * Returns the value of this item, formatted if possible
 *
 * @return {[type]} value
 */
MapItem.prototype.format = function() {

  if( this.fnFormat ) {
    return this.fnFormat( this.value );
  }
  else {
    return this.value;
  }

};

/**
 * Returns a 16-bit word formatted as hex string, 4 chars long
 *
 */
MapItem.prototype.valueToHex16 = function() {
  return this.zeroPad((this.value[0] * 256 + this.value[1]).toString(16), 4);
};

/**
 * Returns a 8-bit byte formatted as hex string. 2 chars long
 *
 */
MapItem.prototype.valueToHex8 = function() {
  return this.zeroPad(this.value[0].toString(16), 2);
};

/**
 * Returns a byte formatted as decimal string
 *
 */
MapItem.prototype.value8 = function() {
    return this.value[0];
};

/**
 * Returns a 16-bit word formatted as decimal string
 *
 */
MapItem.prototype.value16 = function() {
    return (this.value[0] * 256 + this.value[1]);
};

/**
 * Zero pads a number (on the left) to a specified length
 *
 * @param  {number} number the number to be padded
 * @param  {number} length number of digits to return
 * @return {string}        zero-padded number
 */
MapItem.prototype.zeroPad = function( number, length ) {
  var pad = new Array(length + 1).join( '0' );

  return (pad+number).slice(-pad.length);
};

/**
 * Converts a percentage value to an item's scaled value based on its min and max
 *
 * @param item an object from the memory map that has a max and min value
 * @param value the value that should be converted from a percent
 */
MapItem.prototype.value8FromPercent = function() {
    return Math.max(
      Math.min(
        Math.round((this.value[0] * this.max / 100)-this.min), this.max),this.min);
};

/**
 * Convert a value to a percent using the item's max and min parameters
 *
 * @param item an object from the memory map that has a max and min value
 * @param value the value that should be converted to a percent
 *
 * @returns {Number}
 */
MapItem.prototype.value8ToPercent = function() {
    return Math.max(
      Math.min(
        Math.round((this.value[0]-this.min) * 100 / this.max), 100),0);
};


module.exports = MapItem;
