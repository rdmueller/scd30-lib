
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
//% weight=100 color=#0fbc11 icon=""
namespace scd30 {
let StartPeriodicMeasurementCMD = 0
let GetVersionCMD = 0
let ReadMeasurementCMD = 0
let GetDataReadyStatusCMD = 0
let RecalibrationValueCMD = 0 
let SCD30ADR = 0x61
GetDataReadyStatusCMD = 514
ReadMeasurementCMD = 768
GetVersionCMD = 53504
StartPeriodicMeasurementCMD = 16
RecalibrationValueCMD = 20996
    /**
     * TODO: Beschreibe deine Funktion hier
     * @param n Beschreibe die Parameter hier, eg: 5
     * @param s Beschreibe die Parameter hier, eg: "Hello"
     * @param e Beschreibe die Parameter hier
     */
    //% block
    export function wait_ready2(n: number, s: string, e: MyEnum): void {
        // Add code here
    }

    /**
     * TODO: Beschreibe deine Funktion hier
     * @param value Beschreibe den Wert hier, eg: 5
     */
    //% block
    export function fib(value: number): number {
        return value <= 1 ? value : fib(value -1) + fib(value - 2);
    }
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

}
