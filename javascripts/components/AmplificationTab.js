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
            return DATABASE_LASER.laser.cost
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
            let t = this.game.laser.time;
            // I just copied the code from Oscillation tab

            let c = this.$el.querySelector(".laser-display") // get the canvas object to draw onto
            if (c === null) return;

            let ctx = c.getContext("2d"); // will use simpe 2D context on the canvas
            ctx.clearRect(0, 0, w, h); // clear the canvas

            ctx.strokeStyle = this.getCssVar("--color")
            ctx.lineWidth = 2;

            ctx.moveTo(0, h);
            ctx.beginPath()

            for (let x = 0; x <= 360; x += 1) { // 360 steps
                let dt = t >= 180 ? t - 180 : 0
                ctx.lineTo(w/360 * x, h * this.getY(x + dt)); // draw the point
            }
            ctx.stroke(); // strokes the drawing to the canvas

            ctx.beginPath();
            ctx.arc(w/360 * (t >= 180 ? 180 : t) , h * this.getY(t), 10, 0, 2 * Math.PI);
            ctx.fillStyle = this.getCssVar("--color-red")
            ctx.fill()
            ctx.stroke()
        },
        getY(t = 0) {
            return 0.9 - DATABASE_LASER.laser.power(t) * 0.8
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
