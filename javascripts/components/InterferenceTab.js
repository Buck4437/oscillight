"use strict";

Vue.component("interference-tab", {
    data() {
        return {
            selectedTab: "",
            tabs: ["Constructive", "Destructive", "Completions"]
        }
    },
    props: {
        game: Object
    },
    computed: {
        currentTabComponent() {
            return this.selectedTab.toLowerCase() + "-subtab"
        }
    },
    methods: {
        switchTab(tab) {
            this.selectedTab = tab;
        }
    },
    created() {
        this.selectedTab = this.tabs[0];
    },
    template: `
    <div class="tab interference">
        <div class="subtab-nav">
            <button v-for="tab in tabs" @click="switchTab(tab)">
                {{tab}}
            </button>
        </div>
        <div class="subtab-con">
            <keep-alive>
                <component :is="currentTabComponent" :game="game"></component>
            </keep-alive>
        </div>
    </div>
    `
})
