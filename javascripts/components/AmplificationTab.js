Vue.component("amplification-tab", {
    data() {
        return {
            canvas: {
                width: 480,
                height: 240
            }
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
    props: {
        game: Object
    },
    computed: {
        getCost() {
            return DATABASE_LASER.cost
        },
        canBuy() {
            return this.game.light.gte(this.getCost);
        }
    },
    methods: {
        getCssVar(name) {
            return getCssVar(name);
        },
        draw() {
            let w = this.canvas.width, h = this.canvas.height;

            // I just copied the code from Oscillation tab

            let c = this.$el.querySelector(".laser-display") // get the canvas object to draw onto
            if (c === null) return;

            let ctx = c.getContext("2d"); // will use simpe 2D context on the canvas
            ctx.clearRect(0, 0, w, h); // clear the canvas

            ctx.strokeStyle = this.getCssVar("--color")
            ctx.lineWidth = 2;

            ctx.moveTo(0, h/2);  // back to the left before drawing the sine
            ctx.beginPath()

            for (let x = 0; x <= 360; x += 1) { // 360 steps
                let y = this.getY(x) // calculate y flipped horizontally, converting from DEG to RADIAN
                ctx.lineTo(w/360 * x, h/360 * y); // draw the point
            }
            ctx.stroke(); // strokes the drawing to the canvas

            ctx.beginPath();
            ctx.arc(w/360 * 180, h/360 * this.getY(180), 10, 0, 2 * Math.PI);
            ctx.fillStyle = this.getCssVar("--color-red")
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
        unlock() {
            if (this.canBuy) {
                this.game.light = this.game.light.minus(this.getCost)
                this.game.unlocks.laser = true
            }
        }
    },
    mounted() {
        this.draw()
    },
    template: `
    <div class="tab laser">
        <div v-if="game.unlocks.laser" class="laser-content">
            <canvas class="laser-display" :width="canvas.width" :height="canvas.height"/>
        </div>
        <button v-else class="upg-btn"
                      :class="canBuy ? 'canBuy' : 'locked'"
                      @click="unlock">
            <span>Unlock Laser</span>
            <span>Cost: {{format(getCost)}} Light</span>
        </button>
    </div>`
})
