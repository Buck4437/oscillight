"use strict";

Vue.component("amplification-tab-lens", {
    props: {
        game: Object,
        lens: Object
    },
    computed: {
        getBit() {
            return Math.pow(2, this.lens.id - 1)
        },
        isActive() {
            return (this.game.lenses & this.getBit) !== 0
        },
        isDeactivated() {
            return !this.game.laser.isActive
        }
    },
    methods: {
        equip() {
            if (this.isDeactivated) {
                if (DATABASE_ACHIEVEMENT.hasAchievement(this.game, 9)) {
                    this.game.lenses ^= this.getBit;
                } else if (this.isActive) {
                    this.game.lenses = 0; // Dismount the lens
                } else {
                    this.game.lenses = this.getBit; // Equip the lens
                }
            }
        }
    },
    mounted() {
    },
    template: `
    <div class="lens-upg-con">
        <div class="lens-upg upg" disabled
                :class="[lens.color, {'is-active': isActive}]">
            <div class="upg-name">
                {{lens.name}}
            </div>
            <div class="upg-desc">
                {{lens.desc}}
            </div>
        </div>
        <button class="equip-btn" @click="equip" :class="{'disabled': !isDeactivated}">
            {{isActive ? "Remove" : "Equip"}}
        </button>
    </div>
    `
})
