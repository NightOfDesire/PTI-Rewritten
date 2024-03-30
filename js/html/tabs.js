const TABS = {
    choose(x, stab=false) {
        if (!stab) {
            tmp.tab = x
        } else {
            tmp.stab[tmp.tab] = x
        }
    },
    1: [ 
        {id:"Main"}, 
        {id:"Settings"}
    ],
    2: {
        0: [
            {id:"Main"},
            {id:"Prestige", icon: "material-symbols:star", color: "cyan", unl() {return true}}
        ],
        1: [
            {id:"Options"}
        ]
    }
    
}