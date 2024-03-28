const TABS = {
    choose(x, stab=false) {if (!stab) player.tab = x; else player.stab = x},
    0: [
        {id: "Main"},
        {id: "Settings"}
    ],
    1: {
        0: [
            {id: "Main"},
            {id: "Prestige"}
        ],
        1: [
            {id: "Settings"}
        ]
    }
}