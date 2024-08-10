const SUPERNOVA = {
    reset() {

    },
    doReset(level="supernova") {
        switch(level) {
            case "sunrise": 
                SUPERNOVA.doReset()
            default:
            player.sn.star.stardust = E(0)
            player.sn.star.growth = E(0)
            player.sn.star.tier = E(0)
            player.sn.time = 0
            player.ranks.asc = E(0)
            RANKS.doReset(asc)

        }

    },


    
}


function getSupernovaSave() {
    const s = {
        unl: false,
        times: E(0),
        ions: E(0),
        elem: [],
        time: 0,
        supernovaTier: E(0),
        star: {
            stardust: E(0),
            tier: E(0),
            growth: E(0),
        },

    }

    return s
}

function setupSupernovaHTML() {
    let fighting_stage = new Element(`fighting_stage`)
    let fs = ''

    if (fighting_stage.innerHTML == '') {
        fs += `
        
        `
    }
}

function updateSupernovaHTML() {






}

function updateSupernovaTemp() {
    if (!tmp.sn) tmp.sn = {}
}