const DATABASE_LASER = {
    laser: {
        cost: new Decimal(5000),
        vars(g) {
            let v = {
                charged: 0.5,
                overheat: 1,
                stablizing: 1.5,
                softcapped: 19.5,
                chargedP: 1,
                stablizingP: 0.9,
                softcappedP: 0.97
            }

            if ((g.lenses & 1) !== 0) { // 1st lens
                v.chargedP *= 1.3;
                v.overheat = 0.8;
            }

            if ((g.lenses & 2) !== 0) { // 2nd lens
                v.chargedP *= 1.2;
                v.softcappedP *= 1.2;
            }

            if ((g.lenses & 4) !== 0) { // 3rd lens
                v.softcappedP *= 1.3;
                v.softcapped *= 2;
            }

            if (DATABASE_PRISM.hasUpg(g, 6)) { // Quick charge
                let reductionC = v.charged * 0.8
                let reductionS = (v.softcapped - v.stablizing) * 0.8
                v.charged -= reductionC
                v.overheat -= reductionC
                v.stablizing -= reductionC
                v.softcapped -= (reductionC + reductionS)
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

            } else if (m <= v.softcapped) {

                let slope = v.stablizingP / (v.softcapped - v.stablizing)
                power = slope * (m - v.stablizing);

            } else {

                let k = (v.softcappedP - v.stablizingP) * (v.softcapped + 0.5)
                power = v.softcappedP - k / (m + 0.5)

            }

            return Math.max(0, power)

        },
        effect(g) {
            let base = 1 + this.power(g, g.laser.time)
                         * (1 + 0.1 * g.upgrades[7])
                         * DATABASE_PRISM.applyUpg(g, 10)

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
            } else if (m <= v.softcapped) {
                return "stablizing"
            } else {
                return "softcapped"
            }
        }
    },
    lensesCost: new Decimal(1e45),
    lenses: [
        {
            id: 1,
            tier: 1,
            name: "Crank it up!",
            desc: "The energy level of the laser when charged is 30% higher, but it overheats 40% faster",
            color: "red"
        },
        {
            id: 2,
            tier: 1,
            name: "Catalyst",
            desc: "The energy level of the laser is 20% higher",
            color: "green"
        },
        {
            id: 3,
            tier: 1,
            name: "Coolant stablization",
            desc: "The energy level softcap is 30% higher, but it takes x2 time to stablize the laser",
            color: "blue"
        }
    ]
}
