"use strict";

Vue.component("dispersion-tab", {
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
            if (c === null) return; // Stops running if the canvas is hidden
            let ctx = c.getContext("2d"); // will use simpe 2D context on the canvas
            ctx.clearRect(0, 0, w, h); // clear the canvas

            ctx.strokeStyle = this.getCssVar("--color")
            ctx.lineWidth = 2;

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
        }
    },
    mounted() {
        this.draw();
    },
    template: `
    <div class="tab main">
        <div class="mini-header">
            Prism
        </div>
        <div class="prism-stats">
            <div class="prism-input">
                Placeholder
            </div>
            <canvas class="prism-display" :width="canvas.width" :height="canvas.height"/>
            <div class="prism-output">
                Placeholder
            </div>
        </div>

        Activating prism will:

        <button class="decel-btn"
                :class="getToggleDecelState"
                @click="decel">
            {{isDecelActive ? "Cancel deceleration!" : "Decelerate the photon!"}}
        </button>
    </div>
    `
})
