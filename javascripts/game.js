var game = {
    period: 0,
    light: new Decimal(0),
    decelereate: {
        active: false,
        timer: 0
    },
    upgrades: {
        1: 0, 2: 0, 3: 0, 4: 0
    },
    unlocks: {
        upgrades: false
    },
    settings: {
        theme: 0
    },
    lastTick: Date.now(),
    saveVersion: 1
}
