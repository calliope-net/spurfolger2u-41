function GitHub () {
    callibot2.comment("calliope-net/spurfolger2u-41")
    callibot2.comment("1 Erweiterung: calliope-net/callibot2")
}
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    callibot2.comment("Ultraschall Abstand Sensor")
    for (let index = 0; index < 6; index++) {
        callibot2.write_motor_prozent(callibot2.eMotor.beide, 80)
        callibot2.write_rgbled(0xffff00)
        callibot2.wait_us(20)
        callibot2.write_rgbled(0xa300ff)
        if (Math.randomBoolean()) {
            callibot2.write_motoren_prozent(50, -50)
        } else {
            callibot2.write_motoren_prozent(-50, 50)
        }
        callibot2.comment("drehen in zufällige Richtung, dann weiter fahren")
        callibot2.wait_motor(callibot2.callibot2_ePause(callibot2.ePause.p1))
    }
})
input.onButtonEvent(Button.AB, input.buttonEventClick(), function () {
    callibot2.comment("nur Calli:bot 2E mit Encoder")
    callibot2.comment("sonst durch 'fahre weiter x Sekunden' ersetzen")
    for (let index = 0; index < 4; index++) {
        callibot2.write_rgbled(0x00ff00)
        callibot2.write_motoren_prozent(60, 60)
        callibot2.encoder_wait_cm(20)
        callibot2.write_rgbled(0xa300ff)
        callibot2.write_motoren_prozent(60, -60)
        callibot2.encoder_wait_grad(90)
    }
    callibot2.write_motoren_prozent(-100, 100)
    callibot2.encoder_wait_grad(360)
    callibot2.write_rgbled(0x000000)
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    if (!(go)) {
        callibot2.comment("bis zur Spur geradeaus fahren")
        callibot2.write_motor_prozent(callibot2.eMotor.beide, 50)
        callibot2.wait_spursensor()
        go = true
        basic.setLedColor(0x00ff00)
    } else {
        callibot2.comment("B: STOP")
        go = false
        callibot2.write_motor_prozent(callibot2.eMotor.beide, 0)
        basic.setLedColor(0xff0000)
    }
})
let go = false
callibot2.reset_outputs()
basic.showNumber(callibot2.read_power())
basic.showString(callibot2.read_typ())
basic.forever(function () {
    if (go && callibot2.read_compare_us(callibot2.eVergleich.lt, 15)) {
        callibot2.comment("Ultraschall Hindernis")
        callibot2.write_motor_prozent(callibot2.eMotor.beide, 0)
    } else if (go) {
        callibot2.comment("Spur folgen")
        callibot2.read_inputs()
        if (!(callibot2.get_inputs(callibot2.eINPUTS.sp2l)) && !(callibot2.get_inputs(callibot2.eINPUTS.sp1r))) {
            callibot2.comment("beide Sensoren dunkel: auf der Spur")
            callibot2.write_motor_prozent(callibot2.eMotor.beide, 100)
        } else if (callibot2.get_inputs(callibot2.eINPUTS.sp2l) && !(callibot2.get_inputs(callibot2.eINPUTS.sp1r))) {
            callibot2.comment("nach rechts lenken")
            callibot2.write_motoren_prozent(50, -50)
        } else if (!(callibot2.get_inputs(callibot2.eINPUTS.sp2l)) && callibot2.get_inputs(callibot2.eINPUTS.sp1r)) {
            callibot2.comment("nach links lenken")
            callibot2.write_motoren_prozent(-50, 50)
        } else if (callibot2.get_inputs(callibot2.eINPUTS.sp2l) && callibot2.get_inputs(callibot2.eINPUTS.sp1r)) {
            callibot2.comment("beide Sensoren hell: Spur verloren")
            callibot2.write_motoren_prozent(50, -50)
            callibot2.wait_spursensor()
        }
    }
})
