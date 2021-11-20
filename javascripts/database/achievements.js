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
        let achievement;
        try {
            achievement = this.getAchievement(i);
        } catch(e) {
            console.error(e)
            return
        }
        if (!this.hasAchievement(g, i)) {
            g.achievements |= Math.pow(2, i - 1)
            toastr.success(achievement.name, "Achievement Unlocked!")
        }
    },
    getAchievement(i) {
        const entries = this.achievements.filter(a => a.id === i);
        if (entries.length === 1) {
            return entries[0];
        } else if (entries.length > 1) {
            throw `Error: There are multiple achievements with the id ${i}`
        }
        throw `Error: Achievement with id ${i} not found`
    },
    hasAchievement(g, i) {
        return (g.achievements & Math.pow(2, i - 1)) !== 0
    },
    /* achievement format:

    REQUIRED:
    id: Number, cannot be repeated.
    name: string, title of the achievement.
    description: string, way to complete the achievement.

    OPTIONAL:
    condition: function, returns a boolean, grants achievement automatically
               when the function returns true.
               default value: false
    reward: string, automatically formatted, display the reward of achievement
    path: string, provides path to the achievement image
    isSecret: boolean, when true, hides every info (except title) until
              the achievement has been obtained


    All secret achievement id should go from 50 to 49, 48...
    to separate them from normal achievements
    */

    achievements: [
        {
            id: 1,
            path: "src/light.png",
            name: "Let there be light!",
            description: "Reach 10 Light",
            condition(g) {
                return g.light.gte(10);
            }
        },
        {
            id: 2,
            path: "src/deceleration.png",
            name: "Photon stock market takeover",
            description: "Decelerate photon",
            condition(g) {
                return g.decelerate.isActive === true
            }
        },
        {
            id: 3,
            path: "src/laser.png",
            name: "Optical Amplification",
            description: "Activate laser",
            condition(g) {
                return g.laser.isActive === true
            }
        },
        {
            id: 4,
            path: "src/universe.png",
            name: "Light up the universe!",
            description: "Reach 1e25 Light",
            condition(g) {
                return g.light.gte("1e25")
            }
        },
        {
            id: 5,
            path: "src/lens.png",
            name: "Pre-emission tampering",
            description: "Equip a lens",
            condition(g) {
                return g.lenses !== 0
            }
        },
        {
            id: 6,
            path: "src/prism.png",
            name: "Fractured ray",
            description: "Activate prism",
            condition(g) {
                return g.unlocks.rainbowUpgrades === true
            },
            reward: "Unlock buy max"
        },
        {
            id: 7,
            path: "src/spectral.png",
            name: "Spectral Rupture",
            description: "Reach 1000 rainbow",
            condition(g) {
                return g.rainbow.gte(1000)
            },
             reward: "Reduce overheat penalty from 50% to 10%"
        },
        {
            id: 8,
            path: "src/double-slit.png",
            name: "Double-slit experiment",
            description: "Complete an interference",
            condition(g) {
                return g.interference.completed !== 0
            }
        },
        {
            id: 9,
            path: "src/infinity.png",
            name: "Infinity",
            description: "Reach 1e308 Light",
            condition(g) {
                return g.light.gte("1e308")
            },
            reward: "You can equip all three lenses at once"
        },
        {
            id: 10,
            path: "src/rbg.png",
            name: "Red, Blue, Green",
            description: "Complete 7 interferences",
            condition(g) {
                return DATABASE_CHALLENGE.totalNodes(g) >= 7
            }
        },
        {
            id: 11,
            path: "src/broke laser.png",
            name: "I broke the laser",
            description: "Reach 1e150 Light without ever activating laser in current prism reset",
            condition(g) {
                return g.light.gte("1e150") && g.achievementConditions["11"]
            }
        },
        {
            id: 12,
            path: "src/fragment.png",
            name: "Fragments of color",
            description: "Reach 1e20 rainbow",
            condition(g) {
                return g.rainbow.gte("1e20")
            }
        },
        {
            id: 13,
            path: "src/maximum.png",
            name: "Maximum",
            description: "Max all oscillation upgrades",
            condition(g) {
                for (let upg of DATABASE_WAVE.upgrades) {
                    if (g.upgrades[upg.id] < upg.cap) {
                        return false
                    }
                }
                return true
            }
        },
        {
            id: 14,
            path: "src/chromaticity.png",
            name: "Chromaticity",
            description: "Reach 1e30 Rainbow",
            condition(g) {
                return g.rainbow.gte("1e30")
            }
        },
        {
            id: 15,
            path: "src/beacon.png",
            name: "The Beacon",
            description: "Reach 1e900 Light",
            condition(g) {
                return g.light.gte("1e900")
            }
        }
    ]
}
