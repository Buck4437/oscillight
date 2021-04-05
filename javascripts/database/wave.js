const DATABASE_WAVE = {
    light: {
        energy: (g) => Math.round(Math.max(0, Math.sin(Math.radian(g.period)) + 1) * 1000) / 1000,
        rate(g) {

            let base = new Decimal(this.energy(g))

            base = base.add(g.upgrades[1])
                       // .add(DATABASE_CHALLENGE.applyUpg(g, 1, 0))

            if (!DATABASE_CHALLENGE.isInChallenge(g, 4)) {
                base = base.times(Decimal.pow(2, g.upgrades[2]))
                           .times(DATABASE_WAVE.upgrades[7].apply(g)) //8th upgrade
                           .times(Decimal.pow(1.5, g.upgrades[10]))
            }

            base = base.times(DATABASE_PRISM.applyUpg(g, 5))
                       // .times(DATABASE_CHALLENGE.applyUpg(g, 3))

            let rate = base.pow(DATABASE_LASER.laser.effect(g))
                           .pow(Decimal.pow(1.03, g.upgrades[5]))

                           .times(Decimal.pow(2, g.upgrades[9]))
                           .times(DATABASE_PRISM.applyUpg(g, 1))
                           .times(DATABASE_PRISM.applyUpg(g, 2))
                           .times(DATABASE_PRISM.applyUpg(g, 3))
                           .times(DATABASE_PRISM.applyUpg(g, 4))
                           .times(DATABASE_PRISM.applyUpg(g, 7))
                           .times(DATABASE_CHALLENGE.applyUpg(g, 1))
                           // .times(DATABASE_CHALLENGE.applyUpg(g, 7))
                           // .times(DATABASE_CHALLENGE.applyUpg(g, 9))
                           .times(Math.pow(2, g.buffs))

            rate = rate.pow(DATABASE_CHALLENGE.isInChallenge(g, 3) ? 0.75 : 1)

            return rate
        },
        speed: g => {
            let base = 20
            if (g.decelerate.isActive) base = 5 / Math.pow(1.3, g.upgrades[4])

            return base * Math.pow(2, g.upgrades[3])
        }
    },
    upgrades: [
        {
            id: 1,
            tier: 1,
            name: "Accumulator",
            desc: "Increase base light gain by 1",
            base: new Decimal(18),
            scale: new Decimal(7),
            cap: 50
        },
        {
            id: 2,
            tier: 1,
            name: "Exciter",
            desc: "Double base light gain",
            base: new Decimal(18),
            scale: new Decimal(6),
            cap: 50
        },
        {
            id: 3,
            tier: 2,
            name: "Vibrator",
            desc: "Double wave frequency",
            base: new Decimal(100),
            scale: new Decimal(10),
            cap: 4
        },
        {
            id: 4,
            tier: 2,
            name: "Cooler",
            desc: "Photon deceleration is 30% more powerful",
            base: new Decimal(100),
            scale: new Decimal(15),
            cap: 7
        },
        {
            id: 5,
            tier: 3,
            name: "Accelerator",
            desc: "^1.03 to light gain",
            base: new Decimal(1e10),
            scale: new Decimal(1e5),
            cap: 5
        },
        {
            id: 6,
            tier: 3,
            name: "Decelerator",
            desc: "Unlock automation for photon deceleration",
            base: new Decimal(1e13),
            scale: new Decimal(1e99),
            cap: 1
        },
        {
            id: 7,
            tier: 3,
            name: "Charger",
            desc: "Laser is 10% more powerful",
            base: new Decimal(5e15),
            scale: new Decimal(1e99),
            cap: 1
        },
        {
            id: 8,
            tier: 3,
            name: "Amplifier",
            desc: "Extra base multipler to light based on current energy level",
            base: new Decimal(1e40),
            scale: new Decimal(1e99),
            current: (g) => DATABASE_WAVE.light.energy(g) * 5 + 1,
            apply: (g) => g.upgrades[8] > 0 ? DATABASE_WAVE.upgrades[7].current(g) : 1,
            cap: 1
        },
        {
            id: 9,
            tier: 3,
            name: "Duplicator",
            desc: "Double light gain",
            base: new Decimal(1e50),
            scale: new Decimal(5),
            cap: 3000
        },
        {
            id: 10,
            tier: 3,
            name: "Multiplier",
            desc: "x1.5 to base light gain",
            base: new Decimal(1e50),
            scale: new Decimal(11),
            cap: 100
        }
    ],
}
