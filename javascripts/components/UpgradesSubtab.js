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
        <div class="upg-con prism-upg-con">
            <dispersion-tab-upgrade v-for="upg in getUnlockedUpgrades"
                                    :game="game"
                                    :upgrade="upg"
                                    :key="upg.id"/>
        </div>
    </div>
    `
})
