const SAVE_NAME = "Buck4437_Oscillight_Save"

if (localStorage.getItem(SAVE_NAME) === null) {
    let oldSave = localStorage.getItem("IGJ2021LightSave")
    if (oldSave !== null) {
        localStorage.setItem(SAVE_NAME, oldSave)
        localStorage.removeItem("IGJ2021LightSave")
    }
}

function saveUpdater(old, fixed) {
    if (old.saveVersion === 1) {
        fixed.interference.upgrades = 0; // Interference has been revamped
        fixed.stats = {
            currentTime: {
                prism: 1e10,
                meta: 1e10
            },
            resets: {
                prism: old.resets,
                meta: old.buffs
            }
        }
        fixed.saveVersion = 2
    }

    return fixed;
}
