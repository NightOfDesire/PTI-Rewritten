const TABS = {
    choose(x, stab=false) {if (!stab) player.tab = x; else player.stab = x},
    0: [
        {id: "Main"},
        {id: "Settings"}
    ],
    1: {
        0: [
            {id: "Main"},
            {id: "Prestige", unl() { return player.pts.gte(500) || player.prestige.unl}}
        ],
        1: [
            {id: "Settings"}
        ]
    }
}