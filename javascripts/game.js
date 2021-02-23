var game = {
    period: 270,
    light: new Decimal(0),
    decelerate: {
        active: false,
        timer: 0
    },
    upgrades: {
        1: 0, 2: 0, 3: 0, 4: 0
    },
    laser: {
        active: false,
        time: 0
    },
    unlocks: {
        upgrades: false,
        decelerate: false,
        amplification: false,
        laser: false
    },
    settings: {
        theme: 0
    },
    lastTick: Date.now(),
    saveVersion: 1
}
