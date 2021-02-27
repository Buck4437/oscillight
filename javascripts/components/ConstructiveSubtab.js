"use strict";

Vue.component("constructive-subtab", {
    data() {
        return {

        }
    },
    props: {
        game: Object
    },
    watch: {

    },
    computed: {
        getNodes() {
            return DATABASE_CHALLENGE.nodes(this.game)
        },
        respec() {
            return this.game.interference.respec
        },
        maxTier() {
            return DATABASE_CHALLENGE.upgrades.reduce((a, u) => a = (a < u.tier ? u.tier : a), 0)
        }
    },
    methods: {
        toggle() {
            this.game.interference.respec = !this.respec
        },
        getTierUpg(tier) {
            return DATABASE_CHALLENGE.upgrades.filter(u => u.tier === tier)
        }
    },
    mounted() {
    },
    template: `
    <div class="tab challenge-upg">
        <div class="node-count">
            Node: {{getNodes}}
        </div>
        <button class="respec-btn"
                @click="toggle"
                :class="['green', {'is-active': respec}]">
            Respec all upgrades when you activate prism
        </button>
        <div>
            <div v-for="i in maxTier" class="btn-row">
                <interference-tab-upgrade v-for="u in getTierUpg(i)"
                                          :game="game"
                                          :upgrade="u"
                                          :key="u.id"/>
            </div>
        </div>
    </div>
    `
})
