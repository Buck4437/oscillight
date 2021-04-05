const DATABASE_CHALLENGE = {
    challenges: [
        {
            id: 1,
            acronym: "R",
            color: "red",
            name: "Red Interference",
            desc: "Lenses are 50% weaker"
        },
        {
            id: 2,
            acronym: "B",
            color: "blue",
            name: "Blue Interference",
            desc: "Laser is 50% weaker"
        },
        {
            id: 3,
            acronym: "G",
            color: "green",
            name: "Green Interference",
            desc: "Raise total light gain to the power of 0.75"
        },
        {
            id: 4,
            acronym: "Y",
            color: "gold", //yellow is too bright
            name: "Yellow Interference",
            desc: "All base light gain multipliers from oscillation upgrades are disabled"
        }
    ],
    enterChallenge(g, id = 0) {
        DATABASE_PRISM.reset(g, true)
        g.interference.current = id
    },
    exitChallenge(g) {
        this.enterChallenge(g)
    },
    requirements: [
        {
            id: 1,
            requirement: new Decimal("1e155")
        },
        {
            id: 2,
            requirement: new Decimal("1e60")
        },
        {
            id: 3,
            requirement: new Decimal("1e75")
        },
        {
            id: 4,
            requirement: new Decimal("1e80")
        },
        {
            id: 5,
            requirement: new Decimal("1.07e107")
        },
        {
            id: 6,
            requirement: new Decimal("1e50")
        },
        {
            id: 7,
            requirement: new Decimal("1e63")
        },
        {
            id: 8,
            requirement: new Decimal("1e36")
        },
        {
            id: 9,
            requirement: new Decimal("1e36")
        },
        {
            id: 10,
            requirement: new Decimal("1e36")
        },
        {
            id: 11,
            requirement: new Decimal("1e43")
        },
        {
            id: 12,
            requirement: new Decimal("1e37")
        },
        {
            id: 13,
            requirement: new Decimal("1e36")
        },
        {
            id: 14,
            requirement: new Decimal("1e36")
        },
        {
            id: 15,
            requirement: new Decimal("1e38")
        }
    ],
    getRequirement(id) {
        for (let r of this.requirements) {
            if (id === r.id) return r.requirement
        }
        return new Decimal("1e9999")
    },
    isInChallenge(g, id) {
        return (g.interference.current & Math.pow(2, id - 1)) !== 0
    },
    totalNodes(g) {
        let count = 0
        for (let i = 1; i <= 15; i++) {
            if ((g.interference.completed & Math.pow(2, i - 1)) !== 0) {
                count++;
            }
        }
        return count;
    },
    nodes(g) {
        let spent = this.upgrades.filter(u => this.hasUpg(g, u.id))
                                 .reduce((a, g) => a += g.cost, 0)
        return this.totalNodes(g) - spent;
    },
    hasUpg(g, id) {
        return (g.interference.upgrades & Math.pow(2, id - 1)) !== 0
    },
    applyUpg(g, id, def = 1) {
        return this.hasUpg(g, id) ? this.upgrades.filter(u => id === u.id)[0].current(g) : def
    },
    /*
    Upgrade format:
    REQUIRED
    id: number, must be unique
    tier: n-th row the upgrade will be on
    name: string, self explainatory
    desc: string, self explainatory
    cost: number, self explainatory

    OPTIONAL
    current: function that accepts g as input,
             should output a number / decimal
    prefix: the prefix used when displaying "current"
            the default is "x"
    parent: the upgrades needed to purchase before unlocking this one,
            should be a number (because yes)
    */
    upgrades: [
        {
            id: 1,
            tier: 1,
            name: "Fusion",
            desc: "Multiplier to light, increases based on light",
            current: (g) => Math.pow(1.2, Decimal.log10(g.light)) + 1,
            cost: 2
        },
        {
            id: 2,
            tier: 1,
            name: "Overclock",
            desc: "Red lens is 50% stronger",
            cost: 1
        },
        {
            id: 3,
            tier: 1,
            name: "Darkness",
            desc: "Multiplier to light based on total number of nodes",
            current: (g) => Math.pow(30, DATABASE_CHALLENGE.totalNodes(g)),
            cost: 1
        },
        {
            id: 4,
            tier: 1,
            name: "Upgrade 4",
            desc: "Stuff",
            current: (g) => 1,
            cost: 1
        },
        {
            id: 5,
            tier: 1,
            name: "Upgrade 5",
            desc: "Stuff",
            current: (g) => 1,
            cost: 2
        },
        {
            id: 6,
            tier: 2,
            parent: 1,
            name: "Upgrade 6",
            desc: "Stuff",
            current: (g) => 1,
            cost: 2
        },
        {
            id: 7,
            tier: 2,
            parent: 2,
            name: "Upgrade 7",
            desc: "Stuff",
            current: (g) => 1,
            cost: 2
        },
        {
            id: 8,
            tier: 2,
            parent: 3,
            name: "Upgrade 8",
            desc: "Stuff",
            current: (g) => 1,
            cost: 1
        },
        {
            id: 9,
            tier: 2,
            parent: 4,
            name: "Upgrade 9",
            desc: "Stuff",
            current: (g) => 1,
            cost: 1
        },
        {
            id: 10,
            tier: 2,
            parent: 5,
            name: "Upgrade 10",
            desc: "Stuff",
            current: (g) => 1,
            cost: 2
        },
        {
            id: 11,
            tier: 3,
            parent: 6,
            name: "Upgrade 11",
            desc: "Stuff",
            current: (g) => 1,
            cost: 4
        },
        {
            id: 12,
            tier: 3,
            parent: 7,
            name: "Upgrade 12",
            desc: "Stuff",
            current: (g) => 1,
            cost: 1
        },
        {
            id: 13,
            tier: 3,
            parent: 8,
            name: "Upgrade 13",
            desc: "Stuff",
            current: (g) => 1,
            cost: 1
        },
        {
            id: 14,
            tier: 3,
            parent: 9,
            name: "Upgrade 14",
            desc: "Stuff",
            current: (g) => 1,
            cost: 1
        },
        {
            id: 15,
            tier: 3,
            parent: 10,
            name: "Upgrade 15",
            desc: "Stuff",
            prefix: "+",
            current: (g) => 1,
            cost: 4
        },
        {
            id: 16,
            tier: 4,
            parent: 13,
            name: "Conclusion",
            desc: "Complete the game",
            current: (g) => 1,
            cost: 1
        }




        // {
        //     id: 1,
        //     tier: 1,
        //     name: "Divergence",
        //     desc: "Increased base light gain based on unspent rainbow",
        //     current: (g) => (Decimal.pow(g.rainbow, 0.75)),
        //     prefix: "+",
        //     cost: 1
        // },
        // {
        //     id: 2,
        //     tier: 1,
        //     name: "Convergence",
        //     desc: "Lenses are stronger based on unspent rainbow",
        //     current: (g) => (Decimal.log10(g.rainbow) * 2)/50 + 1,
        //     cost: 1
        // },
        // {
        //     id: 3,
        //     tier: 1,
        //     name: "Parallel",
        //     desc: "Multiplier to base light gain based on unspent rainbow",
        //     current: (g) => Math.pow(Decimal.log10(g.rainbow), 2) + 1,
        //     cost: 1
        // },
        // {
        //     id: 4,
        //     tier: 2,
        //     parent: 1,
        //     name: "Recursion",
        //     desc: "Gain more rainbow based on unspent rainbow",
        //     current: (g) => Math.pow(2, Decimal.log10(g.rainbow.add(1))),
        //     cost: 3
        // },
        // {
        //     id: 5,
        //     tier: 2,
        //     parent: 2,
        //     name: "Infinity",
        //     desc: "The stablization energy level is softcapped instead of hardcapped",
        //     cost: 3
        // },
        // {
        //     id: 6,
        //     tier: 2,
        //     parent: 3,
        //     name: "Phase shift",
        //     desc: "Boost the 4th dispersion upgrade (x => x^3)",
        //     cost: 3
        // },
        // {
        //     id: 7,
        //     tier: 3,
        //     parent: 4,
        //     name: "Fusion",
        //     desc: "Multiplier to light gain based on amount of light",
        //     current: (g) => Math.pow(1.3, Decimal.log10(g.light)) + 1,
        //     cost: 5
        // },
        // {
        //     id: 8,
        //     tier: 3,
        //     parent: 5,
        //     name: "Conclusion",
        //     desc: "Complete the game",
        //     cost: 11
        // },
        // {
        //     id: 9,
        //     tier: 3,
        //     parent: 6,
        //     name: "Supernova",
        //     desc: "Static multiplier to light gain", //big static multiplier to light
        //     current: (g) => new Decimal(6.66e6),
        //     cost: 5
        // }
    ]
}
