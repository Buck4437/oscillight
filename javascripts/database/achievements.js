const DATABASE_ACHIEVEMENT = {
    check(g) {
        for (let a of this.achievements) {
            if (!this.hasAchievement(g, a.id)) {
                if (a.condition !== undefined) {
                    if (a.condition(g)) {
                        this.addAchievement(g, a.id)
                    }
                }
            }
        }
    },
    // Used for secret achievements etc.
    addAchievement(g, i) {
        g.achievements |= Math.pow(2, i - 1)

        // Display toast
        toastr.success(this.getAchievement(i).name, "Achievement Unlocked!")
    },
    getAchievement(i) {
        const entries = this.achievements.filter(a => a.id === i);
        return entries.length === 0 ? null : entries[0];
    },
    hasAchievement(g, i) {
        return (g.achievements & Math.pow(2, i - 1)) !== 0
    },
    achievements: [
        {
            id: 1,
            name: "Let there be light!",
            description: "Get 10 Light",
            condition(g) {
                return g.light.gte(10);
            }
        },
        {
            id: 2,
            name: "Placeholder",
            description: "Placeholder2",
            condition(g) {
                return false;
            }
        },
        {
            id: 3,
            name: "Rewardable",
            description: "Placeholder2",
            condition(g) {
                return false;
            },
            reward: "Fuck you"
        },
        {
            id: 4,
            path: "src/oscillight.png",
            name: "Image",
            description: "Placeholder2",
            condition(g) {
                return false;
            },
            reward: "blobble"
        },
        {
            id: 5,
            name: "Unachievable achievement",
            description: "Placeholder2",
            reward: "blobble",
            path: "src/oscillight.png",
            isSecret: true
        }
    ]
}
