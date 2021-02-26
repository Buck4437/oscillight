const DATABASE_PRISM = {
    reset(g) {
        if (this.gain(g).lt(1)) return

        DATABASE_WAVE.upgrades.filter(upg => this.hasUpg(g, 6) ? upg.id !== 6 : true)
                              .forEach(upg => g.upgrades[upg.id] = 0);
        if (!this.hasUpg(g, 9)) {
            g.decelerate.auto = false
            g.decelerate.isActive = false
        }

        if (!this.hasUpg(g, 12)) {
            g.laser.isActive = false
            g.unlocks.laser = false
            g.lenses = 0
            g.unlocks.lenses = false
            g.laser.time = 0
        }

        g.rainbow = g.rainbow.add(Decimal.floor(this.gain(g))) //displayed with decimals for dramatic effect
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
            name: "Shallow amplification",
            desc: "Multiplier to light gain based on number of prism activations",
            current: (g) => Math.pow(g.resets, 1.5) + 1,
            cost: new Decimal(3)
        },
        {
            id: 5,
            name: "Deep amplification",
            desc: "Multiplier to base light based on number of prism activations",
            current: (g) => Math.pow(g.resets, 0.3) + 1,
            cost: new Decimal(3)
        },
        {
            id: 6,
            name: "Quick charge",
            desc: "Laser charges and stablizes 80% faster",
            cost: new Decimal(4)
        },
        {
            id: 7,
            name: "Anti-prism",
            desc: "Your unspent rainbow boost light gain",
            current: (g) => Decimal.pow(Decimal.log10(g.rainbow.times(5).plus(1)) + 1, 4).plus(1),
            cost: new Decimal(30)
        },
        {
            id: 8,
            name: "Resonance",
            desc: "Unlock autobuyer for oscillation upgrades",
            cost: new Decimal(30)
        },
        {
            id: 9,
            name: "Backup decelerator",
            desc: "Keep photon deceleration when activating prism",
            cost: new Decimal(30)
        },
        {
            id: 10,
            name: "Colored lens",
            desc: "Your unspent rainbow boost laser",
            current: (g) => Decimal.log10(g.rainbow.plus(1)) / 30 + 1,
            cost: new Decimal(200)
        },
        {
            id: 11,
            name: "Enlightened",
            desc: "You can activate prism automatically",
            cost: new Decimal(2000)
        },
        {
            id: 12,
            name: "Backup laser",
            desc: "Keep laser after activating prism",
            cost: new Decimal(300)
        }
    ]
}
