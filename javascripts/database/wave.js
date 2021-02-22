const DATABASE_WAVE = {
    light: {
        rate: g => Math.max(0, Math.sin(Math.radian(g.period)) + 1),
        speed: g => {
            if (g.accelerate.active === true) return 60
            else return 20
        }
    }
}
