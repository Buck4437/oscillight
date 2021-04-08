Vue.component("background-animation", {
    props: {
        game: Object
    },
    data() {
        return {
            interval: null,
            tick: Date.now(),
            period: 0
        }
    },
    computed: {
        getInterferences() {
            let array = []
            for (let c of DATABASE_CHALLENGE.challenges) {
                array.push(DATABASE_CHALLENGE.isInChallenge(this.game, c.id))
            }
            return array
        }
    },
    methods: {
        getCssVar(str) {
            return getCssVar(str)
        },
        draw() {
            let c = this.$el.querySelector(".bg") // get the canvas object to draw onto
            if (c === null) return; // Stops running if the canvas is hidden
            const w = c.width, h = c.height;

            let ctx = c.getContext("2d"); // will use simpe 2D context on the canvas
            ctx.clearRect(0, 0, w, h); // clear the canvas

            const COLORS = DATABASE_CHALLENGE.challenges.map(x => x.color)
            for (let i = 0; i < COLORS.length; i++) {
                if (this.getInterferences[i]) {
                    let color = this.getCssVar(`--color-${COLORS[i]}`) + "09"
                    this.drawWave(ctx, w, h, color, i / COLORS.length * 360)
                }
            }
        },
        drawWave(ctx, w, h, color, offset = 0) {
            ctx.strokeStyle = color
            ctx.lineWidth = 3;

            ctx.moveTo(0, h/2);  // move to the left before drawing the sine
            ctx.beginPath()

            for (let x = 0; x <= 360; x += 1) {
                let x2 = x + offset + this.period
                let y = 180.0 - Math.sin(x2 * Math.PI / 180) * 120; // calculate y flipped horizontally, converting from DEG to RADIAN
                ctx.lineTo(w/360 * x, h/360 * y); // draw the point
            }
            ctx.stroke(); // strokes the drawing to the canvas
        }
    },
    mounted() {
        this.interval = setInterval(() => {
            let dt = (Date.now() - this.tick) / 1000
            this.tick = Date.now()

            this.period = (this.period + dt * 12) % 360
            this.draw()
        }, 50)
    },
    destroyed() {
        clearInterval(this.interval);
    },
    template: `
    <div>
        <canvas class="bg" v-if="game.settings.effect.interference">
        </canvas>
    </div>
    `
})
