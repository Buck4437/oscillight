const DATABASE_LASER = {
    laser: {
        cost: new Decimal(5000),
        vars(g) {
            let v = {
                charged: 0.5,
                overheat: 1,
                stablizing: 1.5,
                stablized: 19.5,
                chargedP: 1,
                stablizedP: 0.97,
            }

            if ((g.lenses & 1) !== 0) { // 1st lens
                v.chargedP *= DATABASE_LASER.getLensBoost(g, 1)
                v.overheat = 0.8;
            }

            if ((g.lenses & 2) !== 0) { // 2nd lens
                v.chargedP *= DATABASE_LASER.getLensBoost(g, 2)
                v.stablizedP *= DATABASE_LASER.getLensBoost(g, 2)
            }

            if ((g.lenses & 4) !== 0) { // 3rd lens
                v.stablizedP *= DATABASE_LASER.getLensBoost(g, 3)
                v.stablized *= 3;
            }

            if (DATABASE_PRISM.hasUpg(g, 6)) { // Quick charge
                let reductionC = v.charged * 0.8
                let reductionS = (v.stablized - v.stablizing) * 0.8
                v.charged -= reductionC
                v.overheat -= reductionC
                v.stablizing -= reductionC
                v.stablized -= (reductionC + reductionS)
            }

            return v
        },
        power: (g, t = 0) => {
            // The unit used is second

            // It has been converted to minute because it's easier to calculate that way

            let v = DATABASE_LASER.laser.vars(g)
            let m = Math.max(0, t/60)
            let power;

            if (m <= v.charged) {

                let k = v.chargedP / Math.pow(v.charged, 2); // y = kx^2 => k = y/x^2
                power = k * Math.pow(m, 2);

            } else if (m <= v.overheat) {

                power = v.chargedP;

            } else if (m <= v.stablizing) {

                let k = v.chargedP / Math.pow(v.stablizing - v.overheat, 2)
                power = k * Math.pow(v.stablizing - m, 2)

            } else if (m <= v.stablized) {

                let slope = v.stablizedP / (v.stablized - v.stablizing)
                power = slope * (m - v.stablizing);

            } else if (DATABASE_CHALLENGE.isBought(g, 5)) {

                power = v.stablizedP * (1 + Math.log(m - v.stablized + 1) / 100)

            } else {

                power = v.stablizedP

            }

            return Math.max(0, power)

        },
        effect(g) {
            let base = 1 + this.power(g, g.laser.time)
                         * (1 + 0.1 * g.upgrades[7])
                         * DATABASE_PRISM.applyUpg(g, 10)
                         * (DATABASE_CHALLENGE.isInChallenge(g, 2) ? 0.5 : 1)

            return base
        },
        status: (g) => {
            if (!g.laser.isActive) return "deactivated"

            let m = g.laser.time/60
            let v = DATABASE_LASER.laser.vars(g)

            if (m <= v.charged) {
                return "charging"
            } else if (m <= v.overheat) {
                return "charged"
            } else if (m <= v.stablizing) {
                return "overheat"
            } else if (m <= v.stablized) {
                return "stablizing"
            } else if (DATABASE_CHALLENGE.isBought(g, 5)) {
                return "softcapped"
            } else {
                return "stablized"
            }
        }
    },
    lensesCost: new Decimal(1e45),
    getLens(id) {
        return this.lenses.filter(l => l.id === id)[0]
    },
    getLensBoost(g, id) {
        let base = this.getLens(id).boost

        base = 1 + (base - 1) * DATABASE_CHALLENGE.applyUpg(g, 2)
            * (g.interference.current !== 0 && DATABASE_CHALLENGE.isBought(g, 8) ? 3 : 1)

        if (DATABASE_CHALLENGE.isInChallenge(g, 1)) {
            base = 1 + (base - 1) * 0.5
        }

        return base
    },
    lenses: [
        {
            id: 1,
            tier: 1,
            name: "Crank it up!",
            desc: "The energy level of the laser when charged is 30% higher, but it overheats 40% faster",
            color: "red",
            boost: 1.3
        },
        {
            id: 2,
            tier: 1,
            name: "Catalyst",
            desc: "The energy level of the laser is 20% higher",
            color: "green",
            boost: 1.2
        },
        {
            id: 3,
            tier: 1,
            name: "Coolant stablization",
            desc: "The stablization energy level cap is 30% higher, but it takes x3 time to stablize the laser",
            color: "blue",
            boost: 1.3
        }
    ]
}
