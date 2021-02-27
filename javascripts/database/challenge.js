const DATABASE_CHALLENGE = {
    challenges: [
        {
            id: 1,
            acronym: "R",
            color: "red",
            name: "red name placeholder",
            description: "red description placeholder"
        },
        {
            id: 2,
            acronym: "B",
            color: "blue",
            name: "blue name placeholder",
            description: "blue description placeholder"
        },
        {
            id: 3,
            acronym: "G",
            color: "green",
            name: "green name placeholder",
            description: "green description placeholder"
        },
        {
            id: 4,
            acronym: "Y",
            color: "yellow",
            name: "yellow name placeholder",
            description: "yellow description placeholder"
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
            requirement: new Decimal("1e75")
        }
    ],
    getRequirement(g) {
        let id = g.interference.current
        for (let r of this.requirements) {
            if (id === r.id) return r.requirement
        }
        return new Decimal("1e9999")
        // return DATABASE_PRISM.baseRequirement
    }
}
