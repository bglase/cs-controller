/**
 * This module exports an object that represents the memory map of a controller.
 * 
 * Usage: 
 *  var map = require('./lib/DefaultMemoryMap.js')

 *  
 * 
 */

// Calculation methods
var cms_NO_SCALING         =  0;
var cms_NORMAL_SCALING     =  1;
var cms_INVERT_SCALING     =  2;
var cms_INTEGER            =  3;
var cms_TIME_SCALING       =  4;
var cms_PERCENT            =  5;
var cms_INVERT_PERCENT     =  6;
var cms_VOLT_SCALING       =  7;
var cms_FULL_VOLT_SCALING  =  8;
var cms_SHUT_VOLT_SCALING  =  9;
var cms_CURRENT_SB         = 10;
var cms_BIT_FLAG           = 11;
var cms_SCALE_100_INT      = 12;
var cms_CURRENT_SCALING    = 13;
var cms_HEX                = 14;
var cms_DSP_ONEB_BATTV_DP  = 15;
var cms_DSP_TEMP_C         = 16;
var cms_DSP_THROTV_DP      = 17;
var cms_DSP_BATTV_DP       = 18;
var cms_DSP_CURRENT_DP     = 19;
var cms_DSP_HOURS_UP       = 20;
var cms_DSP_HR_MIN_UP      = 21;
var cms_DSP_UPDATE_DEC     = 22;
var cms_DSP_UPDATE_HEX     = 23;
var cms_ASCII              = 24;




//--- For bitwise operations Active High { 1 : ON, 0 : OFF }
var ACTIVE_HIGH     = 0x01;
//--- For bitwise operations Active Low { 0 : ON, 1 : OFF }
var ACTIVE_LOW      = 0x00;

//--- Some RAM variables do not have EEPROM counter-part variables. 
//--- These are set to the value RAM VAR ONLY
var RAM_VAR_ONLY                 = 0xFF;

var EE_NONE                      = 0x00;

var EE_MAXIMUM_SPEED             = 0x00;
var EE_FAULT_CODE_POINTER        = 0x01;
var EE_MISC_BITS                 = 0x02;
var EE_FIRMWARE_REV_HI           = 0x03;
var EE_FIRMWARE_REV_LO           = 0x04;

//--- Calibration settings ----
var EE_CAL_CURRENT_GAIN_LO       = 0x05;
var EE_CAL_CURRENT_GAIN_HI       = 0x06;
var EE_CAL_CURRENT_OFFSET_LO     = 0x07;
var EE_CAL_CURRENT_OFFSET_HI     = 0x08;
var EE_CAL_CURRENT_GAIN_02_LO    = 0x09;
var EE_CAL_CURRENT_GAIN_02_HI    = 0x0A;
var EE_CAL_CURRENT_OFFSET_02_LO  = 0x0B;
var EE_CAL_CURRENT_OFFSET_02_HI  = 0x0C;
var EE_CAL_BATTERY_GAIN_LO       = 0x0D;
var EE_CAL_BATTERY_GAIN_HI       = 0x0E;
var EE_CAL_BATTERY_OFFSET_LO     = 0x0F;
var EE_CAL_BATTERY_OFFSET_HI     = 0x10;
var EE_CAL_TEMP_GAIN_LO          = 0x11;
var EE_CAL_TEMP_GAIN_HI          = 0x12;
var EE_CAL_TEMP_OFFSET_LO        = 0x13;
var EE_CAL_TEMP_OFFSET_HI        = 0x14;
var EE_CAL_TEMP_CUTOFF_LO        = 0x15;
var EE_CAL_TEMP_CUTOFF_HI        = 0x16;

var EE_CONFIGURE_OPTION_03       = 0x17;
var EE_CONFIGURE_OPTION_01       = 0x18;
var EE_DEAD_BAND                 = 0x19;
var EE_DEAD_BAND_02              = 0x1A;
var EE_FAIL_BAND                 = 0x1B;
var EE_FAIL_BAND_02              = 0x1C;
var EE_THROTTLE_SCALE            = 0x1D;
var EE_THROTTLE_02_SCALE         = 0x1E;

var EE_THROTTLE_FLAGS            = 0x1F;
var EE_MOTOR_FLAGS               = 0x20;
var EE_CURRENT_LIMIT_LOWER       = 0x21;
var EE_CURRENT_LIMIT_UPPER       = 0x22;


var EE_CONFIGURE_OPTION_04       = 0x23;
var EE_BATTERY_RESISTANCE        = 0x24;
var EE_MOTOR_BALANCE             = 0x25;
var EE_TIMEOUT                   = 0x26;
var EE_FULL_VOLTAGE              = 0x27;
var EE_FLASH_VOLTAGE             = 0x28;
var EE_SEAT_CURRENT_PWM          = 0x29;

var EE_OUTDOOR_MOTOR_COMP        = 0x2A;
var EE_INDOOR_MOTOR_COMP         = 0x2B;
var EE_FORWARD_SPEED             = 0x2C;
var EE_REVERSE_SPEED             = 0x2D;
var EE_INDOOR_FWD_SPEED          = 0x2E;
var EE_INDOOR_RVS_SPEED          = 0x2F;
var EE_OUT_STEERING_PWM_SCALING  = 0x30;
var EE_IN_STEERING_PWM_SCALING   = 0x31;
var EE_MINIMUM_SPEED             = 0x32;
var EE_MINIMUM_SPEED_STEERING    = 0x33;
var EE_MAX_STEERING_DRIVE_PWM    = 0x34;
var EE_EMB_BRAKE_TIME            = 0x35;

//--- Outdoor Movement EEPROM addresses
var EE_FORWARD_ACCEL             = 0x36;
var EE_FORWARD_DECEL             = 0x37;
var EE_FWD_RVS_DECEL             = 0x38;
var EE_REVERSE_ACCEL             = 0x39;
var EE_REVERSE_DECEL             = 0x3A;
var EE_RVS_FWD_DECEL             = 0x3B;

//--- Indoor EEPROM addresses
var EE_INDOOR_FWD_ACCEL          = 0x3C;
var EE_INDOOR_FWD_DECEL          = 0x3D;
var EE_INDOOR_FWD_RVS_DECEL      = 0x3E;
var EE_INDOOR_RVS_ACCEL          = 0x3F;
var EE_INDOOR_RVS_DECEL          = 0x40;
var EE_INDOOR_RVS_FWD_DECEL      = 0x41;
var EE_OUTDOOR_STEERING_ACCEL    = 0x42;
var EE_OUTDOOR_STEERING_DECEL    = 0x43;
var EE_INDOOR_STEERING_ACCEL     = 0x44;
var EE_INDOOR_STEERING_DECEL     = 0x45;
var EE_COMP_RESPONSE             = 0x46;
var EE_RAMP_SHAPE                = 0x47;
var EE_FEEDBACK_ACCEL            = 0x48;
var EE_FEEDBACK_DECEL            = 0x49;
var EE_HOLD_TIME                 = 0x4A;
var EE_DISPLAY_TYPE              = 0x4B;
var EE_KEY_OFF                   = 0x4C;
var EE_CONFIGURE_OPTION_02       = 0x4D;
var EE_CURRENT_LIMIT_TIME        = 0x4E;

//--- BAND MOTOR COMP addresses
var EE_PUSH_SPEED                = 0x4F;
var EE_FWD_PLUG_TIME             = 0x50;
var EE_REV_PLUG_TIME             = 0x51;
var EE_CONFIGURE_OPTION_05       = 0x52;
var EE_CONFIGURE_OPTION_06       = 0x53;

//--- Advanced Options 01
var EE_OUTDOOR_CREEP_SPEED       = 0x54;
var EE_INDOOR_CREEP_SPEED        = 0x55;
var EE_ANTI_ROLLBACK_STOP        = 0x56;
var EE_ULTA_THROT_FLAGS          = 0x57;
var EE_EM_BRAKE_VOLTAGE          = 0x58;
var EE_MISC_1_2                  = 0x59;
var EE_MISC_3_4                  = 0x5A;
var EE_SHUT_DOWN_VOLTAGE         = 0x5B;
var EE_ANIN_INPUT_01_TYPE        = 0x5C;
var EE_ANIN_INPUT_02_03_TYPE     = 0x5D;
var EE_CONFIG_OPTION_09          = 0x5E;

//--- Counters
var EE_TIMER_HOURS_HI            = 0x60;
var EE_TIMER_HOURS_LO            = 0x61;

