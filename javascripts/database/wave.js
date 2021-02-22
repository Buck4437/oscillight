const DATABASE_WAVE = {
    light: {
        rate: (g, imprecise = false) => {
            let base = new Decimal(Math.max(0, Math.sin(Math.radian(g.period)) + 1))
            if (imprecise) base = new Decimal(1) //average value

            base = base.add(g.upgrades[2])

            return base.times(Decimal.pow(3, g.upgrades[4]))
        },
        speed: g => {
            let base = 20
            if (g.decelereate.active === true) base = 5

            return base * Math.pow(2, g.upgrades[1])
        },
        decelTime: g => {
            let base = 1

            return base * Math.pow(1.5, g.upgrades[3])
        }
    },
    upgrades: [
        {
            id: 1,
            name: "Accelerator",
            desc: "Double wave frequency",
            base: new Decimal(20),
            scale: new Decimal(6),
            cap: 3
        },
        {
            id: 2,
            name: "Accumulator",
            desc: "Increase base light gain by 1",
            base: new Decimal(20),
            scale: new Decimal(7),
            cap: 5
        },
        {
            id: 3,
            name: "Freezer",
            desc: "Photon deceleration lasts 50% longer",
            base: new Decimal(30),
            scale: new Decimal(15),
            cap: 5
        },
        {
            id: 4,
            name: "Amplifier",
            desc: "Triple Light gain",
            base: new Decimal(60),
            scale: new Decimal(9),
            cap: 100
        }
    ],
}
