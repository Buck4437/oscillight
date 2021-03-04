const EMERGENCY = {
    export() {
        copyText(btoa(window.localStorage.getItem(SAVE_NAME)));
    },
    reset() {
        if (confirm("Are you sure you want to reset the game?")) {
            window.localStorage.removeItem(SAVE_NAME);
            location.reload();
        }
    }
}

setTimeout(() => {
    let el = document.querySelector(".fail-save")
    if (el !== undefined) {
        el.style.display = "block"
    }
}, 7000)
