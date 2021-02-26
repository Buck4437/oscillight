const DATABASE_PRISM = {
    reset(g) {
        DATABASE_WAVE.upgrades.forEach(upg => g.upgrades[upg.id] = 0);
        g.decelerate.auto = false
        g.decelerate.isActive = false
        g.laser.isActive = false
        g.laser.time = 0
        g.lenses = 0
        g.unlocks.laser = false
        g.unlocks.lenses = false

        g.rainbow = g.rainbow.add(DATABASE_PRISM.rainbow.gain(g))
        g.light = new Decimal(0)
        g.unlocks.rainbowUpgrades = true
    },
    rainbow: {
        gain(g) {
            if (g.light.lt(1e60)) return new Decimal(0);

            let base = Decimal.max(1, Decimal.pow(10, Decimal.log(g.light, 1e60) - 1));

            return base;
        },
        upgrades: [
            {
                id: 1,
                name: "Decay",
                desc: "Multiplier to light, decays based on your light",
                current: (g) => Decimal.max(1, 100 - 5 / 3 * Decimal.log10(g.light.add(1))),
                apply: (g) => (g.rainbowUpgrades & 1) !== 0 ? DATABASE_PRISM.rainbow.upgrades[0].current(g) : 1,
                cost: new Decimal(1)
            },
            {
                id: 2,
                name: "Static",
                desc: "Static multiplier to light",
                current: (g) => new Decimal(10),
                apply: (g) => (g.rainbowUpgrades & 2) !== 0 ? DATABASE_PRISM.rainbow.upgrades[1].current(g) : 1,
                cost: new Decimal(1)
            },
            {
                id: 3,
                name: "Growth",
                desc: "Multiplier to light, grows based on your light",
                current: (g) => Decimal.min(100, Decimal.pow(Decimal.log10(g.light.add(1)) / 6 + 1, 2)),
                apply: (g) => (g.rainbowUpgrades & 4) !== 0 ? DATABASE_PRISM.rainbow.upgrades[2].current(g) : 1,
                cost: new Decimal(1)
            }
        ]
    }
}
