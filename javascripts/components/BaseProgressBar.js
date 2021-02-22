"use strict"

Vue.component("progress-bar", {
    props: {
        percentage: Number,
        color: String
    },
    computed: {
        style() {
            return {
                width: this.percentage + "%",
                backgroundColor: this.color
            }
        }
    },
    template: `
    <div class="bar-con">
        <div class="bar-ctx" :style="style">
          
        </div>
    </div>
    `
})
