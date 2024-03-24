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
            if (player.essence.lt(SUPERNOVA.calcReq()))  {
                tmp.el[tab].setDisplay(player.tab == tab)
            } else if (player.essence.gte(SUPERNOVA.calcReq()) && player.sn.amt.lt(10)) {
                tmp.el[tab].setDisplay(false)
            }
        }
        tmp.el.CT_Pres.setDisplay(player.misc.hEss.gte(15))
        tmp.el.CT_Rank.setDisplay(player.misc.hEss.gte(2.5e5))
        tmp.el.CT_Eclipse.setDisplay(player.ranks.rank.gte(15) || player.eclipse.unl)
        
        tmp.el.CT_Abyss.setDisplay(player.abyss.unl || player.ranks.tier.gte(2))
        tmp.el.CT_Supernova.setDisplay(player.sn.unl)
        tmp.el["CT_INFINITY"].setDisplay(false)
    },
    list: [
        "Main","Pres","Rank","Eclipse","Abyss","Settings","Supernova","Challenges","INFINITY"
    ]
}

const TAB_TERMINAL = {
    classes: {
        Pres: 'sky',
        Rank: 'charged_text',
        Eclipse: 'orange',
        Abyss: "void_text",
        Settings: 'magenta',
        Supernova: 'supernova',
        Challenges: "supernova",
        INFINITY: 'yellow',
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
    open() {
        player.tabterm.open = !player.tabterm.open
    },
    refresh() {
        tmp.el.Open_TT.setHTML(player.tabterm.open ? "Exit tab terminal" : "Open tab terminal")
        tmp.el.Tab_Terminal.setDisplay(player.tabterm.open)
    }
}