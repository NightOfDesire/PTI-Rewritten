const SUPERNOVA = {
    reset() {

    },
    doReset(level="supernova") {
        switch(level) {

        default:
            player.ranks.asc = E(0)
            RANKS.doReset(asc)

        }

    },


    
}


function getSupernovaSave() {
    const s = {
        supernovaTimes: E(0),
        ions: E(0),
        elem: [],
        supernovaTier: E(0),
        star: {
            stardust: E(0),
            tier: E(0),
            growth: E(0),
        },

    }

    s.fighting = getFightingSave()

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
    
}