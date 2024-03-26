const TABS = {
    choose(id) {
        let new_tab = id+"Tab"
        if (player.tab != new_tab) {
            player.tab = new_tab
        }
    },
    update() {
        for (let t=0;t<TABS["list"].length;t++) {
            let tab = TABS.list[t]+"Tab"
            tmp.el[tab].setDisplay(player.tab == tab)
        }
        for (let x = 0; x < TABS.list.length; x++) {
            let tab = TABS.list[x]
            tmp.el[`CT_${tab}`].setDisplay(TAB_TERMINAL.unls[tab]())
        }
        
    },
    list: [
        "Main","Settings"
    ],
}

const TAB_TERMINAL = {
    classes: {
        Main: 'charged_text',
        Settings: 'magenta',
    },
    setup() {
        let html = ''
        for (let i=0;i<TABS.list.length; i++) {
            /**@param hi */
            html += `
            <button id="CT_${TABS.list[i]}" onclick="TABS.choose('${TABS.list[i]}')" class="${TAB_TERMINAL.classes[TABS.list[i]]||""}">Open ${TABS.list[i]} Tab</button>`
            new Element('Tab_Terminal').setHTML(html)
        }
    },
    unls: {
        'Main': () => true,
        'Settings': () => true
    },
    open() {
        player.tabterm.open = !player.tabterm.open
    },
    refresh() {
        tmp.el.Open_TT.setHTML(player.tabterm.open ? "Exit tab terminal" : "Open tab terminal")
        tmp.el.Tab_Terminal.setDisplay(player.tabterm.open)
    }
}