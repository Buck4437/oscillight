"use strict";

Vue.component("reflection-tab", {
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

            // I'm reusing the code in Oscillation tab

            let c = this.$el.querySelector("canvas") // get the canvas object to draw onto

            if (c === null) return //Haven't unlocked mirror => break

            let ctx = c.getContext("2d"); // will use simpe 2D context on the canvas
            ctx.clearRect(0, 0, w, h); // clear the canvas
            ctx.beginPath()

            ctx.strokeStyle = this.getCssVar("--color")
            ctx.lineWidth = 2;

            ctx.moveTo(0, h/2);  // back to the left before drawing the sine

            for (let x = 0; x <= 360; x += 1) {
                let y = this.getY(x)
                ctx.lineTo(w/360 * x, h/360 * y); // draw the point
            }
            ctx.stroke(); // strokes the drawing to the canvas

            ctx.beginPath();
            ctx.arc(w/360 * 180, h/360 * this.getY(180), 10, 0, 2 * Math.PI);
            ctx.fillStyle = this.getCssVar("--color-yellow")
            ctx.fill()
            ctx.stroke()

            //area under straight abs line is 1
        },
        getY(x) {
            return Math.abs(180 - (this.game.period + x) % 360) * 2 //0 - 360
        },
        format(num) {
            return toSci(num)
        }
    },
    mounted() {
        this.draw()
    },
    template: `
    <div class="tab reflection">
        <div v-if="game.unlocks.mirror" class="reflection-content">
            <div class="mini-header">
                Hall of Mirrors
            </div>
            <canvas class="mirror-display" :width="canvas.width" :height="canvas.height"/>
        </div>
        <button v-else>
            Unlock Hall of Mirrors<br>
            Requirement: Placeholder because I hv to work on ui
        </button>
    </div>
    `
})
