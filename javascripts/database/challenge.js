const DATABASE_CHALLENGE = {
    challenges: [
        {
            id: 1,
            acronym: "R",
            color: "red",
            name: "Red Interference",
            desc: "Laser is 50% weaker"
        },
        {
            id: 2,
            acronym: "B",
            color: "blue",
            name: "Blue Interference",
            desc: "Lenses are 50% weaker"
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
            desc: "Multipliers to light gain and base light gain are disabled"
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
            requirement: new Decimal("1e55")
        }

    // idea: r -> y -> b -> g -> ry -> yb -> bg -> rg -> rb -> yg -> rgb -> rgy -> bgy -> rby -> all
    ],
    getRequirement(id) {
        for (let r of this.requirements) {
            if (id === r.id) return r.requirement
        }
        return new Decimal("1e9999")
        // return DATABASE_PRISM.baseRequirement
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
        let spent = this.upgrades.filter(u => this.isBought(g, u.id))
                                 .reduce((a, g) => a += g.cost, 0)
        return this.totalNodes(g) - spent;
    },
    isBought(g, id) {
        return (g.interference.upgrades & Math.pow(2, id - 1)) !== 0
    },
    upgrades: [
        {
            id: 1,
            tier: 1,
            name: "Placeholder",
            desc: "Placeholder",
            cost: 1
        },
        {
            id: 2,
            tier: 1,
            name: "Placeholder",
            desc: "Placeholder",
            cost: 1
        },
        {
            id: 3,
            tier: 1,
            name: "Placeholder",
            desc: "Placeholder",
            cost: 1
        },
        {
            id: 4,
            tier: 2,
            parent: 1,
            name: "Placeholder",
            desc: "Placeholder",
            cost: 3
        },
        {
            id: 5,
            tier: 2,
            parent: 2,
            name: "Placeholder",
            desc: "Placeholder",
            cost: 3
        },
        {
            id: 6,
            tier: 2,
            parent: 3,
            name: "Placeholder",
            desc: "Placeholder",
            cost: 3
        },
        {
            id: 7,
            tier: 3,
            parent: 4,
            name: "Placeholder",
            desc: "Placeholder",
            cost: 5
        },
        {
            id: 8,
            tier: 3,
            parent: 5,
            name: "Placeholder",
            desc: "Placeholder",
            cost: 5
        },
        {
            id: 9,
            tier: 3,
            parent: 6,
            name: "Placeholder",
            desc: "Placeholder",
            cost: 5
        }
    ]
}
