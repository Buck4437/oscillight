const DATABASE_PRISM = {
    reset(g) {
        DATABASE_WAVE.upgrades.filter(upg => this.hasUpg(g, 6) ? upg.id !== 6 : true)
                              .forEach(upg => g.upgrades[upg.id] = 0);
        if (!this.hasUpg(g, 6)) {
            g.decelerate.auto = false
            g.decelerate.isActive = false
        }

        g.laser.isActive = false
        g.laser.time = 0
        g.lenses = 0
        g.unlocks.laser = false
        g.unlocks.lenses = false

        g.rainbow = g.rainbow.add(this.gain(g))
        g.light = new Decimal(0)
        g.resets ++
        g.unlocks.rainbowUpgrades = true
    },
    gain(g) {
        if (g.light.lt(1e60)) return new Decimal(0);

        let base = Decimal.max(1, Decimal.pow(10, Decimal.log(g.light, 1e60) - 1));

        return base;
    },
    hasUpg(g, i) {
        return (g.rainbowUpgrades & Math.pow(2, i - 1)) !== 0
    },
    applyUpg(g, i) {
        return this.hasUpg(g, i) ? this.upgrades[i - 1].current(g) : 1
    },
    upgrades: [
        {
            id: 1,
            name: "Decay",
            desc: "Multiplier to light, decays based on your light",
            current: (g) => Decimal.max(1, 100 - 5 / 3 * Decimal.log10(g.light.add(1))),
            cost: new Decimal(1)
        },
        {
            id: 2,
            name: "Static",
            desc: "Static multiplier to light",
            current: (g) => new Decimal(10),
            cost: new Decimal(1)
        },
        {
            id: 3,
            name: "Growth",
            desc: "Multiplier to light, grows based on your light",
            current: (g) => Decimal.min(100, Decimal.pow(Decimal.log10(g.light.add(1)) / 6 + 1, 2)),
            cost: new Decimal(1)
        },
        {
            id: 4,
            name: "Shallow multiplier",
            desc: "Multiplier to light gain based on number of prism activations",
            current: (g) => Math.pow(g.resets, 1.5) + 1,
            cost: new Decimal(2)
        },
        {
            id: 5,
            name: "Deep multiplier",
            desc: "Multiplier to base light based on number of prism activations",
            current: (g) => Math.pow(g.resets, 0.3) + 1,
            cost: new Decimal(2)
        },
        {
            id: 6,
            name: "Backup decelerator",
            desc: "Keep photon deceleration when activating prism",
            cost: new Decimal(2)
        },
        {
            id: 7,
            name: "Active boost",
            desc: "Your unspent rainbow boost light gain",
            current: (g) => Decimal.pow(Decimal.log10(g.rainbow.times(5).plus(1)) + 1, 4).plus(1),
            cost: new Decimal(25)
        },
        {
            id: 8,
            name: "Passive boost",
            desc: "Your unspent rainbow boost laser",
            current: (g) => Math.pow(g.rainbow, 0.3) + 1,
            cost: new Decimal(100)
        },
        {
            id: 9,
            name: "Resonance",
            desc: "Unlock autobuyer for oscillation upgrades",
            cost: new Decimal(25)
        }
    ]
}
