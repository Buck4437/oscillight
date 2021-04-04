Vue.component("achievement", {
    data() {
        return {
        }
    },
    props: {
        game: Object,
        achievement: Object
    },
    computed: {
        hasAchievement() {
            return DATABASE_ACHIEVEMENT.hasAchievement(this.game, this.achievement.id)
        },
        isSecret() {
            return this.achievement.isSecret === true && !this.hasAchievement;
        },
        path() {
            if (this.isSecret) {
                return "src/secret.png"
            }
            return this.achievement.path ? this.achievement.path : "src/icon.png";
        }
    },
    methods: {
        toQuestionMark(input) {
            let str = "";
            for (let i = 0; i < input.length; i++) {
                if (input.charAt(i) === " ") {
                    str += " "
                } else {
                    str += "?"
                }
            }
            return str;
        }
    },
    mounted() {
    },
    template: `
    <div class="ach-con" :class="hasAchievement ? 'green' : ''">
        <img class="ach-img" :src="path">
        <div class="ach-text">
            <span class="ach-name">{{isSecret ? toQuestionMark(achievement.name) : achievement.name}} {{hasAchievement ? "(Completed!)" : ""}}</span>
            <span>{{isSecret ? toQuestionMark(achievement.description) : achievement.description}}</span>
            <span>{{achievement.reward ? "Reward: " + (isSecret ? toQuestionMark(achievement.reward) : achievement.reward) : ""}}</span>
        </div>
    </div>`
})
