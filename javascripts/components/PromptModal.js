"use strict";

Vue.component("prompt-modal", {
    data() {
        return {
            input: ""
        }
    },
    mounted() {
        this.$el.querySelector("input").focus()
    },
    template: `
    <base-modal @close="$emit('close')">
        <template #header>
            <div class="modal-prompt-header">
                <slot name="header">Prompt</slot>
            </div>
        </template>
        <div class="modal-prompt-content">
            <slot>Enter data:</slot>
            <li>
                <input v-model="input"/>
            </li>
        </div>
        <template #footer>
            <div class="modal-prompt-footer">
                <button class="modal-confirm-btn" @click="$emit('submit', input)">
                    <slot name="submit">Submit</slot>
                </button>
            </div>
        </template>
    </base-modal>
    `
})
