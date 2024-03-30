const TABS = {
    choose(x, stab=false) {
        if (!stab) {
            player.tab = x
        } else {
            player.stab[player.tab] = x
        }
    },
    1: [ 
        {id:"Main"}, 
        {id:"Settings"}
    ],
    2: {
        0: [
            {id:"Main"},
            {id:"Prestige", color: "cyan", unl() {return true}}
        ],
        1: [
            {id:"Options"}
        ]
    }
    
}