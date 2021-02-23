"use strict";

Vue.component("alert-modal", {
    template: `
    <base-modal :showCloseButton="false">
        <template #header>
            <div class="modal-alert-header">
                <slot name="header">Alert</slot>
            </div>
        </template>
        <div class="modal-alert-content">
            <slot>Alert content</slot>
        </div>
        <template #footer>
            <div class="modal-alert-footer">
                <button class="modal-alert-btn" @click="$emit('ok')">
                    <slot name="ok">ok</slot>
                </button>
            </div>
        </template>
    </base-modal>
    `
})