//---   Meters Menu Counters
var EE_RUNTIME_HOURS             = 0x62;
var EE_RUNTIME_MINUTES           = 0x63;
var EE_CHARGE_NO_FLOATS_COUNTER  = 0x64;
var EE_LOW_BATT_HOURS            = 0x65;
var EE_LOW_BATT_MINUTES          = 0x66;
var EE_OVER_TEMP_COUNTER         = 0x67;
var EE_THROTTLE_FAULT_COUNTER    = 0x68;
var EE_COUNTER_09                = 0x69;
var EE_COUNTER_10                = 0x6A;
var EE_COUNTER_0A                = 0x6B;
var EE_COUNTER_0B                = 0x6C;
var EE_COUNTER_0C                = 0x6D;
var EE_COUNTER_0D                = 0x6E;
var EE_COUNTER_0F                = 0x6F;

//--- Fault Codes
var EE_FAULT_CODES               = 0x70;
var EE_FAULT_CODE_01             = 0x70;
var EE_FAULT_CODE_02             = 0x71;
var EE_FAULT_CODE_03             = 0x72;
var EE_FAULT_CODE_04             = 0x73;
var EE_FAULT_CODE_05             = 0x74;
var EE_FAULT_CODE_06             = 0x75;
var EE_FAULT_CODE_07             = 0x76;
var EE_FAULT_CODE_08             = 0x77;
var EE_FAULT_CODE_09             = 0x78;
var EE_FAULT_CODE_10             = 0x79;
var EE_FAULT_CODE_11             = 0x7A;
var EE_FAULT_CODE_12             = 0x7B;
var EE_FAULT_CODE_13             = 0x7C;
var EE_FAULT_CODE_14             = 0x7D;
var EE_FAULT_CODE_15             = 0x7E;
var EE_FAULT_CODE_16             = 0x7F;


var EE_SENSOR_FWD_LIMIT          = 0x80;
var EE_SENSOR_RVS_LIMIT          = 0x81;

//--- Timers EEPROM addresses
var EE_MAX_DRIVE_TIME            = 0x82;
var EE_MAX_ALLOWED_PWM           = 0x83;
var EE_COMP_VOLTS                = 0x84;
var EE_SENSOR_STOP_TIME          = 0x85;

var EE_CONFIG_OPTION_08          = 0x86;

//--- Battery Voltage Current
var EE_HIGH_VOLTAGE_CUTOFF       = 0x87;

var EE_SHABAT_BEGIN              = 0x98;
var EE_SHABAT_END                = 0xD0;

//--- Newly added EE Addresses for BOARD TYPE
var EE_BOARD_HIGH_BYTE           = 0xF0;
var EE_BOARD_MID_BYTE            = 0xF1;
var EE_BOARD_LO_BYTE             = 0xF2;

//--- Peripherals implemented for system
var EE_PERIPHERALS               = 0x5F;
var EE_PERI_PRIORITY             = 0x88;

var EE_NOMINAL_BATTERY           = 0xF6;
var EE_TARGET_FLAGS              = 0xF7;
var EE_RAM_ADD                   = 0xF8;

var EE_PRODUCT_ID_HI             = 0xF9;
var EE_PRODUCT_ID_LO             = 0xFA;
var EE_SER_NUM_03                = 0xFB;
var EE_SER_NUM_02                = 0xFC;
var EE_SER_NUM_01                = 0xFD;
var EE_SER_NUM_00                = 0xFE;
var EE_CHECKSUM_NOT_USED         = 0xFF;

//--- Options 01

var EE_BATT_VOLTAGE_LO           = RAM_VAR_ONLY;
var EE_BATT_VOLTAGE_HI           = RAM_VAR_ONLY;
var EE_CURRENT_LO                = RAM_VAR_ONLY;
var EE_CURRENT_HI                = RAM_VAR_ONLY;


var EE_FAULT_PTR                 = RAM_VAR_ONLY;
var EE_THROTTLE_HI               = RAM_VAR_ONLY;
var EE_THROTTLE_LO               = RAM_VAR_ONLY;
var EE_FET_TEMP_LO               = RAM_VAR_ONLY;
var EE_FET_TEMP_HI               = RAM_VAR_ONLY;
var EE_MAX_SPEED                 = RAM_VAR_ONLY;
var EE_THROTTLE_VALUE            = RAM_VAR_ONLY;
var EE_PWM                       = RAM_VAR_ONLY;
var EE_SPEED                     = RAM_VAR_ONLY;
var EE_TGT_MISC_FLAG_0           = RAM_VAR_ONLY;
var EE_TGT_MISC_FLAG_5           = RAM_VAR_ONLY;
var EE_TGT_MISC_FLAG_8           = RAM_VAR_ONLY;
var EE_TARGET_MODE               = RAM_VAR_ONLY;
var EE_ANALOG_IN                 = RAM_VAR_ONLY;
var EE_TARGET_PORT_B             = RAM_VAR_ONLY;
var EE_TARGET_PORT_C             = RAM_VAR_ONLY;
var EE_ULTA_MISC                 = RAM_VAR_ONLY;
var EE_CHARGE_TIME               = RAM_VAR_ONLY;
var EE_CHARGE_MODE               = RAM_VAR_ONLY;
var EE_METER_HOURS               = RAM_VAR_ONLY;
var EE_METER_MINUTES             = RAM_VAR_ONLY;
//var EE_LOW_BATT_MINUTES        =   RAM_VAR_ONLY;
//var EE_LOW_BATT_HOURS          =   RAM_VAR_ONLY;
//var EE_OVER_TEMP_COUNTER          RAM_VAR_ONLY;



var EE_TEMP_CUTOFF               = 0x00;      //--- RAM ONLY VALUE



//--- RAM ADDRESS ASSIGNMENTS ------------------------------------------------
var RAM_UNKNOWN                    = 0x000;

var RAM_CAL_CURRENT_GAIN_LO        = 0x0A5;
var RAM_CAL_CURRENT_GAIN_HI        = 0x0A6;
var RAM_CAL_CURRENT_OFFSET_LO      = 0x0A7;
var RAM_CAL_CURRENT_OFFSET_HI      = 0x0A8;
var RAM_CAL_CURRENT_GAIN_02_LO     = 0x0A9;
var RAM_CAL_CURRENT_GAIN_02_HI     = 0x0AA;
var RAM_CAL_CURRENT_OFFSET_02_LO   = 0x0AB;
var RAM_CAL_CURRENT_OFFSET_02_HI   = 0x0AC;
var RAM_CAL_BATTERY_GAIN_LO        = 0x0AD;
var RAM_CAL_BATTERY_GAIN_HI        = 0x0AE;
var RAM_CAL_BATTERY_OFFSET_LO      = 0x0AF;
var RAM_CAL_BATTERY_OFFSET_HI      = 0x1A0;
var RAM_CAL_TEMP_GAIN_LO           = 0x1A1;
var RAM_CAL_TEMP_GAIN_HI           = 0x1A2;
var RAM_CAL_TEMP_OFFSET_LO         = 0x1A3;
var RAM_CAL_TEMP_OFFSET_HI         = 0x1A4;
var RAM_CAL_TEMP_CUTOFF_LO         = 0x1A5;
var RAM_CAL_TEMP_CUTOFF_HI         = 0x1A6;

var RAM_PERI_PRIORITY              = 0x1B8;




var RAM_BATT_VOLTAGE_HI           = 0x056;
var RAM_BATT_VOLTAGE_LO           = 0x057;

var RAM_THROTTLE_HI               = 0x060;
var RAM_THROTTLE_LO               = 0x061;

var RAM_FET_TEMP_HI               = 0x062;
var RAM_FET_TEMP_LO               = 0x063;

var RAM_BATT_VALUE_HI             = 0x064;
var RAM_BATT_VALUE_LO             = 0x065;

var RAM_CURRENT_HI                = 0x066;
var RAM_CURRENT_LO                = 0x067;

//--- newly added
var RAM_TARGET_PORT_B             = 0x006;
var RAM_TARGET_PORT_C             = 0x007;
var RAM_MAX_SPEED                 = 0x0A0;
var RAM_THROTTLE_VALUE            = 0x029;
var RAM_PWM                       = 0x02E;
var RAM_SPEED                     = 0x02A;
var RAM_TGT_MISC_FLAG_0           = 0x020;
var RAM_TGT_MISC_FLAG_5           = 0x025;
var RAM_TGT_MISC_FLAG_8           = 0x028;
var RAM_TARGET_MODE               = 0x037;
var RAM_ANALOG_IN                 = 0x06A;
var RAM_ULTA_MISC                 = 0x07E;
var RAM_CHARGE_MODE               = 0x05F;
var RAM_CHARGE_TIME               = 0x0A2;

var RAM_FORWARD_SPEED             = 0xCC;
var RAM_REVERSE_SPEED             = 0xCD;
var RAM_MINIMUM_SPEED             = 0xD2;
var RAM_FORWARD_ACCEL             = 0xD6;
var RAM_FORWARD_DECEL             = 0xD7;
var RAM_FWD_RVS_DECEL             = 0xD8;
var RAM_REVERSE_ACCEL             = 0xD9;
var RAM_REVERSE_DECEL             = 0xDA;
var RAM_RVS_FWD_DECEL             = 0xDB;


