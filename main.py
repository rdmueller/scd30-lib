def on_forever():
    scd30.wait_ready()
basic.forever(on_forever)
