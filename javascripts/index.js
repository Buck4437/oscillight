"use strict";

var app = new Vue({
    el: "#app",
    data: {
        game,
        currentTab: ""
    },
    computed: {
        tabs() {
            return ["Wave", "Settings"]
        },
        currentTabComponent() {
            return this.currentTab.toLowerCase() + "-tab"
        }
    },
    methods: {
        format(num) {
            return toSci(num);
        },
        loop() {
            return gameLoop(this);
        },
        switchTab(i) {
            this.currentTab = this.tabs[i];
            scroll(0,0); //scroll to top
        },
        setIntevals() {
            setInterval(this.loop, 50);

            setInterval(() => {
                localStorage.setItem(SAVE_NAME, JSON.stringify(this.game))
                console.log("Game saved!");
            }, 10000)
        }
    },
    created() {
        this.switchTab(0);
    },
    mounted() {

        if (localStorage.getItem(SAVE_NAME) !== null) {
            let data = JSON.parse(localStorage.getItem(SAVE_NAME));
            console.log(saveFixer(data, this.game));
            this.game = saveFixer(data, this.game);
        }

        loadTheme();

        setTimeout(() => {
            var body = document.querySelector("body");
            body.classList.add("ready");
            this.setIntevals();
        }, 500) // for the theme to apply propertly, and also to prevent sudden transition
    }
})

function saveFixer(obj, def) {
    let data = {}
    if (Array.isArray(def)) {
        if (def.length === 0) {
            return Array.isArray(obj) ? obj : def;
        } else {
            data = []
        }
    }

    for (let key in def) {
        if (obj[key] === undefined || obj[key] === "NaN") {
            data[key] = def[key]
        } else if (typeof obj[key] === "string" && def[key] instanceof Decimal) {
            data[key] = new Decimal(obj[key])
        } else if (typeof obj[key] !== typeof def[key]) {
            data[key] = def[key]
        } else if (typeof obj[key] === "object" && typeof def[key] === "object") {
            data[key] = saveFixer(obj[key], def[key])
        } else {
            data[key] = obj[key]
        }
    }
    return data;
}

function gameLoop(that){
    let g = that.game;
    let dt = (Date.now() - g.lastTick) / 1000

    g.period = (g.period + DATABASE_WAVE.light.speed(g) * dt) % 360
    g.light = g.light.add(DATABASE_WAVE.light.rate(g) * dt)

    if (g.accelerate.active) {
        g.accelerate.timer = Math.max(0, g.accelerate.timer - dt)
        if (g.accelerate.timer <= 0) g.accelerate.active = false
    }

    g.lastTick += dt * 1000
}
