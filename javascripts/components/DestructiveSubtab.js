"use strict";

Vue.component("destructive-subtab", {
    data() {
        return {
            config: 0
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
        current() {
            return this.game.interference.current
        },
        isInChallenge() {
            return this.current !== 0
        },
        canEnter() {
            return !this.isInChallenge && this.config !== 0
        },
        canExit() {
            return this.isInChallenge
        }
    },
    methods: {
        hasBit(num, id) {
            return (num & Math.pow(2, id - 1)) !== 0
        },
        toggle(id) {
            this.config ^= Math.pow(2, id - 1)
        },
        enter() {
            if (this.canEnter) {
                DATABASE_CHALLENGE.enterChallenge(this.game, this.config)
            }
        },
        exit() {
            if (this.canExit) {
                DATABASE_CHALLENGE.exitChallenge(this.game)
            }
        }
    },
    mounted() {
    },
    template: `
    <div class="tab challenge">
        <div class="challenge-config">
            <table>
                <tr>
                    <td>Interference</td>
                    <td v-for="c in challenges">
                        <div :class="c.color">
                            {{c.acronym}}
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>Loadout</td>
                    <td v-for="c in challenges">
                        <div v-if="isInChallenge"
                             :class="hasBit(current, c.id) ? 'green' : 'red'">
                            {{hasBit(current, c.id) ? "1" : "0"}}
                        </div>
                        <button v-else
                                @click="toggle(c.id)"
                                :class="hasBit(config, c.id) ? 'green' : 'red'"
                                class="config-btn">
                            {{hasBit(config, c.id) ? "1" : "0"}}
                        </button>
                    </td>
                </tr>
            </table>
            <div class="transverse-btn-con">
                <button :class="{'disabled': !canEnter}" @click="enter">
                    Enter interference
                </button>
                <button :class="{'disabled': !canExit}" @click="exit">
                    Exit interference
                </button>
            </div>
            <div class="challenge-warn">
                <div class="challenge-warn-header">
                    Entering/Exiting an interference will:
                </div>
                <ul>
                    <li>Convert all your lights into rainbow, if possible</li>
                    <li class="warning">Reset all oscillation upgrades, laser and lenses</li>
                </ul>
            </div>
        </div>
        <div>
            Current interference table placeholder(at top right)<br>
            Exit placeholder <br>
            Challenge description placeholder(at bottom right)
        </div>
    </div>
    `
})
