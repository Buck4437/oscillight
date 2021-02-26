"use strict";

Vue.component("prism-subtab", {
    data() {
        return {
            canvas: {
                width: 240,
                height: 240
            },
            colors: ["red", "green", "blue"]
        }
    },
    props: {
        game: Object
    },
    computed: {
    },
    watch: {
        game: {
            deep: true,
            handler() {
                this.draw();
            }
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

            for (let i = 2; i >= 0; i--) {
                let color = this.colors[i]
                let height = w * (i + 1) / 3
                let dx = w/2 * (i + 1) / 3

                ctx.beginPath();
                ctx.moveTo(w/2, 0);
                ctx.lineTo(w/2 - dx + 2, height - 2);
                ctx.lineTo(w/2 + dx - 2, height - 2);
                ctx.closePath();
                ctx.stroke();

                if (this.getUnlocked(color)) {
                    ctx.fillStyle = this.getCssVar("--color-" + color)
                    ctx.fill();
                }
            }

        },
        format(num, a, b) {
            return toSci(num, a, b)
        },
        getGain(color) {
            return DATABASE_PRISM[color].gain(this.game);
        },
        getUnlocked(color) {
            switch (color) {
                case "red": return this.game.unlocks.prism
                default: return false
            }
        },
        capFirstLetter(str) {
            return str.charAt(0).toUpperCase() + str.substring(1)
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
                <span v-for="color in colors"
                      :class="[color, {'invisible': !getUnlocked(color)}]">
                    ==> {{format(getGain(color), 2, 0)}} {{capFirstLetter(color)}}
                </span>
            </div>
        </div>

        Activating the prism will:
        <ul>
            <li>Convert all your light into color</li>
            <li class="warning">Reset all your upgrades, laser and lenses</li>
        </ul>

        <button class="prism-btn">
            Activate the prism!
        </button>
    </div>
    `
})
