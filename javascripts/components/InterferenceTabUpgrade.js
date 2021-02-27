"use strict";

Vue.component("interference-tab-upgrade", {
    props: {
        game: Object,
        upgrade: Object
    },
    computed: {
        getBit() {
            return Math.pow(2, this.upgrade.id - 1)
        },
        getNodes() {
            return DATABASE_CHALLENGE.nodes(this.game)
        },
        isBought() {
            return DATABASE_CHALLENGE.isBought(this.game, this.upgrade.id)
        },
        isUnlocked() {
            let u = this.upgrade
            if (u.parent === undefined) return true
            return DATABASE_CHALLENGE.isBought(this.game, u.parent)
        },
        getState() {
            if (this.isBought) return "max"
            else if (this.upgrade.cost <= this.getNodes && this.isUnlocked) return "canBuy"
            return "locked"
        },
        getCurrent() {
            let c = this.upgrade.current;
            if (c === undefined) return undefined
            if (isFunction(c)) return c(this.game);
            return c;
        }
    },
    methods: {
        buy() {
            if (this.getState === "canBuy") {
                this.game.interference.upgrades |= this.getBit
            }
        },
        format(num, a = 2, b = 0) {
            return toSci(num, a, b);
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
        <div v-if="!isBought" class="upg-cost">
            Cost: {{format(upgrade.cost)}} Node
        </div>
    </button>
    `
})
