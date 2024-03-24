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
        let hi = "bye"
        //tmp.el.CT_Infinity.setDisplay(false)
    },
    list: [
        "Main","Pres","Rank","Eclipse","Abyss","Settings","Supernova","Infinity"
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
        Infinity: 'yellow'
    },
    imgs: {
        Supernova: 'stars',
        Infinity: 'inf'
    },
    setup() {
        let html = ''
        for (let i=0;i<TABS.list.length; i++) {
            /**@param hi */
            html += `
            <button id="CT_${TABS.list[i]}" onclick="TABS.choose('${TABS.list[i]}')" class="${TAB_TERMINAL.classes[TABS.list[i]]||""}" style="padding: 10px;">${TAB_TERMINAL.imgs[TABS.list[i]] ? `<img src="images/${TAB_TERMINAL.imgs[TABS.list[i]]}><br>Open ${TABS.list[i]} Tab` : `Open ${TABS.list[i]} Tab}</div>`}`
            new Element('Tab_Terminal').setHTML(html)
        }
    },
    open() {
        player.tabterm.open = !player.tabterm.open
    },
    refresh() {
        if (player.essence.lt(SUPERNOVA.calcReq()) && (player.sn.amt.lt(10) || player.sn.amt.gte(10))) {
            tmp.el.Open_TT.setHTML(player.tabterm.open ? "Exit tab terminal" : "Open tab terminal")
            /** */
            tmp.el.Open_TT.setDisplay(true)
        } else if (player.essence.gte(SUPERNOVA.calcReq()) && player.sn.amt.lt(10)) {
            tmp.el.Open_TT.setDisplay(false)
        }
        if (player.essence.lt(SUPERNOVA.calcReq()) && (player.sn.amt.lt(10) || player.sn.amt.gte(10))) {
            tmp.el.Tab_Terminal.setDisplay(player.tabterm.open)
        } 
        else if (player.essence.gte(SUPERNOVA.calcReq()) && player.sn.amt.lt(10)) {
            tmp.el.Tab_Terminal.setDisplay(false)
        }
    }
}