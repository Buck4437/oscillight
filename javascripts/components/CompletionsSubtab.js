"use strict";

Vue.component("completions-subtab", {
    data() {
        return {
            columns: ["R", "G", "B", "W", "Completed?"]
        }
    },
    props: {
        game: Object
    },
    watch: {

    },
    computed: {
        challenges() {
            return DATABASE_CHALLENGE.challenges
        },
        ranges() {
            let arr = [];
            for (let i = 0; i <= 15; i++) {
                arr.push(i);
            }
            return [arr.filter(i => i <= 7), arr.filter(i => i > 7)]
        }
    },
    methods: {
        completed(n) {
            return this.hasBit(this.game.interference.completed, n)
        },
        hasBit(num, id) {
            if (id === 0) return true
            return (num & Math.pow(2, id - 1)) !== 0
        }
    },
    mounted() {
    },
    template: `
    <div class="tab stats">
        <table v-for="range in ranges">
            <tr>
                <td v-for="c in challenges" :class="c.color">
                    {{c.acronym}}
                </td>
                <td>Completed?</td>
            </tr>
            <tr v-for="i in range">
                <td v-for="c in challenges" :class="hasBit(i, c.id) ? 'green' : 'red'">
                    {{hasBit(i, c.id) ? 1 : 0}}
                </td>
                <td v-if="i === 0">
                    /
                </td>
                <td v-else :class="completed(i) ? 'green' : 'red'">
                    {{completed(i) ? "Yes" : "No"}}
                </td>
            </tr>
        </table>
    </div>
    `
})
