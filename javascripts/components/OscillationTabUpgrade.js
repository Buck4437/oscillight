"use strict";

Vue.component("oscillation-tab-upgrade", {
    props: {
        game: Object,
        upgrade: Object
    },
    computed: {
        getLevel() {
            return this.game.upgrades[this.upgrade.id] || 0
        },
        getCost() {
            return this.upgrade.base.times(Decimal.pow(this.upgrade.scale, this.getLevel))
        },
        getState() {
            if (this.getLevel >= this.upgrade.cap) return "max"
            else if (this.getCost.lte(this.game.light)) return "canBuy"
            return "locked"
        },
        getCurrent() {
            let c = this.upgrade.current;
            if (c === undefined) return undefined
            else if (isFunction(c)) return c(this.game);
            return c;
        }
    },
    methods: {
        buy() {
            if (this.getState === "canBuy") {
                this.game.light = this.game.light.minus(this.getCost)
                this.game.upgrades[this.upgrade.id] = this.getLevel + 1
            }
        },
        buyMax() {
            for (let i = 0; i < 15; i++) {
                if (this.getState !== "canBuy") return
                this.buy();
            }
            let s = this.upgrade.scale, y = this.game.light, k = this.upgrade.base
            let levels = Math.max(0, Math.floor(Decimal.log(y/k, s)));
            this.buy();

            this.game.upgrades[this.upgrade.id] = levels;
        },
        format(num, a = 2, b = 0) {
            return toSci(num, a, b);
        },
        getCssVar(name) {
            return getCssVar(name);
        }
    },
    mounted() {
    },
    template: `
    <button class="upg" :class="getState" @click="buy">
        <div class="upg-name">
            {{upgrade.name}}
        </div>
        <div class="upg-desc">
            {{upgrade.desc}}
        </div>
        <div v-if="getCurrent !== undefined" class="upg-current">
            Current: x{{format(getCurrent, 2, 2)}}
        </div>
        <div v-if="getState !== 'max'" class="upg-cost">
            Cost: {{format(getCost)}} Light
        </div>
        <div class="upg-cost">
            ({{getLevel}}/{{upgrade.cap}})
        </div>
    </button>
    `
})
