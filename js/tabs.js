const TABS = {
    choose(id) {
        let new_tab = id+"Tab"
        if (player.tab != new_tab) {
            player.tab = new_tab
        }
    },
    update() {
        for (index = 0;index<TABS.list.length;index++) {
            let tab = TABS.list[index]+"Tab"
            tmp.el[tab].setDisplay(player.tab == tab)
        }
    },
    list: [
        "Main","Pres","Rank","Eclipse"
    ]
}
const COLORS = ['green','sky','yellow','red','magenta','cyan','gray']
const TAB_TERMINAL = {
    setup() {
        let h = 'div class="table_cener">'
        for (let i=0;i<TABS.list.length; i++) {
    
            h += `
            <button onclick="TABS.choose(${TABS.list[i]}) class="${COLORS[Math.floor(Math.random()*COLORS.length-1)]}">Open ${TABS.list[i]} Tab</div>`
        }
        h += "</div>"
        tmp.el.Tab_Terminal.setHTML(h)
    },
    open() {
        playwr.tabterm.open = !player.tabterm.open
    },
    refresh() {
        tmp.el.Open_TT.setHTML(player.tabterm.open ? "Exit tab terminal" : "Open tab terminal")
        tmp.el.Tab_Terminal.setDisplay(player.tabterm.open)
    }
}