var RAM_INDOOR_FWD_SPEED          = 0xCE;
var RAM_INDOOR_RVS_SPEED          = 0xCF;
var RAM_INDOOR_FWD_ACCEL          = 0xDC;
var RAM_INDOOR_FWD_DECEL          = 0xDD;
var RAM_INDOOR_FWD_RVS_DECEL      = 0xDE;
var RAM_INDOOR_RVS_ACCEL          = 0xDF;
var RAM_INDOOR_RVS_DECEL          = 0xE0;
var RAM_INDOOR_RVS_FWD_DECEL      = 0xE1;


//--- RAM BAND MOTOR COMP addresses -------------
var RAM_DEAD_BAND                 = 0xB9;
var RAM_FAIL_BAND                 = 0xBB;
var RAM_THROTTLE_SCALE            = 0xBD;
var RAM_OUTDOOR_MOTOR_COMP        = 0xCA;
var RAM_INDOOR_MOTOR_COMP         = 0xCB;
var RAM_COMP_RESPONSE             = 0xE6;
var RAM_RAMP_SHAPE                = 0xE7;
var RAM_PUSH_SPEED                = 0xEF;
var RAM_KEY_OFF                   = 0xEC;



//--- RAM Timers EEPROM addresses
var RAM_EMB_BRAKE_TIME            = 0x0D5;
var RAM_DEAD_BAND_TIME            = 0x0B9;
var RAM_FWD_PLUG_TIME             = 0x190;
var RAM_REV_PLUG_TIME             = 0x191;
var RAM_HOLD_TIME                 = 0x0EA;
var RAM_MAX_DRIVE_TIME            = 0x1B2;
var RAM_SENSOR_STOP_TIME          = 0x1B5;
var RAM_TIMEOUT                   = 0x0C6;
var RAM_CURRENT_LIMIT_TIME        = 0x0EE;
var RAM_FULL_VOLTAGE              = 0x0C7;

var RAM_TIMER_HOURS_HI            = 0x1A0;
var RAM_TIMER_HOURS_LO            = 0x1A1;
var RAM_CHAGE_NO_FLOATS           = 0x1A4;

var RAM_LOW_BATT_MINUTES          = 0x1A5;
var RAM_LOW_BATT_HOURS            = 0x1A6;

var RAM_OVER_TEMP_COUNTER         = 0x1A7;


//--- RAM Battery Voltage Current
var RAM_TOP_SEG_VOLTAGE           = 0x0C7;
var RAM_FLASH_VOLTAGE             = 0x0C8;
var RAM_EM_BRAKE_VOLTAGE          = 0x198;
var RAM_SHUT_DOWN_VOLTAGE         = 0x19B;
var RAM_HIGH_VOLTAGE_CUTOFF       = 0x1B7;
var RAM_CURRENT_LIMIT_LOWER       = 0x0C1;
var RAM_CURRENT_LIMIT_UPPER       = 0x0C2;
var RAM_BATTERY_RESISTANCE        = 0x0C4;
var RAM_COMP_VOLTS                = 0x1B4;


//---   RAM Meters Menu Counters
var RAM_METER_HOURS               = 0x1A2;
var RAM_METER_MINUTES             = 0x1A3;
var RAM_CHARGE_NO_FLOATS_COUNTER  = 0x1A4;
var RAM_THROTTLE_FAULT_COUNTER    = 0x1A8;


var RAM_OUTDOOR_CREEP_SPEED       = 0x194;
var RAM_INDOOR_CREEP_SPEED        = 0x195;
var RAM_ANTI_ROLLBACK_STOP        = 0x196;


var RAM_CONFIGURE_OPTION_01       = 0x0B8;
var RAM_CONFIGURE_OPTION_02       = 0x0ED;
var RAM_CONFIGURE_OPTION_03       = 0x017;
var RAM_CONFIGURE_OPTION_04       = 0x0C3;
var RAM_CONFIGURE_OPTION_05       = 0x192;
var RAM_CONFIGURE_OPTION_06       = 0x193;
var RAM_CONFIGURE_OPTION_07       = 0x0C0;

var RAM_THROTTLE_FLAGS            = 0x0BF;
var RAM_U_THROTTLE_FLAGS          = 0x197;
var RAM_TARGET_FLAGS              = 0x000;   //--- Field is EEPROM only
var RAM_FAULT_PTR                 = 0x0A1;


var RAM_MISC_1_2                  = 0x199;
var RAM_MISC_3_4                  = 0x19A;


// Max/min constants
var FULL_SCALE                    = 0xFF;
var MAX_ACCEL                     = 0xFE;
var MIN_ACCEL                     = 0x20;
var MAX_COMP                      = 0xF0;
var MIN_KEY_OFF                   = 0x20;
var MIN_FLASH_V                   = 0x64;
var MIN_FULL_V                    = 0x81;

var MIN_FLASH_VOLTAGE             = 18.0;
var MAX_FLASH_VOLTAGE             = 23.0;
                                 
var MIN_FULL_VOLTAGE              = 23.1;
var MAX_FULL_VOLTAGE              = 26.0;

var MIN_SPEED_MAX                 = 0x80;
var MIN_HOLD_TIME                 = 0x80;
var MAX_HOLD_TIME                 = 0xFE;
var MAX_RAMP_SHAPE                = 0x0F;
var MAX_KEY_OFF                   = 0xFE;
var MAX_TIMEOUT                   = 0xF0;
var MAX_FLASH_V                   = 0x80;
var MAX_FULL_V                    = 0x91;
var MAX_CURRENT_TIME              = 0xFD;
var MAX_CURRENT_LIM               = 0xF0;

var MAX_SHUT_VOLT                 = 29.94;
var MIN_SHUT_VOLT                 =  3.58;
var MAX_EM_BRAKE_VOLT             = 45.72;

var MAX_SHUT_VAL                  = 0xA7;
var MIN_SHUT_VAL                  = 0x14;

//--- Default indicates bit fields are active high
var DEF_ACT_MASK                  = 0x00;

//--- The active masks are defined as follows: Unused bits are "0"
//---   Note: If all bits are active high, the bit mask and the
//---         active high bit mask are identical (i.e. one mask
//---         is used for both.
//---         If all bits are active low, the active high bit
//---         mask is the: ~active_bit_mask
//---   Value "1" indicates bit position is "Active High"
//---   Value "0" indicates bit position is "Active Low" 
var OPT_01_ACT_MASK               = 0xEF;
var OPT_02_ACT_MASK               = 0x28;
var OPT_03_ACT_MASK               = 0x2F;
var OPT_04_ACT_MASK               = 0x6B;
var OPT_05_ACT_MASK               = 0x43;
var OPT_06_ACT_MASK               = 0xFE;
var OPT_07_ACT_MASK               = 0x7F; // 0x26
var DISP_TYP_ACT_MASK             = 0x0F;
var PERI_ACT_MASK                 = 0xFF;

var THROT_ACT_MASK                = 0x15;
var U_THROT_ACT_MASK              = 0x0D;
var TARGET_ACT_MASK               = 0x02;
var TGT_ACT_FLG0_MASK             = 0x02;
var TGT_ACT_FLG5_MASK             = 0x80;
var TGT_ACT_FLG8_MASK             = 0x80;
var TGT_ACT_MODE_MASK             = 0x80;
var TRT_ACT_PORTB_MASK            = 0x23;
var ULTA_ACT_MISC_MASK            = 0x4A;
var PORT_B_ACT_MASK               = 0x23;
var PORT_C_ACT_MASK               = 0xC1;

//--- These are the active bit positions in the field
var OPT_01_MASK                   = 0xEF;
var OPT_02_MASK                   = 0xEC;
var OPT_03_MASK                   = 0x6F;
var OPT_07_MASK                   = 0xF7;
var ULTA_MISC_MASK                = 0x5A;

var METER_MASK                    = 0x80;
var U_THROT_MASK                  = 0x0F;
var PORT_B_MASK                   = 0x23;
var PORT_C_MASK                   = 0xC1;

var SHUT_VOLT_LSB     = ( MAX_SHUT_VOLT / MAX_SHUT_VAL );

var MAX_CURRENT_LIMIT    = 292.5;
var MIN_CURRENT_LIMIT    =   1.2;

var MIN_SPEED_LSB   = ( ( 1.0 / MIN_SPEED_MAX ) * 100.0 );

