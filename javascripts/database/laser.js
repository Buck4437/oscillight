const DATABASE_LASER = {
    laser: {
        cost: new Decimal(3000),
        vars(g) {
            let v = {
                charged: 0.5,
                overheat: 1,
                stabilizing: 1.5,
                stabilized: 19.5,
                chargedP: 1,
                stabilizedP: 0.97,
                overheatPenalty: 0.5, // 0-1, 0 means no penalty and 1 means power = 0
            }

            if ((g.lenses & 1) !== 0) { // 1st lens
                v.chargedP *= DATABASE_LASER.getLensBoost(g, 1)
                v.overheat = 0.8;
            }

            if ((g.lenses & 2) !== 0) { // 2nd lens
                v.chargedP *= DATABASE_LASER.getLensBoost(g, 2)
                v.stabilizedP *= DATABASE_LASER.getLensBoost(g, 2)
                let delayO = (v.overheat - v.charged) * 0.5;
                let reductionS = (v.stabilized - v.stabilizing) * 0.5
                v.overheat += delayO;
                v.stabilizing += delayO;
                v.stabilized += (delayO - reductionS);
            }

            if ((g.lenses & 4) !== 0) { // 3rd lens
                v.stabilizedP *= DATABASE_LASER.getLensBoost(g, 3)
                v.stabilized *= 3;
            }

            if (DATABASE_PRISM.hasUpg(g, 6)) { // Quick charge
                let reductionC = v.charged * 0.8
                let reductionS = (v.stabilized - v.stabilizing) * 0.8
                v.charged -= reductionC

                v.overheat -= reductionC
                v.stabilizing -= reductionC
                v.stabilized -= (reductionC + reductionS)
            }

            if (DATABASE_ACHIEVEMENT.hasAchievement(g, 7)) { // Reduce penalty
                v.overheatPenalty = 0.1
            }

            return v;
        },
        power: (g, t = 0) => {
            // The unit used is second

            // It has been converted to minute because it's easier to calculate that way

            let v = DATABASE_LASER.laser.vars(g)
            let m = Math.max(0, t/60)
            let power;
            v.overheatP = Math.min(v.chargedP, v.stabilizedP) * (1 - v.overheatPenalty)

            if (m <= v.charged) {

                let k = v.chargedP / Math.pow(v.charged, 2); // y = kx^2 => k = y/x^2
                power = k * Math.pow(m, 2);

            } else if (m <= v.overheat) {

                power = v.chargedP;

            } else if (m <= v.stabilizing) {

                let k = (v.chargedP - v.overheatP) / Math.pow(v.stabilizing - v.overheat, 2)
                power = k * Math.pow(v.stabilizing - m, 2) + v.overheatP

            } else if (m <= v.stabilized) {

                let slope = (v.stabilizedP - v.overheatP) / (v.stabilized - v.stabilizing)
                power = slope * (m - v.stabilizing) + v.overheatP;

            } else if (DATABASE_CHALLENGE.hasUpg(g, 4)) {

                power = v.stabilizedP * (1 + Math.pow(Math.log(m - v.stabilized + 1), 0.3) / 8)

            } else {

                power = v.stabilizedP

            }

            return Math.max(0, power)

        },
        effect(g) {
            let base = 1 + this.power(g, g.laser.time)
                         * (1 + 0.1 * g.upgrades[7])
                         * DATABASE_PRISM.applyUpg(g, 10)
                         * (DATABASE_CHALLENGE.isInChallenge(g, 2) ? 0.5 : 1)

            return base;
        },
        status: (g) => {
            if (!g.laser.isActive) return "deactivated"

            let m = g.laser.time / 60
            let v = DATABASE_LASER.laser.vars(g)

            if (m <= v.charged) {
                return "charging"
            } else if (m <= v.overheat) {
                return "charged"
            } else if (m <= v.stabilizing) {
                return "overheat"
            } else if (m <= v.stabilized) {
                return "stabilizing"
            } else if (DATABASE_CHALLENGE.hasUpg(g, 4)) {
                return "softcapped"
            } else {
                return "stabilized"
            }
        }
    },
    lensesCost: new Decimal(1e45),
    getLens(id) {
        return this.lenses.filter(l => l.id === id)[0]
    },
    getLensBoost(g, id) {
        let base = this.getLens(id).boost(g)

        base = 1 + (base - 1) * (DATABASE_CHALLENGE.hasUpg(g, 8) ? 1.25 : 1)

        if (DATABASE_CHALLENGE.isInChallenge(g, 1)) { // Lenses are 75% weaker
            base = 1 + (base - 1) * 0.25
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
            boost: (g) => {
                return 1 + 0.3 * (DATABASE_CHALLENGE.hasUpg(g, 2) ? 1.5 : 1)
                               * (DATABASE_CHALLENGE.hasUpg(g, 12) ? 1.25 : 1)
            }
        },
        {
            id: 2,
            tier: 1,
            name: "Catalyst",
            desc: "The energy level of the laser is 25% higher, the laser overheats 50% slower and stabilizes 2x faster",
            color: "green",
            boost: () => 1.25
        },
        {
            id: 3,
            tier: 1,
            name: "Coolant stabilization",
            desc: "The stabilization energy level cap is 30% higher, but it takes x3 time to stabilize the laser",
            color: "blue",
            boost: (g) => {
                return 1 + 0.3 * (DATABASE_CHALLENGE.hasUpg(g, 14) ? 1.25 : 1)
            }
        }
    ]
}
