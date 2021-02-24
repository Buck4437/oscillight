var game = {
    period: 270,
    light: new Decimal(0),
    decelerate: {
        isActive: false
    },
    upgrades: {
        1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0
    },
    laser: {
        isActive: false,
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
