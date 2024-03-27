const TABS = {
    choose(x, stab=false) {
        if (!stab) {
            if (x==5) tmp.sn_tab = tmp.tab
            tmp.tab = x
            if (x!=5) {
                tmp.sn_tab = tmp.tab
                tree_update = true
            }
        }
        else {
            tmp.stab[tmp.tab] = x
        }
    },
    1: [
        { id: "Main", icon: "eos-icons:atom-electron" },
        /*{ id: "Stats", icon: "material-symbols:query-stats" },
        { id: "Upgrades", icon: "carbon:upgrade", unl() { return player.rp.unl } },
        { id: "Challenges", icon: "material-symbols:star", unl() { return player.chal.unl } },
        { id: "Atom", icon: "eos-icons:atom-electron", color: "cyan", unl() { return player.atom.unl }, style: "atom" },
        { id: "Supernova", icon: "material-symbols:explosion-outline", color: "magenta", unl() { return player.supernova.times.gte(1) || quUnl() }, style: "sn" },
        { id: "Quantum", icon: "material-symbols:grid-4x4-rounded", color: "lightgreen", unl() { return quUnl() }, style: "qu" },
        { id: "Darkness", icon: "ic:baseline-remove-red-eye", color: "grey", unl() { return player.dark.unl }, style: "dark" },
        { id: "Infinity", icon: "game-icons:infinity", color: "orange", unl() { return tmp.inf_unl }, style: "inf" },*/
        { id: "Options", icon: "mdi:gear" },
    ],
    2: {
        0: [
            { id: "Points" },
            /*{ id: "Black Hole", unl() { return player.bh.unl }, style: "bh" },
            { id: "Atomic Generator", unl() { return player.atom.unl }, style: "atom" },
            { id: "Stars", unl() { return STARS.unlocked() }, style: "sn" },
            { id: "Indescribable Matter", unl() { return quUnl() }, style: "qu" },
            { id: "The Parallel", unl() { return hasInfUpgrade(9) }, style: "inf" },*/
        ],
        /*1: [
            { id: "Ranks Rewards" },
            { id: "Scaling", unl() { return tmp.scaling ? tmp.scaling.super.length>0 : false } },
           
        ],*/
        1: [
            { id: "Options" },
        ],
    },
}