var FULL_PCNT_LSB   = ( ( 1.0 / FULL_SCALE ) * 100.0 );
var ACCEL_PCNT_LSB  = ( ( 1.0 / ( MAX_ACCEL - MIN_ACCEL )  ) * 100.0 );
var HOLD_TIME_LSB   = ( ( 1.0 / ( MAX_HOLD_TIME - MIN_HOLD_TIME ) ) * 100.0 );
var KEY_PCNT_LSB    = ( ( 1.0 / ( MAX_KEY_OFF   - MIN_KEY_OFF   ) ) * 100.0 );

var TIME_BYTE_LSB   = ( ( 1.0 / FULL_SCALE ) * 10.24 );
var EM_BRAKE_LSB    = ( MAX_EM_BRAKE_VOLT / FULL_SCALE );

var parameterCategories = {
        outdoorOptions: { name: 'Outdoor Options' },
        personality:    { name: 'Personality'},
    };

/**
 * Converts a percentage value to an item's scaled value based on its min and max
 * 
 * @param item an object from the memory map that has a max and min value
 * @param value the value that should be converted from a percent
 */
function valueFromPercent( item, value ) {
    return Math.max( Math.min( Math.round((value * item.max / 100)-item.min), item.max),item.min);
}

/**
 * Convert a value to a percent using the item's max and min parameters
 * 
 * @param item an object from the memory map that has a max and min value
 * @param value the value that should be converted to a percent
 * 
 * @returns {Number}
 */
function valueToPercent( item, value ) {
    return Math.max(Math.min(Math.round((value-item.min) * 100 / item.max), 100),0);
}

module.exports = { 
  
  // exported functions - this makes them accessible outside this module      
  fn: {
      toPercent: valueToPercent,
      fromPercent: valueFromPercent

  },
  
  // Map of the EEPROM area
  eeprom: {
      outdoor: {
          forwardSpeed      : { addr: EE_FORWARD_SPEED, value: 0x00, min: 0x00,      max: FULL_SCALE,    toFriendly: valueToPercent, fromFriendly: valueFromPercent, name: "Forward Speed" }, 
          reverseSpeed      : { addr: EE_REVERSE_SPEED, value: 0x00, min: 0x00,      max: FULL_SCALE,    toFriendly: valueToPercent, fromFriendly: valueFromPercent, name: "Reverse Speed" }, 
          minimumSpeed      : { addr: EE_MINIMUM_SPEED, value: 0x00, min: 0x00,      max: MIN_SPEED_MAX, toFriendly: valueToPercent, fromFriendly: valueFromPercent, name: "Minimum Speed" }, 
          forwardAccel      : { addr: EE_FORWARD_ACCEL, value: 0x00, min: MIN_ACCEL, max: MAX_ACCEL,     toFriendly: valueToPercent, fromFriendly: valueFromPercent, name: "Forward Accel" }, 
          forwardDecel      : { addr: EE_FORWARD_DECEL, value: 0x00, min: MIN_ACCEL, max: MAX_ACCEL,     toFriendly: valueToPercent, fromFriendly: valueFromPercent, name: "Forward Decel" }, 
          forwardRevDecel   : { addr: EE_FWD_RVS_DECEL, value: 0x00, min: MIN_ACCEL, max: MAX_ACCEL,     toFriendly: valueToPercent, fromFriendly: valueFromPercent, name: "Fwd Rvs Decel" }, 
          reverseAccel      : { addr: EE_REVERSE_ACCEL, value: 0x00, min: MIN_ACCEL, max: MAX_ACCEL,     toFriendly: valueToPercent, fromFriendly: valueFromPercent, name: "Reverse Accel" }, 
          reverseDecel      : { addr: EE_REVERSE_DECEL, value: 0x00, min: MIN_ACCEL, max: MAX_ACCEL,     toFriendly: valueToPercent, fromFriendly: valueFromPercent, name: "Reverse Decel" }, 
          reverseFwdDecel   : { addr: EE_RVS_FWD_DECEL, value: 0x00, min: MIN_ACCEL, max: MAX_ACCEL,     toFriendly: valueToPercent, fromFriendly: valueFromPercent, name: "Rvs Fwd Decel" }, 
      },
      
      // more values from the table below should be inserted in here; I'm just lazy right now
      personality: {
        nominalBattery    : { addr: EE_NOMINAL_BATTERY,  value: 0x00, min: 0x00,             max: 0xFF,             lsbValue: 1.000, calc: cms_INTEGER,  name: "NOMINAL BATTERY" }, 
        firmwareRevHi     : { addr: EE_FIRMWARE_REV_HI,  value: 0x00, min: 0x00,             max: 0xFF,             lsbValue: 1.000, calc: cms_INTEGER,  name: "FW REV HI"       }, 
        firmwareRevLo     : { addr: EE_FIRMWARE_REV_LO,  value: 0x00, min: 0x00,             max: 0xFF,             lsbValue: 1.000, calc: cms_INTEGER,  name: "FW REV LO"       }, 
        ProductIdHi       : { addr: EE_PRODUCT_ID_HI,    value: 0x00, min: 0x00,             max: 0xFF,             lsbValue: 1.000, calc: cms_HEX,      name: "PRODUCT ID HI"   }, 
        ProductIdLo       : { addr: EE_PRODUCT_ID_LO,    value: 0x00, min: 0x00,             max: 0xFF,             lsbValue: 1.000, calc: cms_INTEGER,  name: "PRODUCT ID LO"   }, 
        serialNum03       : { addr: EE_SER_NUM_03,       value: 0x00, min: 0x00,             max: 0xFF,             lsbValue: 1.000, calc: cms_INTEGER,  name: "SERIAL NUM 03"   }, 
        serialNum02       : { addr: EE_SER_NUM_02,       value: 0x00, min: 0x00,             max: 0xFF,             lsbValue: 1.000, calc: cms_INTEGER,  name: "SERIAL NUM 02"   }, 
        serialNum01       : { addr: EE_SER_NUM_01,       value: 0x00, min: 0x00,             max: 0xFF,             lsbValue: 1.000, calc: cms_INTEGER,  name: "SERIAL NUM 01"   }, 
        serialNum00       : { addr: EE_SER_NUM_00,       value: 0x00, min: 0x00,             max: 0xFF,             lsbValue: 1.000, calc: cms_INTEGER,  name: "SERIAL NUM 00"   }, 
        displayType       : { addr: EE_DISPLAY_TYPE,     value: 0x00, min: DISP_TYP_ACT_MASK,max: DISP_TYP_ACT_MASK,lsbValue: 1.000, calc: cms_BIT_FLAG, name: "DISPLAY TYPE"    }, 
        peripherals       : { addr: EE_PERIPHERALS,      value: 0x00, min: PERI_ACT_MASK,    max: PERI_ACT_MASK,    lsbValue: 1.000, calc: cms_INTEGER,  name: "PERIPHERALS"     }, 
        periPriority      : { addr: EE_PERI_PRIORITY,    value: 0x00, min: PERI_ACT_MASK,    max: PERI_ACT_MASK,    lsbValue: 1.000, calc: cms_INTEGER,  name: "PERI PRIORITY"   }, 
        boardLoByte       : { addr: EE_BOARD_LO_BYTE,    value: 0x00, min: 0x00,             max: 0xFF,             lsbValue: 1.000, calc: cms_ASCII,    name: "BOARD TYPE LO"   }, 
        boardMidByte      : { addr: EE_BOARD_MID_BYTE,   value: 0x00, min: 0x00,             max: 0xFF,             lsbValue: 1.000, calc: cms_ASCII,    name: "BOARD TYPE MID"  }, 
        boardHiByte       : { addr: EE_BOARD_HIGH_BYTE,  value: 0x00, min: 0x00,             max: 0xFF,             lsbValue: 1.000, calc: cms_ASCII,    name: "BOARD TYPE HIGH" }  
     
      },
  },
};

