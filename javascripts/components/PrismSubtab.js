"use strict";

Vue.component("prism-subtab", {
    data() {
        return {
            canvas: {
                width: 240,
                height: 240
            }
        }
    },
    props: {
        game: Object
    },
    computed: {
        getUnlocked() {
            return this.game.unlocks.rainbow
        },
        getGain() {
            return DATABASE_PRISM.rainbow.gain(this.game);
        },
        canActivate() {
            return this.getGain.gt(0);
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
                DATABASE_PRISM.reset(this.game)
            }
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
                    ==> {{format(getGain, 2, 0)}} Rainbow
            </div>
        </div>

        Activating the prism will:
        <ul>
            <li>Convert all your light into rainbow</li>
            <li class="warning">Reset all your oscillation upgrades, laser and lenses</li>
        </ul>

        <button class="prism-btn"
                @click="activate"
                :class="{'disabled': !canActivate}">
            Activate the prism!
        </button>
    </div>
    `
})
