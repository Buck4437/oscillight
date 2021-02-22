"use strict";

Vue.component("settings-tab", {
    data() {
        return {
            SAVE_NAME,
            themes,
            showWipeDataModal: false,
            showImportModal: false
        }
    },
    methods: {
        switchTheme() {
            this.game.settings.theme ++;
            if (this.game.settings.theme >= themes.length) {
                this.game.settings.theme = 0;
            }
            setTheme(this.game.settings.theme);
        },
        reset() {
            localStorage.removeItem(SAVE_NAME);
            location.reload();
        }
    },
    props: {
        game: Object
    },
    template: `
    <div class="tab settings-tab">
        <button @click="switchTheme">
            Theme: {{themes[game.settings.theme]}}
        </button>

        <button class="warning" @click="showWipeDataModal = true">
            Wipe all data
        </button>

        <confirmation-modal v-if="showWipeDataModal" @yes="reset" @no="showWipeDataModal = false">
            <template #header>
                <span class="warning">Wipe all data</span>
            </template>

            Are you sure you want to wipe all user data? <span class="warning">This cannot be undone!</span>
        </confirmation-modal>
    </div>
    `
})
