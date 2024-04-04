const SUPERNOVA = {
    reset() {

    },
    doReset(level="supernova") {
        switch(level) {

        default:
        }

    },


    stardust_upgrades: {
        reset(type) {player.sn.star.upgrades[type].lvl = E(0)},
        1: [
            {
                get title() { return "More Stardust" },
                get inc() {
                    let i = 1.5

                    return i
                },
                cost(x=this.lvl) {

                    return getStardustUpgradeCost(1, x)
                },
                effect : () => [],
            }
        ]
    }
}

function getStardustUpgradeCost(n, l) {
    let u = SUPERNOVA.stardust_upgrades[1][n], s = u.start, i = u.inc

    return i.pow(l.scaleEvery("SdUpg"+n)).mul(s)
}

function getStardustUpgradeBulk(n) {
    let bulk = E(0), u = SUPERNOVA.stardust_upgrades[1][n], s = u.start, i = u.inc

    if (player.sn.star.stardust.gte(s)) bulk = player.sn.star.stardust.div(s).max(1).log(i).scaleEvery("SdUpg"+i).add(1).floor()
}

Object.keys(SUPERNOVA.stardust_upgrades).forEach(i => {
    let upg = SUPERNOVA.stardust_upgrades[i]

    Object.defineProperty(upg, "lvl", {
        get() { return player.sn.star.upgrades["sd_"+i].lvl },
        set(value) { player.sn.star.upgrades["sd_"+i].lvl = value },
    })
});

function getSupernovaSave() {
    const data = {
        supernovaTimes: E(0),
        ions: E(0),
        elem: [],
        supernovaTier: E(0),
        star: {
            stardust: E(0),
            tier: E(0),
            growth: E(0),
            upgrades: []
        },

    }

    for (let x in SUPERNOVA.stardust_upgrades[1]) data.star.upgrades["sd_"+1] = {
        lvl: E(0),
        auto: false,
        unl: false
    }

    return data
}

function setupSupernovaHTML() {

}

function updateSupernovaHTML() {

}

function updateSupernovaTemp() {
    
}