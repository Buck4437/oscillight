function testBuild(id = 0, build = [0, 0, 0, 0, 0]) {
    app.game.autobuyUpgrades = false
    DATABASE_PRISM.reset(app.game, true) // Exit Interference
    app.game.interference.upgrades = 0
    app.game.interference.current = 2 ** (id - 1)
    app.game.interference.upgrades = 0
    for (let i = 0; i < 5; i++) {
        let num = build[i]
        for (let j = 0; j < 3; j++) {
            if (j < num) {
                app.game.interference.upgrades += (2 ** i) * (32 ** j)
            } else {
                break;
            }
        }
    }
    app.game.laser.time = 10
    app.game.autobuyUpgrades = true
}

function exit() {
    DATABASE_PRISM.reset(app.game, true)
    app.game.interference.current = 0
}

function normal() {
    app.game.interference.current = 0
    app.game.laser.time = 10
}

function lens(id = 1) {
    if (id === 3) {
        app.game.lenses = 4
        app.game.laser.time = 10000
    } else {
        app.game.lenses = 1
        app.game.laser.time = 10
    }
}
