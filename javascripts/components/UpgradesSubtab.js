"use strict";

Vue.component("upgrades-subtab", {
    data() {
        return {

        }
    },
    props: {
        game: Object
    },
    computed: {
        unlocked() {
            return this.game.unlocks.rainbowUpgrades
        },
        getUnlockedUpgrades() {
            return DATABASE_PRISM.upgrades;
        }
    },
    methods: {
        format(num, a, b) {
            return toSci(num, a, b)
        }
    },
    template: `
    <div class="tab">
        <div v-if="unlocked" class="upg-con prism-upg-con">
            <dispersion-tab-upgrade v-for="upg in getUnlockedUpgrades"
                                    :game="game"
                                    :upgrade="upg"
                                    :key="upg.id"/>
        </div>
        <div v-else>
            Unlocks after activating prism!
        </div>
    </div>
    `
})
