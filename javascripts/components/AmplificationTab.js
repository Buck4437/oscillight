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
        getLensesCost() {
            return DATABASE_LASER.lensesCost;
        },
        canBuy() {
            return this.game.light.gte(this.getCost);
        },
        canBuyLenses() {
            return this.game.light.gte(this.getLensesCost);
        },
        getEnergyLevel() {
            return Math.round(this.getPower(this.game.laser.time) * 1000) / 1000
        },
        isLaserActive() {
            return this.game.laser.isActive
        },
        getToggleLaserState() {
            return this.isLaserActive ? "on" : "off"
        },
        getStatus() {
            return DATABASE_LASER.laser.status(this.game);
        },
        getEffect() {
            return DATABASE_LASER.laser.effect(this.game);
        },
        getUnlockedLenses() {
            return DATABASE_LASER.lenses.filter(l => {
                let maxTier = 1;
                return l.tier <= maxTier
            })
        }
    },
    methods: {
        getCssVar(name) {
            return getCssVar(name);
        },
        getPower(t = 0) {
            return DATABASE_LASER.laser.power(this.game, t)
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

            let dt = t >= 60 ? t - 60 : 0
            let dy = this.getY(t) <= 0.5 ? 0.5 - this.getY(t) : 0
            for (let x = 0; x <= 360; x += 1) { // 360 steps
                ctx.lineTo(w/360 * x, h * (this.getY(x / 3 + dt) + dy)); // draw the point
            }
            ctx.stroke(); // strokes the drawing to the canvas

            ctx.beginPath();
            ctx.arc(w/360 * (t >= 60 ? 180 : t * 3) , h * (this.getY(t) + dy), 10, 0, 2 * Math.PI);
            ctx.fillStyle = this.getCssVar("--color-red")
            ctx.fill()
            ctx.stroke()
        },
        getY(t = 0) {
            return 0.9 - this.getPower(t) * 0.8
        },
        format(num, a, b) {
            return toSci(num, a, b)
        },
        unlock() {
            if (this.canBuy) {
                this.game.light = this.game.light.minus(this.getCost)
                this.game.unlocks.laser = true
            }
        },
        unlockLenses() {
            if (this.canBuyLenses) {
                this.game.light = this.game.light.minus(this.getLensesCost)
                this.game.unlocks.lenses = true
            }
        },
        toggle() {
            this.game.laser.isActive = !this.isLaserActive
            this.game.laser.time = 0; //reset
        },
        capFirstLetter(str) {
            return str.charAt(0).toUpperCase() + str.substring(1)
        }
    },
    mounted() {
        this.draw()
    },
    template: `
    <div class="tab laser">
        <button v-if="!game.unlocks.laser" class="upg"
                      :class="canBuy ? 'canBuy' : 'locked'"
                      @click="unlock">
            <span>Unlock Laser</span>
            <span>Cost: {{format(getCost)}} Light</span>
        </button>
        <div v-else class="laser-content">
            <div class="mini-header"
                 :class="{
                     'warning': getStatus === 'overheat',
                     'green': ['charged', 'stablized', 'softcapped'].includes(getStatus)
                 }">
                Laser status: {{capFirstLetter(getStatus)}}
            </div>

            <canvas class="laser-display" :width="canvas.width" :height="canvas.height"/>

            <span>Energy level: {{format(getEnergyLevel, 2, 3)}}</span>
            <span>=> ^{{format(getEffect)}} to light gain</span>

            <button class="toggle-laser-btn"
                    :class="getToggleLaserState"
                    @click="toggle">
                {{isLaserActive ? "Deactivate" : "Activate"}} the laser!
            </button>

            <button v-if="!game.unlocks.lenses"
                          class="upg"
                          :class="canBuyLenses ? 'canBuy' : 'locked'"
                          @click="unlockLenses">
                <div>Unlock Lenses</div>
                <div>Cost: {{format(getLensesCost)}} Light</div>
            </button>

            <div v-else class="lenses-context">
                Deactivate the laser to equip a lens!

                <div class="upg-con">
                    <amplification-tab-lens v-for="lens in getUnlockedLenses"
                                              :game="game"
                                              :lens="lens"
                                              :key="lens.id"/>
                </div>
            </div>
        </div>
    </div>`
})
