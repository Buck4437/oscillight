const DATABASE_WAVE = {
    light: {
        energy: (g) => Math.round(Math.max(0, Math.sin(Math.radian(g.period)) + 1) * 1000) / 1000,
        rate(g, imprecise = false) {
            let base = new Decimal(this.energy(g))
            if (imprecise) base = new Decimal(1) //average value

            base = base.add(g.upgrades[1])

            return base.times(Decimal.pow(2, g.upgrades[2]))
                       .pow(DATABASE_LASER.laser.effect(g))
                       .pow(Decimal.pow(1.03, g.upgrades[5]))
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
            cap: 100
        },
        {
            id: 2,
            tier: 1,
            name: "Exciter",
            desc: "Double Light gain",
            base: new Decimal(18),
            scale: new Decimal(6),
            cap: 100
        },
        {
            id: 3,
            tier: 2,
            name: "Accelerator",
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
            name: "Multiplier",
            desc: "^1.03 to light gain",
            base: new Decimal(1e10),
            scale: new Decimal(1e5),
            cap: 5
        },
        // {
        //     id: 6,
        //     tier: 3,
        //     name: "Decelerator",
        //     desc: "Unlock automation for photon deceleration",
        //     base: new Decimal(1e13),
        //     scale: new Decimal(1e99),
        //     cap: 1
        // },
        // {
        //     id: 7,
        //     tier: 3,
        //     name: "Decelerator",
        //     desc: "Unlock automation for photon deceleration",
        //     base: new Decimal(1e13),
        //     scale: new Decimal(1e99),
        //     cap: 1
        // },
        // {
        //     id: 8,
        //     tier: 3,
        //     name: "Decelerator",
        //     desc: "Unlock automation for photon deceleration",
        //     base: new Decimal(1e13),
        //     scale: new Decimal(1e99),
        //     cap: 1
        // }
    ],
}
