"use strict";

Vue.component("oscillation-tab-upgrade", {
    props: {
        game: Object,
        upgrade: Object
    },
    computed: {
        getLevel() {
            return this.game.upgrades[this.upgrade.id]
        },
        getCost() {
            return this.upgrade.base.times(Decimal.pow(this.upgrade.scale, this.getLevel))
        },
        getState() {
            if (this.getLevel >= this.upgrade.cap) return "max"
            else if (this.getCost.lte(this.game.light)) return "canBuy"
            return "locked"
        }
    },
    methods: {
        buy() {
            if (this.getState === "canBuy") {
                this.game.light = this.game.light.minus(this.getCost)
                this.game.upgrades[this.upgrade.id]++;
            }
        },
        format(num) {
            return toSci(num, 2, 0);
        },
        getCssVar(name) {
            return getCssVar(name);
        }
    },
    mounted() {
    },
    template: `
    <button class="upg-btn" :class="getState" @click="buy">
        <div class="upg-name">
            {{upgrade.name}}
        </div>
        <div class="upg-desc">
            {{upgrade.desc}}
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
