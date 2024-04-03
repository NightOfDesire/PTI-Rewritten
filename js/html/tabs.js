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
        {id:"Time", unl() { return player.time.unl}},
        {id:"Supernova", style:"supernova", unl() { return player.sn.unl}},
        {id:"Stats"},
        {id:"Settings"}
    ],
    2: {
        0: [
            {id:"Main"},
            {id:"Prestige", style: "cyan", unl() {return player.bestPts.gte(750) || player.prestige.unl}},
            {id:"Ranks"}
        ],
        1: [
            {id:"The Time", unl() {return player.time.unl}}
        ],
        2: [
            {id: "Main"},
            {id: "Elements", style:"light_green"}
        ],
        3: [
            {id:"Rank Rewards"},
            {id:"Scaling", unl() {return tmp.scaling ? tmp.scaling.super.length>0 : false }}
        ],
        4: [
            {id:"Options"}
        ]
    }
    
}