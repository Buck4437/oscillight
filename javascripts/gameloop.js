function gameLoop(that){
    let g = that.game;
    let dt = (Date.now() - g.lastTick) / 1000

    g.period = (g.period + DATABASE_WAVE.light.speed(g) * dt) % 360

    if (g.laser.isActive) {
        g.laser.time += dt;
    }

    if (dt < 60) {
        g.light = g.light.add(DATABASE_WAVE.light.rate(g).times(dt))
    } else {
        g.light = g.light.add(DATABASE_WAVE.light.rate(g, true).times(dt))
    }

    if (g.light.gte(17.5)) g.unlocks.upgrades = true;
    if (g.light.gte(50)) g.unlocks.decelerate = true;
    if (g.light.gte(1000)) g.unlocks.amplification = true;

    g.lastTick += dt * 1000
}
