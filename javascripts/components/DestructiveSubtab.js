"use strict";

Vue.component("destructive-subtab", {
    data() {
        return {
            config: 0,
            currentTab: 0
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
        selected() {
            return this.challenges[this.currentTab]
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
        },
        getRequirement() {
            return DATABASE_CHALLENGE.getRequirement(this.config)
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
        },
        format(n, a, b) {
            return toSci(n, a, b)
        }
    },
    mounted() {
    },
    template: `
    <div class="tab challenge">
        <div class="challenge-head">
            Enter interferences to gain node!<br>
            Each unique completion of interference grants 1 node.
        </div>
        <div class="challenge-body">
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
                    <tr>
                        <td>Requirement</td>
                        <td v-if="config === 0" colspan="2">/</td>
                        <td v-else colspan="2">{{format(getRequirement)}} Light</td>
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
                        <li>Reset everything that prism activation resets</li>
                        <li class="warning">Deactivate laser</li>
                    </ul>
                </div>
            </div>
            <div class="challenge-meta">
                <div class="challenge-nav">
                    <button v-for="(c, i) in challenges"
                            @click="currentTab = i"
                            :class="c.color">
                            {{c.acronym}}
                    </button>
                </div>
                <div class="challenge-info">
                    <span class="challenge-name">
                        {{selected.name}}
                    </span>
                    <span>
                        {{selected.desc}}
                    </span>
                </div>
            </div>
        </div>
    </div>
    `
})
