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
        {id:"Stats"},
        {id:"Settings"}
    ],
    2: {
        0: [
            {id:"Main"},
            {id:"Prestige", style: "cyan", unl() {return player.bestPts.gte(750) || player.prestige.unl}},
            {id:"Ranks", unl() {return player.bestPts.gte(2.5e5)}}
        ],
        1: [
            {id:"Rank Rewards"}
        ],
        2: [
            {id:"Options"}
        ]
    }
    
}