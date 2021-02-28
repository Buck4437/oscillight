"use strict";

Vue.component("prism-subtab", {
    data() {
        return {
            canvas: {
                width: 120,
                height: 120
            }
        }
    },
    props: {
        game: Object
    },
    watch: {
        theme() {
            this.draw()
        }
    },
    computed: {
        theme() {
            return this.game.settings.theme
        },
        getUnlocked() {
            return this.game.unlocks.rainbow
        },
        getGain() {
            return DATABASE_PRISM.gain(this.game);
        },
        canActivate() {
            return this.getGain.gt(0);
        },
        getGainInt() {
            return this.format(this.getGain, 2, 0)
        },
        getGainDec() {
            return "." + this.format(this.getGain, 2, 2).split(".")[1]
        },
        getRequirement() {
            return DATABASE_PRISM.requirement(this.game)
        },
        getActivations() {
            return this.game.resets
        },
        isAutoUnlocked() {
            return this.hasUpg(11)
        },
        isAutoActive() {
            return this.game.activate.auto
        },
        getAutoState() {
            return this.isAutoActive ? "on" : "off"
        },
        isValidValue() {
            return isNumberString(this.game.activate.value)
        },
        warning() {
            let str = "Reset all your oscillation upgrades"
            str += this.hasUpg(9) ? " (Except photon deceleration upgrade)" : ""
            str += !this.hasUpg(12) ? ", laser and lenses" : ""
            return str;
        }
    },
    methods: {
        getCssVar(name) {
            return getCssVar(name);
        },
        draw() {
            let w = this.canvas.width , h = this.canvas.height;

            let c = this.$el.querySelector(".prism-display")
            if (c === null) return;
            let ctx = c.getContext("2d");
            ctx.clearRect(0, 0, w, h);

            ctx.lineWidth = 2;
            ctx.strokeStyle = this.getCssVar("--color")

            ctx.beginPath();
            ctx.moveTo(w/2, 0);
            ctx.lineTo(2, h - 2);
            ctx.lineTo(w - 2, h - 2);
            ctx.closePath();
            ctx.stroke();

        },
        format(num, a, b) {
            return toSci(num, a, b)
        },
        capFirstLetter(str) {
            return str.charAt(0).toUpperCase() + str.substring(1)
        },
        activate() {
            if (this.canActivate) {
                if (!this.game.unlocks.rainbowUpgrades) {
                    document.querySelector(".mask").classList.add("is-active");
                    setTimeout(() => {
                        DATABASE_PRISM.reset(this.game)
                        this.$emit('switch-tab')
                    }, 1500)
                    setTimeout(() => {
                        document.querySelector(".mask").classList.remove("is-active");
                    }, 2000)
                } else {
                    DATABASE_PRISM.reset(this.game)
                }
            }
        },
        toggleAuto() {
            this.game.activate.auto = !this.isAutoActive;
        },
        hasUpg(i) {
            return DATABASE_PRISM.hasUpg(this.game, i)
        }
    },
    mounted() {
        this.draw();
    },
    template: `
    <div class="tab prism">
        <div class="prism-stats">
            <div class="prism-input">
                {{format(game.light)}} Light ==>
            </div>
            <canvas class="prism-display" :width="canvas.width" :height="canvas.height"/>
            <div class="prism-output">
                    <span v-if="getGain.lt(10)">==> {{getGainInt}}<span class="disabled">{{getGainDec}}</span> Rainbow</span>
                    <span v-else>==> {{format(getGain, 2, 0)}} Rainbow</span>
            </div>
        </div>

        <div class="prism-energy">
            Activation energy: <span :class="canActivate ? 'green' : 'red'">{{format(getRequirement)}} Light</span>
        </div>

        <div class="prism-activations">
            Number of activations: {{format(getActivations, 2, 0)}}
        </div>

        <div class="prism-warning">
            Activating the prism will:
            <ul>
                <li>Convert all your light into rainbow</li>
                <li class="warning">
                    {{warning}}
                </li>
            </ul>
        </div>

        <div>
            <button class="prism-btn"
                    @click="activate"
                    :class="{'disabled': !canActivate}">
                Activate the prism!
            </button>

            <button v-if="isAutoUnlocked"
                    class="auto-btn"
                    :class="getAutoState"
                    @click="toggleAuto">
                Auto: {{isAutoActive ? "On" : "Off"}}
            </button>
        </div>

        <span v-if="isAutoUnlocked" class="auto-desc">
            Activate the prism at X Rainbow:&nbsp<input class="auto-field"
                                                        v-model="game.activate.value"
                                                        :class="{'red': !isValidValue}">
        </span>
    </div>
    `
})
