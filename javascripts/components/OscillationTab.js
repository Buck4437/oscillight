"use strict";

Vue.component("oscillation-tab", {
    data() {
        return {
            canvas: {
                width: 480,
                height: 240
            }
        }
    },
    props: {
        game: Object
    },
    computed: {
        getEnergy() {
            return DATABASE_WAVE.light.energy(this.game)
        },
        getProduction() {
            return DATABASE_WAVE.light.rate(this.game)
        },
        getSpeed() {
            return (DATABASE_WAVE.light.speed(this.game)) / 360
        },
        getUnlockedUpgrades() {
            return DATABASE_WAVE.upgrades.filter(u => this.game.unlocks.decelerate ? true : u.id <= 2)
        }
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
            let w = this.canvas.width, h = this.canvas.height;

            // source: https://stackoverflow.com/questions/29917446/drawing-sine-wave-in-canvas
            let c = this.$el.querySelector(".wave-display") // get the canvas object to draw onto
            let ctx = c.getContext("2d"); // will use simpe 2D context on the canvas
            ctx.clearRect(0, 0, w, h); // clear the canvas

            ctx.strokeStyle = this.getCssVar("--color")
            ctx.lineWidth = 2;

            ctx.moveTo(0, h/2);  // back to the left before drawing the sine
            ctx.beginPath()

            for (let x = 0; x <= 360; x += 1) { // 360 steps (degrees) for entire sine period
                let y = this.getY(x) // calculate y flipped horizontally, converting from DEG to RADIAN
                ctx.lineTo(w/360 * x, h/360 * y); // draw the point
            }
            ctx.stroke(); // strokes the drawing to the canvas

            ctx.beginPath();
            ctx.arc(w/360 * 180, h/360 * this.getY(180), 10, 0, 2 * Math.PI);
            ctx.fillStyle = this.getCssVar("--color-yellow")
            ctx.fill()
            ctx.stroke()

            //area under sine curve is 1
        },
        getY(x) {
            return 180.0 + Math.sin(x * Math.PI / 180 + Math.radian(this.game.period)) * 160;
        },
        format(num) {
            return toSci(num)
        },
        decel() {
            if (!this.game.decelerate.active) {
                this.game.decelerate.active = true;
                this.game.decelerate.timer = 1;
            }
        }
    },
    mounted() {
        this.draw()
    },
    template: `
    <div class="tab main">
        <div class="mini-header">
            Energy level: {{format(getEnergy)}}
        </div>
        <canvas class="wave-display" :width="canvas.width" :height="canvas.height"/>
        The photon is releasing {{format(getProduction)}} Light per second<br>
        Oscillation speed: {{format(getSpeed)}} Hz
        <div class="decel-con" v-if="game.unlocks.decelerate">
            <button class="decel-btn" @click="decel">
                Decelerate the photon!
            </button>
            <progress-bar class="decel-bar"
                          :percentage="this.game.decelerate.timer * 100"
                          :color="getCssVar('--color-yellow')"/>
        </div>
        <div v-if="game.unlocks.upgrades" class="upg-con">
            <oscillation-tab-upgrade v-for="upg in getUnlockedUpgrades"
                              :game="game"
                              :upgrade="upg"
                              :key="upg.id"/>
        </div>
    </div>
    `
})
