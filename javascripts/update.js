const SAVE_NAME = "Buck4437_Oscillight_Save"

if (localStorage.getItem(SAVE_NAME) === null) {
    let oldSave = localStorage.getItem("IGJ2021LightSave")
    if (oldSave !== null) {
        localStorage.setItem(SAVE_NAME, oldSave)
        localStorage.removeItem("IGJ2021LightSave")
    }
}

function saveUpdater(old) {
    if (old.saveVersion === undefined) {
        old.saveVersion = 1;
    }

    if (old.saveVersion === 1) {
        // Revamped interference
        if (old.interference === undefined) old.interference = {}
        if (old.interference.upgrades !== 0) {
            // Alert player
            toastr.options.timeOut = "10000"
            toastr.info(
                "Your interference upgrades have been respecced due to a game update.",
                "Game updater"
            )
            toastr.options.timeOut = "5000",
            old.interference.upgrades = 0;
        }

        // Swapped the order of 9th and 10th upgrade
        if (old.upgrades === undefined) old.upgrades = {}
        let temp = old.upgrades[10] || 0
        old.upgrades[10] = old.upgrades[9] || 0
        old.upgrades[9] = temp

        // Added new stats data to record time and resets
        old.stats = {
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
        old.saveVersion = 2

        console.log("The save file has been updated to version: 2")
    }

    if (old.saveVersion === 2) {
        // Added new mode to timer
        if (typeof old.activate.value === 'string' || old.activate.value instanceof String) {
            old.activate.value = [old.activate.value, "0", "0"];
            old.activate.mode = 0;
        }

        // Added new stat to keep track of the timer
        old.hasWon = true;

        // Changed the version
        old.saveVersion = 3;

        console.log("The save file has been updated to version: 3")
    }

    return old
}
