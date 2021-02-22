var game = {
    period: 0,
    light: new Decimal(0),
    accelerate: {
        active: false,
        timer: 0
    },
    settings: {
        theme: 0
    },
    lastTick: Date.now(),
    saveVersion: 1
}
