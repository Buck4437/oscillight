Vue.component("achievements-tab", {
    data() {
        return {
        }
    },
    props: {
        game: Object
    },
    computed: {
        moveCompletedDown() {
            return this.game.settings.moveAchievement;
        },
        totalAchievements() {
            return DATABASE_ACHIEVEMENT.achievements;
        },
        completedAchievements() {
            return this.totalAchievements.filter(a => {
                return DATABASE_ACHIEVEMENT.hasAchievement(this.game, a.id)
            })
        },
        getAchievements() {
            const ACH = this.totalAchievements;
            if (this.moveCompletedDown) {
                return ACH.filter(a => {
                    return !DATABASE_ACHIEVEMENT.hasAchievement(this.game, a.id)
                }).concat(this.completedAchievements)
            }
            return ACH;
        },
        hasAllAchievements() {
            return this.totalAchievements.length === this.completedAchievements.length;
        }
    },
    methods: {
    },
    template: `
    <div class="tab achievements">
        <span :class="hasAllAchievements ? 'green' : ''">
            Completed achievement: {{completedAchievements.length}}/{{totalAchievements.length}}
        </span>
        <button class="move-ach"
                :class="moveCompletedDown ? 'on' : 'off'"
                @click="game.settings.moveAchievement = !moveCompletedDown">
            Move completed achievement to the bottom: {{moveCompletedDown ? 'On' : 'Off'}}
        </button>
        <achievement v-for="a in getAchievements"
                     :game="game"
                     :achievement="a"
                     :key="a.id"/>
    </div>`
})
