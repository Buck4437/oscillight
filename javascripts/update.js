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
        // Revamped interference
        fixed.interference.upgrades = 0;

        // Swapped the order of 9th and 10th upgrade
        fixed.upgrades[9] = old.upgrades[10] || 0
        fixed.upgrades[10] = old.upgrades[9] || 0

        // Added new stats data to record time and resets
        fixed.stats = {
            currentTime: {
                prism: 1e10,
                meta: 1e10
            },
            resets: {
                prism: old.resets || 0,
                meta: old.buffs || 0
            }
        }

        // Changed the version
        fixed.saveVersion = 2

        console.log("The save file has been updated to version: 2")
    }

    return fixed;
}
