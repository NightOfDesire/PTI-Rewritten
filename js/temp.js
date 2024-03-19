var tmp = {}

function resetTemp() {
    let d = new Date()
    keep = [tmp.el, tmp.prevSave]
    tmp = {
        

        cx: 0,
        cy: 0,

        mobile: false,

        start: false,

       
        tab: 0,
        stab: [],
       
        pass: 0,
        notify: [],
        popup: [],
        saving: 0,
       

       

       
       

        prevSave: "",

       build: {}
    }


    for (let x in BUILDING) tmp.build[x] = {
        bulk: E(0),
		total: E(0),
		bonus: E(0),
        effect: {},
    }
   
   
}

function updateRagePowerTemp() {
    if (!tmp.rp) tmp.rp = {}
    
    tmp.rp.gain = FORMS.rp.gain()
    tmp.rp.can = tmp.rp.gain.gte(1)
}
function updateAtomTemp() {
    if (!tmp.am) tmp.am = {}
    tmp.am.gain = FORMS.am.gain()
    tmp.am.can = tmp.am.gain.gte(1)
}
function updateBuildingsTemp() {
    BUILDINGS.temp()
}
function updateNumTemp() {
    tmp.numberGain = FORMS.numberGain()
    tmp.passiveNumberGain = player.number.gte("1e11750")
}
function updateTemp() {
    if (!tmp.stab) {
        tmp.stab = []
    }
    if (player.number.gte(player.misc.totalNumber)) player.misc.totalNumber = player.number
    tmp.offlineActive = player.offline.time > 1
    tmp.offlineMult = tmp.offlineActive?player.offline.time+1:1
    tmp.gs = FORMS.gamespeed()
    updateNumTemp()
    updateRagePowerTemp()
    updateAtomTemp()
    updateBuildingsTemp()
   
}