/*
  // Categories into which the memory map values fall.  These can be used for block querying related values, or arranging
  // a UI display to group the values
  sections : parameterCategories,
  
  // The map has properties for each value that can be read and/or written via the API
 
  forwardSpeed      : { eeAddr: EE_FORWARD_SPEED, ramAddr: RAM_FORWARD_SPEED, value: 0x00, min: 0x00,      max: FULL_SCALE,    lsbValue: FULL_PCNT_LSB,  calc: cms_PERCENT,        name: "Forward Speed", section: parameterCategories.outdoorOptions  }, 
  reverseSpeed      : { eeAddr: EE_REVERSE_SPEED, ramAddr: RAM_REVERSE_SPEED, value: 0x00, min: 0x00,      max: FULL_SCALE,    lsbValue: FULL_PCNT_LSB,  calc: cms_PERCENT,        name: "Reverse Speed", section: parameterCategories.outdoorOptions  }, 
  minimumSpeed      : { eeAddr: EE_MINIMUM_SPEED, ramAddr: RAM_MINIMUM_SPEED, value: 0x00, min: 0x00,      max: MIN_SPEED_MAX, lsbValue: MIN_SPEED_LSB,  calc: cms_PERCENT,        name: "Minimum Speed", section: parameterCategories.outdoorOptions  }, 
  forwardAccel      : { eeAddr: EE_FORWARD_ACCEL, ramAddr: RAM_FORWARD_ACCEL, value: 0x00, min: MIN_ACCEL, max: MAX_ACCEL,     lsbValue: ACCEL_PCNT_LSB, calc: cms_INVERT_PERCENT, name: "Forward Accel", section: parameterCategories.outdoorOptions  }, 
  forwardDecel      : { eeAddr: EE_FORWARD_DECEL, ramAddr: RAM_FORWARD_DECEL, value: 0x00, min: MIN_ACCEL, max: MAX_ACCEL,     lsbValue: ACCEL_PCNT_LSB, calc: cms_INVERT_PERCENT, name: "Forward Decel", section: parameterCategories.outdoorOptions  }, 
  forwardRevDecel   : { eeAddr: EE_FWD_RVS_DECEL, ramAddr: RAM_FWD_RVS_DECEL, value: 0x00, min: MIN_ACCEL, max: MAX_ACCEL,     lsbValue: ACCEL_PCNT_LSB, calc: cms_INVERT_PERCENT, name: "Fwd Rvs Decel", section: parameterCategories.outdoorOptions  }, 
  reverseAccel      : { eeAddr: EE_REVERSE_ACCEL, ramAddr: RAM_REVERSE_ACCEL, value: 0x00, min: MIN_ACCEL, max: MAX_ACCEL,     lsbValue: ACCEL_PCNT_LSB, calc: cms_INVERT_PERCENT, name: "Reverse Accel", section: parameterCategories.outdoorOptions  }, 
  reverseDecel      : { eeAddr: EE_REVERSE_DECEL, ramAddr: RAM_REVERSE_DECEL, value: 0x00, min: MIN_ACCEL, max: MAX_ACCEL,     lsbValue: ACCEL_PCNT_LSB, calc: cms_INVERT_PERCENT, name: "Reverse Decel", section: parameterCategories.outdoorOptions  }, 
  reverseFwdDecel   : { eeAddr: EE_RVS_FWD_DECEL, ramAddr: RAM_RVS_FWD_DECEL, value: 0x00, min: MIN_ACCEL, max: MAX_ACCEL,     lsbValue: ACCEL_PCNT_LSB, calc: cms_INVERT_PERCENT, name: "Rvs Fwd Decel", section: parameterCategories.outdoorOptions  }, 

  
      // more values from the table below should be inserted in here; I'm just lazy right now
  
  nominalBattery    : { eeAddr: EE_NOMINAL_BATTERY,  ramAddr: RAM_UNKNOWN,       value: 0x00, min: 0x00,             max: 0xFF,             lsbValue: 1.000, calc: cms_INTEGER,  name: "NOMINAL BATTERY", section: parameterCategories.personality }, 
  firmwareRevHi     : { eeAddr: EE_FIRMWARE_REV_HI,  ramAddr: RAM_UNKNOWN,       value: 0x00, min: 0x00,             max: 0xFF,             lsbValue: 1.000, calc: cms_INTEGER,  name: "FW REV HI"      , section: parameterCategories.personality }, 
  firmwareRevLo     : { eeAddr: EE_FIRMWARE_REV_LO,  ramAddr: RAM_UNKNOWN,       value: 0x00, min: 0x00,             max: 0xFF,             lsbValue: 1.000, calc: cms_INTEGER,  name: "FW REV LO"      , section: parameterCategories.personality }, 
  ProductIdHi       : { eeAddr: EE_PRODUCT_ID_HI,    ramAddr: RAM_UNKNOWN,       value: 0x00, min: 0x00,             max: 0xFF,             lsbValue: 1.000, calc: cms_HEX,      name: "PRODUCT ID HI"  , section: parameterCategories.personality }, 
  ProductIdLo       : { eeAddr: EE_PRODUCT_ID_LO,    ramAddr: RAM_UNKNOWN,       value: 0x00, min: 0x00,             max: 0xFF,             lsbValue: 1.000, calc: cms_INTEGER,  name: "PRODUCT ID LO"  , section: parameterCategories.personality }, 
  serialNum03       : { eeAddr: EE_SER_NUM_03,       ramAddr: RAM_UNKNOWN,       value: 0x00, min: 0x00,             max: 0xFF,             lsbValue: 1.000, calc: cms_INTEGER,  name: "SERIAL NUM 03"  , section: parameterCategories.personality }, 
  serialNum02       : { eeAddr: EE_SER_NUM_02,       ramAddr: RAM_UNKNOWN,       value: 0x00, min: 0x00,             max: 0xFF,             lsbValue: 1.000, calc: cms_INTEGER,  name: "SERIAL NUM 02"  , section: parameterCategories.personality }, 
  serialNum01       : { eeAddr: EE_SER_NUM_01,       ramAddr: RAM_UNKNOWN,       value: 0x00, min: 0x00,             max: 0xFF,             lsbValue: 1.000, calc: cms_INTEGER,  name: "SERIAL NUM 01"  , section: parameterCategories.personality }, 
  serialNum00       : { eeAddr: EE_SER_NUM_00,       ramAddr: RAM_UNKNOWN,       value: 0x00, min: 0x00,             max: 0xFF,             lsbValue: 1.000, calc: cms_INTEGER,  name: "SERIAL NUM 00"  , section: parameterCategories.personality }, 
  displayType       : { eeAddr: EE_DISPLAY_TYPE,     ramAddr: RAM_UNKNOWN,       value: 0x00, min: DISP_TYP_ACT_MASK,max: DISP_TYP_ACT_MASK,lsbValue: 1.000, calc: cms_BIT_FLAG, name: "DISPLAY TYPE"   , section: parameterCategories.personality }, 
  peripherals       : { eeAddr: EE_PERIPHERALS,      ramAddr: RAM_UNKNOWN,       value: 0x00, min: PERI_ACT_MASK,    max: PERI_ACT_MASK,    lsbValue: 1.000, calc: cms_INTEGER,  name: "PERIPHERALS"    , section: parameterCategories.personality }, 
  periPriority      : { eeAddr: EE_PERI_PRIORITY,    ramAddr: RAM_PERI_PRIORITY, value: 0x00, min: PERI_ACT_MASK,    max: PERI_ACT_MASK,    lsbValue: 1.000, calc: cms_INTEGER,  name: "PERI PRIORITY"  , section: parameterCategories.personality }, 
  boardLoByte       : { eeAddr: EE_BOARD_LO_BYTE,    ramAddr: RAM_UNKNOWN,       value: 0x00, min: 0x00,             max: 0xFF,             lsbValue: 1.000, calc: cms_ASCII,    name: "BOARD TYPE LO"  , section: parameterCategories.personality }, 
  boardMidByte      : { eeAddr: EE_BOARD_MID_BYTE,   ramAddr: RAM_UNKNOWN,       value: 0x00, min: 0x00,             max: 0xFF,             lsbValue: 1.000, calc: cms_ASCII,    name: "BOARD TYPE MID" , section: parameterCategories.personality }, 
  boardHiByte       : { eeAddr: EE_BOARD_HIGH_BYTE,  ramAddr: RAM_UNKNOWN,       value: 0x00, min: 0x00,             max: 0xFF,             lsbValue: 1.000, calc: cms_ASCII,    name: "BOARD TYPE HIGH", section: parameterCategories.personality }  
};
 */   
    /*
      { EE_INDOOR_FWD_SPEED,          RAM_INDOOR_FWD_SPEED,          0x00,   0x00,              FULL_SCALE,         FULL_PCNT_LSB,          cms_PERCENT,            "FORWARD SPEED"            },  //--- [09] Indoor Options  
        { EE_INDOOR_RVS_SPEED,          RAM_INDOOR_RVS_SPEED,          0x00,   0x00,              FULL_SCALE,         FULL_PCNT_LSB,          cms_PERCENT,            "REVERSE SPEED"            },  //--- [10]
        { EE_INDOOR_FWD_ACCEL,          RAM_INDOOR_FWD_ACCEL,          0x00,   MIN_ACCEL,         MAX_ACCEL,          ACCEL_PCNT_LSB,         cms_INVERT_PERCENT,     "FORWARD ACCEL"            },  //--- [11]
        { EE_INDOOR_FWD_DECEL,          RAM_INDOOR_FWD_DECEL,          0x00,   MIN_ACCEL,         MAX_ACCEL,          ACCEL_PCNT_LSB,         cms_INVERT_PERCENT,     "FORWARD DECEL"            },  //--- [12]
        { EE_INDOOR_FWD_RVS_DECEL,      RAM_INDOOR_FWD_RVS_DECEL,      0x00,   MIN_ACCEL,         MAX_ACCEL,          ACCEL_PCNT_LSB,         cms_INVERT_PERCENT,     "FWD RVS DECEL"            },  //--- [13]
        { EE_INDOOR_RVS_ACCEL,          RAM_INDOOR_RVS_ACCEL,          0x00,   MIN_ACCEL,         MAX_ACCEL,          ACCEL_PCNT_LSB,         cms_INVERT_PERCENT,     "REVERSE ACCEL"            },  //--- [14]
        { EE_INDOOR_RVS_DECEL,          RAM_INDOOR_RVS_DECEL,          0x00,   MIN_ACCEL,         MAX_ACCEL,          ACCEL_PCNT_LSB,         cms_INVERT_PERCENT,     "REVERSE DECEL"            },  //--- [15]
        { EE_INDOOR_RVS_FWD_DECEL,      RAM_INDOOR_RVS_FWD_DECEL,      0x00,   MIN_ACCEL,         MAX_ACCEL,          ACCEL_PCNT_LSB,         cms_INVERT_PERCENT,     "RVS FWD DECEL"            },  //--- [16]
        { EE_OUTDOOR_MOTOR_COMP,        RAM_OUTDOOR_MOTOR_COMP,        0x00,   0x00,              MAX_COMP,           1.00F,                  cms_INTEGER       ,     "OUTDOOR MTR COMP"         },  //--- [17] Band Comp
        { EE_INDOOR_MOTOR_COMP,         RAM_INDOOR_MOTOR_COMP,         0x00,   0x00,              MAX_COMP,           1.00F,                  cms_INTEGER       ,     "INDOOR MTR COMP"          },  //--- [18]
        { EE_THROTTLE_SCALE,            RAM_THROTTLE_SCALE,            0x00,   0x00,              FULL_SCALE,         1.00F,                  cms_INTEGER       ,     "THROTTLE SCALE"           },  //--- [19]
        { EE_DEAD_BAND,                 RAM_DEAD_BAND,                 0x00,   0x00,              FULL_SCALE,         1.00F,                  cms_INTEGER       ,     "DEAD BAND"                },  //--- [20]
        { EE_FAIL_BAND,                 RAM_FAIL_BAND,                 0x00,   0x00,              FULL_SCALE,         1.00F,                  cms_INTEGER       ,     "FAIL BAND"                },  //--- [21]
        { EE_PUSH_SPEED,                RAM_PUSH_SPEED,                0x00,   0x00,              FULL_SCALE,         FULL_PCNT_LSB,          cms_PERCENT       ,     "PUSH SPEED"               },  //--- [22]
        { EE_COMP_RESPONSE,             RAM_COMP_RESPONSE,             0x00,   MIN_ACCEL,         MAX_ACCEL,          ACCEL_PCNT_LSB,         cms_INVERT_PERCENT,     "COMP RESPONSE"            },  //--- [23]
        { EE_RAMP_SHAPE,                RAM_RAMP_SHAPE,                0x00,   0x00,              MAX_RAMP_SHAPE,     1.00F,                  cms_INTEGER       ,     "RAMP SHAPE"               },  //--- [24]
        { EE_KEY_OFF,                   RAM_KEY_OFF,                   0x00,   MIN_KEY_OFF,       MAX_KEY_OFF,        KEY_PCNT_LSB,           cms_INVERT_PERCENT,     "KEY OFF DCL"              },  //--- [25]
        { EE_EMB_BRAKE_TIME,            RAM_EMB_BRAKE_TIME,            0x00,   0x01,              FULL_SCALE,         0.01f,                  cms_SCALE_100_INT,      "ElectroMech BRAKE TIME"   },  //--- [26] Timers  
        { EE_FWD_PLUG_TIME,             RAM_FWD_PLUG_TIME,             0x00,   0x00,              FULL_SCALE,         TIME_BYTE_LSB,          cms_TIME_SCALING,       "FORWARD PLUG TIME"        },  //--- [27]
        { EE_REV_PLUG_TIME,             RAM_REV_PLUG_TIME,             0x00,   0x00,              FULL_SCALE,         TIME_BYTE_LSB,          cms_TIME_SCALING,       "REVERSE PLUG TIME"        },  //--- [28]
        { EE_HOLD_TIME,                 RAM_HOLD_TIME,                 0x00,   MIN_HOLD_TIME,     MAX_HOLD_TIME,      HOLD_TIME_LSB,          cms_PERCENT     ,       "HOLD TIME"                },  //--- [29]
        { EE_MAX_DRIVE_TIME,            RAM_MAX_DRIVE_TIME,            0x00,   0x01,              FULL_SCALE,         0.438f,                 cms_NORMAL_SCALING,     "MAX DRIVE TIME"           },  //--- [30]
        { EE_SENSOR_STOP_TIME,          RAM_SENSOR_STOP_TIME,          0x00,   0x01,              FULL_SCALE,         0.438f,                 cms_NORMAL_SCALING,     "SENSOR STOP TIME"         },  //--- [31]
        { EE_TIMEOUT,                   RAM_TIMEOUT,                   0x00,   0x00,              MAX_TIMEOUT,        1.000f,                 cms_INTEGER,            "TIMEOUT"                  },  //--- [32]
        { EE_CURRENT_LIMIT_TIME,        RAM_CURRENT_LIMIT_TIME,        0x00,   0x01,              MAX_CURRENT_TIME,   1.000f,                 cms_INTEGER,            "CURRENT LIMIT TIME"       },  //--- [33]
        { EE_FULL_VOLTAGE,              RAM_FULL_VOLTAGE,              0x00,   MIN_FULL_V,        MAX_FULL_V,         1.000F,                 cms_FULL_VOLT_SCALING,  "FULL VOLTAGE"             },  //--- [34] Battery Voltage Current
        { EE_FLASH_VOLTAGE,             RAM_FLASH_VOLTAGE,             0x00,   MIN_FLASH_V,       MAX_FLASH_V,        1.000F,                 cms_DSP_ONEB_BATTV_DP,  "FLASH VOLTAGE"            },  //--- [35]
        { EE_EM_BRAKE_VOLTAGE,          RAM_EM_BRAKE_VOLTAGE,          0x00,   0x00,              FULL_SCALE,         EM_BRAKE_LSB,           cms_DSP_ONEB_BATTV_DP,  "EM BRAKE V"               },  //--- [36] 
        { EE_SHUT_DOWN_VOLTAGE,         RAM_SHUT_DOWN_VOLTAGE,         0x00,   MIN_SHUT_VAL,      MAX_SHUT_VAL,       SHUT_VOLT_LSB,          cms_DSP_ONEB_BATTV_DP,  "SHUT DOWN VOLTAGE"        },  //--- [37]
        { EE_HIGH_VOLTAGE_CUTOFF,       RAM_HIGH_VOLTAGE_CUTOFF,       0x00,   0x01,              FULL_SCALE,         1.000F,                 cms_VOLT_SCALING,       "HIGH VOLTAGE CUTOFF"      },  //--- [38]
        { EE_CURRENT_LIMIT_LOWER,       RAM_CURRENT_LIMIT_LOWER,       0x00,   0x01,              MAX_CURRENT_LIM,    1.000F,                 cms_CURRENT_SCALING,    "CURRENT LIMIT LO"         },  //--- [39]
        { EE_CURRENT_LIMIT_UPPER,       RAM_CURRENT_LIMIT_UPPER,       0x00,   0x01,              MAX_CURRENT_LIM,    1.000F,                 cms_CURRENT_SCALING,    "CURRENT LIMIT HI"         },  //--- [40]
        { EE_BATTERY_RESISTANCE,        RAM_BATTERY_RESISTANCE,        0x00,   0x00,              FULL_SCALE,         1.000f,                 cms_INTEGER,            "BATTERY RESISTANCE"       },  //--- [41]
        { EE_COMP_VOLTS,                RAM_COMP_VOLTS,                0x00,   0x01,              FULL_SCALE,         0.438f,                 cms_INVERT_SCALING,     "COMPENSATION VOLTS"       },  //--- [42]
        { EE_RUNTIME_HOURS,             RAM_UNKNOWN,                   0x00,   0x00,              0xFF,               1.000f,                 cms_INTEGER,            "RUNTIME HOURS"            },  //--- [43] Meters 
        { EE_RUNTIME_MINUTES,           RAM_UNKNOWN,                   0x00,   0x00,              0xFF,               1.000f,                 cms_INTEGER,            "RUNTIME MINUTES"          },  //--- [44]
        { EE_CHARGE_NO_FLOATS_COUNTER,  RAM_CHARGE_NO_FLOATS_COUNTER,  0x00,   0x00,              0xFF,               1.000f,                 cms_DSP_UPDATE_DEC,     "CHARGE UNPLUGGED"         },  //--- [45]  
        { EE_LOW_BATT_HOURS,            RAM_LOW_BATT_HOURS,            0x00,   0x00,              0xFF,               1.000f,                 cms_DSP_HR_MIN_UP,      "LOW BATT HOURS"           },  //--- [46]
        { EE_LOW_BATT_MINUTES,          RAM_LOW_BATT_MINUTES,          0x00,   0x00,              0x3B,               1.000f,                 cms_DSP_HR_MIN_UP,      "LOW BATT MINUTES"         },  //--- [47]
        { EE_OVER_TEMP_COUNTER,         RAM_OVER_TEMP_COUNTER,         0x00,   0x00,              0xFF,               1.000f,                 cms_DSP_UPDATE_DEC,     "OVER TEMP MIN"            },  //--- [48]
        { EE_THROTTLE_FAULT_COUNTER,    RAM_THROTTLE_FAULT_COUNTER,    0x00,   0x00,              0xFF,               1.000f,                 cms_DSP_UPDATE_DEC,     "THROTTLE FAULTS"          },  //--- [49]
        { EE_OUTDOOR_CREEP_SPEED,       RAM_OUTDOOR_CREEP_SPEED,       0x00,   0x00,              FULL_SCALE,         FULL_PCNT_LSB,          cms_PERCENT,            "OUTDOOR CREEP SPEED"      },  //--- [50]
        { EE_INDOOR_CREEP_SPEED,        RAM_INDOOR_CREEP_SPEED,        0x00,   0x00,              FULL_SCALE,         FULL_PCNT_LSB,          cms_PERCENT,            "INDOOR CREEP SPEED"       },  //--- [51]
        { EE_ANTI_ROLLBACK_STOP,        RAM_ANTI_ROLLBACK_STOP,        0x00,   0x00,              FULL_SCALE,         2.438f,                 cms_CURRENT_SB,         "ANTI ROLLBACK STOP"       },  //--- [52]
        { EE_CONFIGURE_OPTION_01,       RAM_CONFIGURE_OPTION_01,       0x00,   OPT_01_ACT_MASK,   OPT_01_MASK,        1.000f,                 cms_BIT_FLAG,           "RAM CFG 01"               },  //--- [53] 0x35 //--- byte of bitfields, min and max not applicable - added for completeness
        { EE_CONFIGURE_OPTION_02,       RAM_CONFIGURE_OPTION_02,       0x00,   OPT_02_ACT_MASK,   OPT_02_MASK,        1.000f,                 cms_BIT_FLAG,           "RAM CFG 02"               },  //--- [54] 0x36 //--- byte of bitfields, min and max not applicable - added for completeness
        { EE_CONFIGURE_OPTION_03,       RAM_CONFIGURE_OPTION_03,       0x00,   OPT_03_ACT_MASK,   OPT_03_MASK,        1.000f,                 cms_BIT_FLAG,           "RAM CFG 03"               },  //--- [55] 0x37
        { EE_CONFIGURE_OPTION_04,       RAM_CONFIGURE_OPTION_04,       0x00,   OPT_04_ACT_MASK,   OPT_04_ACT_MASK,    1.000f,                 cms_BIT_FLAG,           "RAM CFG 04"               },  //--- [56] 0x38 //--- byte of bitfields, min and max not applicable - added for completeness
        { EE_CONFIGURE_OPTION_05,       RAM_CONFIGURE_OPTION_05,       0x00,   OPT_05_ACT_MASK,   OPT_05_ACT_MASK,    1.000f,                 cms_BIT_FLAG,           "RAM CFG 05"               },  //--- [57] 0x39 //--- byte of bitfields, min and max not applicable - added for completeness
        { EE_CONFIGURE_OPTION_06,       RAM_CONFIGURE_OPTION_06,       0x00,   OPT_06_ACT_MASK,   OPT_06_ACT_MASK,    1.000f,                 cms_BIT_FLAG,           "RAM CFG 06"               },  //--- [58] 0x3A //--- byte of bitfields, min and max not applicable - added for completeness
        { EE_MOTOR_FLAGS,               RAM_CONFIGURE_OPTION_07,       0x00,   OPT_07_ACT_MASK,   OPT_07_MASK,        1.000f,                 cms_BIT_FLAG,           "RAM CFG 07"               },  //--- [59] 0c3B //--- byte of bitfields, min and max not applicable - added for completeness
        { EE_BATT_VOLTAGE_HI,           RAM_BATT_VOLTAGE_HI,           0x00,   0x00,              0xFF,               0.109f,                 cms_DSP_BATTV_DP,       "BATT VOLT HI"             },  //--- [60] 0x3C //--- NOTE: actual maximum was 0x00 (i.e. minimum > maximum... used 0xFF instead          
        { EE_BATT_VOLTAGE_LO,           RAM_BATT_VOLTAGE_LO,           0x00,   0x00,              0xFF,               0.109f,                 cms_DSP_BATTV_DP,       "BATT VOLT LO"             },  //--- [61] 0x3D //--- NOTE: actual maximum was 0x00 (i.e. minimum > maximum... used 0xFF instead
        { EE_CURRENT_LO,                RAM_CURRENT_LO,                0x00,   0x00,              0xFF,               1.000f,                 cms_DSP_CURRENT_DP,     "CURRENT A LO"             },  //--- [62] 0x3E 
        { EE_CURRENT_HI,                RAM_CURRENT_HI,                0x00,   0x00,              0xFF,               1.000f,                 cms_DSP_CURRENT_DP,     "CURRENT A HI"             },  //--- [63] 0x3F 
        { EE_TIMER_HOURS_HI,            RAM_TIMER_HOURS_HI,            0x00,   0x00,              0xFF,               1.000f,                 cms_INTEGER,            "TIMER HOURS HI"           },  //--- [64] 0x40 //--- min and max not found - added here for completeness 
        { EE_TIMER_HOURS_LO,            RAM_TIMER_HOURS_LO,            0x00,   0x00,              0xFF,               1.000f,                 cms_INTEGER,            "TIMER HOURS LO"           },  //--- [65] 0x41 //--- min and max not found - added here for completeness        
        { EE_THROTTLE_FLAGS,            RAM_THROTTLE_FLAGS,            0x00,   THROT_ACT_MASK,    THROT_ACT_MASK,     1.000f,                 cms_BIT_FLAG,           "THROT FLAG"               },  //--- [66] 0x42
        { EE_ULTA_THROT_FLAGS,          RAM_U_THROTTLE_FLAGS,          0x00,   U_THROT_ACT_MASK,  U_THROT_MASK,       1.000f,                 cms_BIT_FLAG,           "TARGET FLAG"              },  //--- [67] 0x43
        { EE_TARGET_FLAGS,              RAM_TARGET_FLAGS,              0x00,   TARGET_ACT_MASK,   TARGET_ACT_MASK,    1.000f,                 cms_BIT_FLAG,           "FAULT PTR"                },  //--- [68] 0x44
        { EE_FAULT_PTR,                 RAM_FAULT_PTR,                 0x00,   0x00,              0xFF,               1.000f,                 cms_INTEGER,            "FAULT CODE POINTER"       },  //--- [69] 0x45
        { EE_MISC_1_2,                  RAM_MISC_1_2,                  0x00,   0x00,              FULL_SCALE,         1.000f,                 cms_HEX,                "MISC 1 & 2"               },  //--- [70] 0x46
        { EE_MISC_3_4,                  RAM_MISC_3_4,                  0x00,   0x00,              FULL_SCALE,         1.000f,                 cms_HEX,                "MISC 3 & 4"               },  //--- [71] 0x47
        { EE_THROTTLE_LO,               RAM_THROTTLE_LO,               0x00,   0x00,              FULL_SCALE,         1.000f,                 cms_DSP_THROTV_DP,      "THROTTLE VOLTS LO"        },  //--- [72] 0x48
        { EE_THROTTLE_HI,               RAM_THROTTLE_HI,               0x00,   0x00,              FULL_SCALE,         1.000f,                 cms_DSP_THROTV_DP,      "THROTTLE VOLTS HI"        },  //--- [73] 0x49
        { EE_FET_TEMP_LO,               RAM_FET_TEMP_LO,               0x00,   0x00,              FULL_SCALE,         1.000f,                 cms_DSP_TEMP_C,         "FET TEMPERATURE LO"       },  //--- [74] 0x4A
        { EE_FET_TEMP_HI,               RAM_FET_TEMP_HI,               0x00,   0x00,              FULL_SCALE,         1.000f,                 cms_DSP_TEMP_C,         "FET TEMPERATURE HI"       },  //--- [75] 0x4B
        { EE_MAX_SPEED,                 RAM_MAX_SPEED,                 0x00,   0x00,              FULL_SCALE,         1.000f,                 cms_PERCENT,            "MAXIMUM SPEED"            },  //--- [76] 0x4C
        { EE_THROTTLE_VALUE,            RAM_THROTTLE_VALUE,            0x00,   0x00,              FULL_SCALE,         1.000f,                 cms_DSP_UPDATE_HEX,     "THROTTLE VAL"             },  //--- [77] 0x4D
        { EE_PWM,                       RAM_PWM,                       0x00,   0x00,              FULL_SCALE,         1.000f,                 cms_PERCENT,            "PULSE WIDTH MODULATE"     },  //--- [78] 0x4E
        { EE_SPEED,                     RAM_SPEED,                     0x00,   0x00,              FULL_SCALE,         1.000f,                 cms_PERCENT,            "SPEED"                    },  //--- [79] 0x4F
        { EE_TGT_MISC_FLAG_0,           RAM_TGT_MISC_FLAG_0,           0x00,   TGT_ACT_FLG0_MASK, TGT_ACT_FLG0_MASK,  1.000f,                 cms_BIT_FLAG,           "THROTTLE CENTER"          },  //--- [80] 0x50
        { EE_TGT_MISC_FLAG_5,           RAM_TGT_MISC_FLAG_5,           0x00,   TGT_ACT_FLG5_MASK, TGT_ACT_FLG5_MASK,  1.000f,                 cms_BIT_FLAG,           "THROTTLE FAULT"           },  //--- [81] 0x51
        { EE_TGT_MISC_FLAG_8,           RAM_TGT_MISC_FLAG_8,           0x00,   TGT_ACT_FLG8_MASK, TGT_ACT_FLG8_MASK,  1.000f,                 cms_BIT_FLAG,           "SHORT CIRCUIT"            },  //--- [82] 0x52
        { EE_TARGET_MODE,               RAM_TARGET_MODE,               0x00,   TGT_ACT_MODE_MASK, TGT_ACT_MODE_MASK,  1.000f,                 cms_BIT_FLAG,           "OFF PUSH"                 },  //--- [83] 0x53
        { EE_ANALOG_IN,                 RAM_ANALOG_IN,                 0x00,   0x00,              FULL_SCALE,         1.000f,                 cms_PERCENT,            "ANALOG IN"                },  //--- [84] 0x54
        { EE_TARGET_PORT_B,             RAM_TARGET_PORT_B,             0x00,   PORT_B_ACT_MASK,   PORT_B_MASK,        1.000f,                 cms_BIT_FLAG,           "TGT PORT B"               },  //--- [85] 0x55
        { EE_TARGET_PORT_C,             RAM_TARGET_PORT_C,             0x00,   PORT_C_ACT_MASK,   PORT_C_MASK,        1.000f,                 cms_BIT_FLAG,           "TGT PORT C"               },  //--- [86] 0x56
        { EE_ULTA_MISC,                 RAM_ULTA_MISC,                 0x00,   ULTA_ACT_MISC_MASK, ULTA_MISC_MASK,    1.000f,                 cms_BIT_FLAG,           "ULTA MISC"                },  //--- [87] 0x57
        { EE_CHARGE_MODE,               RAM_CHARGE_MODE,               0x00,   0xff,              FULL_SCALE,         1.000f,                 cms_HEX,                "CHARGE MODE"              },  //--- [88] 0x58
        { EE_CHARGE_TIME,               RAM_CHARGE_TIME,               0x00,   0x00,              FULL_SCALE,         1.000f,                 cms_HEX,                "CHARGE TIME"              },  //--- [89] 0x59
        { EE_METER_HOURS,               RAM_METER_HOURS,               0x00,   0x00,              0xFF,               1.000f,                 cms_DSP_HOURS_UP,       "RUNTIME HOURS"            },  //--- [90] 0x5A 
        { EE_METER_MINUTES,             RAM_METER_MINUTES,             0x00,   0x00,              0xFF,               1.000f,                 cms_DSP_HOURS_UP,       "RUNTIME MINUTES"          },  //--- [91] 0x5B
        { EE_CAL_CURRENT_GAIN_LO,       RAM_CAL_CURRENT_GAIN_LO,       0x00,   0x00,              0xFF,               1.000f,                 cms_INTEGER,            "CURRENT GAIN LO"          },  //--- [92] 0x5C
        { EE_CAL_CURRENT_GAIN_HI,       RAM_CAL_CURRENT_GAIN_HI,       0x00,   0x00,              0xFF,               1.000f,                 cms_INTEGER,            "CURRENT GAIN HI"          },  //--- [93] 0x5D
        { EE_CAL_CURRENT_OFFSET_LO,     RAM_CAL_CURRENT_OFFSET_LO,     0x00,   0x00,              0xFF,               1.000f,                 cms_INTEGER,            "CURRENT OFFSET LO"        },  //--- [94] 0x5E
        { EE_CAL_CURRENT_OFFSET_HI,     RAM_CAL_CURRENT_OFFSET_HI,     0x00,   0x00,              0xFF,               1.000f,                 cms_INTEGER,            "CURRENT OFFSET HI"        },  //--- [95] 0x5F
        { EE_CAL_CURRENT_GAIN_02_LO,    RAM_CAL_CURRENT_GAIN_02_LO,    0x00,   0x00,              0xFF,               1.000f,                 cms_INTEGER,            "CURRENT GAIN 02 LO"       },  //--- [96] 0x60
        { EE_CAL_CURRENT_GAIN_02_HI,    RAM_CAL_CURRENT_GAIN_02_HI,    0x00,   0x00,              0xFF,               1.000f,                 cms_INTEGER,            "CURRENT GAIN 02 HI"       },  //--- [97] 0x61
        { EE_CAL_CURRENT_OFFSET_02_LO,  RAM_CAL_CURRENT_OFFSET_02_LO,  0x00,   0x00,              0xFF,               1.000f,                 cms_INTEGER,            "CURRENT OFFSET 02 LO"     },  //--- [96] 0x62
        { EE_CAL_CURRENT_OFFSET_02_HI,  RAM_CAL_CURRENT_OFFSET_02_HI,  0x00,   0x00,              0xFF,               1.000f,                 cms_INTEGER,            "CURRENT OFFSET 02 HI"     },  //--- [97] 0x63
        { EE_CAL_BATTERY_GAIN_LO,       RAM_CAL_BATTERY_GAIN_LO,       0x00,   0x00,              0xFF,               1.000f,                 cms_INTEGER,            "BATTERY GAIN LO"          },  //--- [98] 0x64
        { EE_CAL_BATTERY_GAIN_HI,       RAM_CAL_BATTERY_GAIN_HI,       0x00,   0x00,              0xFF,               1.000f,                 cms_INTEGER,            "BATTERY GAIN HI"          },  //--- [99] 0x65
        { EE_CAL_BATTERY_OFFSET_LO,     RAM_CAL_BATTERY_OFFSET_LO,     0x00,   0x00,              0xFF,               1.000f,                 cms_INTEGER,            "BATTERY OFFSET LO"        },  //---[100] 0x66
        { EE_CAL_BATTERY_OFFSET_HI,     RAM_CAL_BATTERY_OFFSET_HI,     0x00,   0x00,              0xFF,               1.000f,                 cms_INTEGER,            "BATTERY OFFSET HI"        },  //---[101] 0x67
        { EE_CAL_TEMP_GAIN_LO,          RAM_CAL_TEMP_GAIN_LO,          0x00,   0x00,              0xFF,               1.000f,                 cms_INTEGER,            "TEMP GAIN LO"             },  //---[102] 0x68
        { EE_CAL_TEMP_GAIN_HI,          RAM_CAL_TEMP_GAIN_HI,          0x00,   0x00,              0xFF,               1.000f,                 cms_INTEGER,            "TEMP GAIN HI"             },  //---[103] 0x69
        { EE_CAL_TEMP_OFFSET_LO,        RAM_CAL_TEMP_OFFSET_LO,        0x00,   0x00,              0xFF,               1.000f,                 cms_INTEGER,            "TEMP OFFSET LO"           },  //---[104] 0x6A
        { EE_CAL_TEMP_OFFSET_HI,        RAM_CAL_TEMP_OFFSET_HI,        0x00,   0x00,              0xFF,               1.000f,                 cms_INTEGER,            "TEMP OFFSET HI"           },  //---[105] 0x6B
        { EE_CAL_TEMP_CUTOFF_LO,        RAM_CAL_TEMP_CUTOFF_LO,        0x00,   0x00,              0xFF,               1.000f,                 cms_INTEGER,            "TEMP CUTOFF LO"           },  //---[106] 0x6C
        { EE_CAL_TEMP_CUTOFF_HI,        RAM_CAL_TEMP_CUTOFF_HI,        0x00,   0x00,              0xFF,               1.000f,                 cms_INTEGER,            "TEMP CUTOFF HI"           },  //---[107] 0x6D
      };
*/
