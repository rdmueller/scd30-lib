
/**
 * Nutze diese Datei für benutzerdefinierte Funktionen und Blöcke.
 * Weitere Informationen unter https://makecode.calliope.cc/blocks/custom
 */

enum MyEnum {
    //% block="one"
    One,
    //% block="two"
    Two
}

/**
 * Benutzerdefinierte Blöcke
 */
//% weight=100 color=#0fbc11 icon="☁" advanced=true
namespace scd30 {
    let StartPeriodicMeasurementCMD = 16
    let GetVersionCMD = 53504
    let ReadMeasurementCMD = 768
    let GetDataReadyStatusCMD = 514
    let RecalibrationValueCMD = 20996 
    let SCD30ADR = 0x61
    /**
     * TODO: Beschreibe deine Funktion hier
     * @param n Beschreibe die Parameter hier, eg: 5
     * @param s Beschreibe die Parameter hier, eg: "Hello"
     * @param e Beschreibe die Parameter hier
    //% block
    export function wait_ready2(n: number, s: string, e: MyEnum): void {
        // Add code here
    }
     */

    /**
     * TODO: Beschreibe deine Funktion hier
     * @param value Beschreibe den Wert hier, eg: 5
    //% block
    export function fib(value: number): number {
        return value <= 1 ? value : fib(value -1) + fib(value - 2);
    }
     */
/** 

    // Some helper function for CRC8 calculation
    // "Class" for calculating CRC8 checksums...
    // taken from https://github.com/mode80/crc8js
    function CRC8(polynomial: uint8, initial_value: uint8) { // constructor takes an optional polynomial type from CRC8.POLY

    if (polynomial == null) polynomial = 0x31
    this.table = CRC8.generateTable(polynomial);
    this.initial_value = initial_value;
    }

    // Returns the 8-bit checksum given an array of byte-sized numbers
    CRC8.prototype.checksum = function(byte_array: uint8Array) {
    var c = this.initial_value;

    for (var i = 0; i < byte_array.length; i++ ) 
        c = this.table[(c ^ byte_array[i]) % 256] 

    return c;
    } 
    // returns a lookup table byte array given one of the values from CRC8.POLY 
    CRC8.generateTable =function(polynomial: uint8)
    {
    var csTable = [] // 256 max len byte array
    
    for ( var i = 0; i < 256; ++i ) {
        var curr = i
        for ( var j = 0; j < 8; ++j ) {
        if ((curr & 0x80) !== 0) {
            curr = ((curr << 1) ^ polynomial) % 256
        } else {
            curr = (curr << 1) % 256
        }
        }
        csTable[i] = curr 
    }
        
    return csTable
    }

    // This "enum" can be used to indicate what kind of CRC8 checksum you will be calculating
    CRC8.POLY = {
    CRC8 : 0xd5,
    CRC8_CCITT : 0x07,
    CRC8_DALLAS_MAXIM : 0x31,
    CRC8_SAE_J1850 : 0x1D,
    CRC_8_WCDMA : 0x9b,
    }
**/

    /**
     * TODO: Wartet bis der Sensor einsatzbereit ist
     */
    //% block
    export function wait_ready(): void {
        let istBereit = 0
        while (istBereit == 0) {
            // checken, ob Werte anliegen
            pins.i2cWriteNumber(
            SCD30ADR,
            GetDataReadyStatusCMD,
            NumberFormat.UInt16BE,
            false
            )
            // 4ms warten
            control.waitMicros(3000)
            istBereit = pins.i2cReadNumber(SCD30ADR, NumberFormat.UInt16BE, false)
            control.waitMicros(3000)
        }
    }
    //% block
    export function startMeasurement () {
        pins.i2cWriteNumber(
            SCD30ADR,
            StartPeriodicMeasurementCMD,
            NumberFormat.UInt16BE,
            false
        )
    }
    //% block
    export function leseWert (): number {
        // checken, ob Werte anliegen
        pins.i2cWriteNumber(
            SCD30ADR,
            ReadMeasurementCMD,
            NumberFormat.UInt16BE,
            false
        )
        // 3ms warten
        control.waitMicros(3000)
        let co2wert = pins.i2cReadNumber(SCD30ADR, NumberFormat.Float32BE, true)
        return co2wert
    }

}
