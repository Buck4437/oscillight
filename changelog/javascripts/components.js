Vue.component("main-content", {
    data() {
        return {
            DATA
        }
    },
    template: `
    <div>
        <header>
            <h1>{{DATA.header}}</h1>
            Current version: {{DATA.changelogs[0].version}}
        </header>

        <main>
            <div v-for="changelog in DATA.changelogs">
                <h2>Version {{changelog.version}}</h2>
                {{changelog.description}}
                <div v-for="change in changelog.changes">
                    <h3>{{change.header}}</h3>
                    <ul>
                        <li v-for="text in change.list">{{text}}</li>
                    </ul>
                </div>
            </div>
        </main>
    </div>
    `
})
