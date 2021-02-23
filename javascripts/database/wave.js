const DATABASE_WAVE = {
    light: {
        energy: (g) => Math.round(Math.max(0, Math.sin(Math.radian(g.period)) + 1) * 1000) / 1000,
        rate(g, imprecise = false) {
            let base = new Decimal(this.energy(g))
            if (imprecise) base = new Decimal(1) //average value

            base = base.add(g.upgrades[1])

            return base.times(Decimal.pow(2, g.upgrades[2]))
        },
        speed: g => {
            let base = 20
            if (g.decelerate.active === true) base = 5 / Math.pow(1.3, g.upgrades[4])

            return base * Math.pow(2, g.upgrades[3])
        },
        decelTime: g => {
            let base = 1

            return base
        }
    },
    upgrades: [
        {
            id: 1,
            name: "Accumulator",
            desc: "Increase base light gain by 1",
            base: new Decimal(20),
            scale: new Decimal(7),
            cap: 5
        },
        {
            id: 2,
            name: "Exciter",
            desc: "Double Light gain",
            base: new Decimal(30),
            scale: new Decimal(6),
            cap: 100
        },
        {
            id: 3,
            name: "Accelerator",
            desc: "Double wave frequency",
            base: new Decimal(100),
            scale: new Decimal(6),
            cap: 3
        },
        {
            id: 4,
            name: "Cooler",
            desc: "Photon deceleration is 30% more powerful",
            base: new Decimal(100),
            scale: new Decimal(15),
            cap: 5
        }
    ],
}
