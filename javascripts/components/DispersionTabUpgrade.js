"use strict";

Vue.component("dispersion-tab-upgrade", {
    props: {
        game: Object,
        upgrade: Object
    },
    computed: {
        getBit() {
            return Math.pow(2, this.upgrade.id - 1)
        },
        isBought() {
            return (this.game.rainbowUpgrades & this.getBit) !== 0
        },
        getState() {
            if (this.isBought) return "max"
            else if (this.upgrade.cost.lte(this.game.rainbow)) return "canBuy"
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
                this.game.rainbow = this.game.rainbow.minus(this.upgrade.cost)
                this.game.rainbowUpgrades |= this.getBit
            }
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
            Currently: x{{format(getCurrent, 2, 2)}}
        </div>
        <div v-if="getState !== 'max'" class="upg-cost">
            Cost: {{format(upgrade.cost)}} Rainbow
        </div>
    </button>
    `
})
