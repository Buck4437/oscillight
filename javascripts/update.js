const SAVE_NAME = "Buck4437_Oscillight_Save"

if (localStorage.getItem(SAVE_NAME) === null) {
    let oldSave = localStorage.getItem("IGJ2021LightSave")
    if (oldSave !== null) {
        localStorage.setItem(SAVE_NAME, oldSave)
        localStorage.removeItem("IGJ2021LightSave")
    }
}
