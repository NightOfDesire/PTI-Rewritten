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


    for (let x in BUILDINGS_DATA) tmp.build[x] = {
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

function updateNumTemp() {
    tmp.numberGain = FORMS.numberGain()
    tmp.passiveNumberGain = player.number.gte("e11750")
}
function updateTemp() {
    tmp.offlineActive = player.offline.time > 1
    tmp.offlineMult = tmp.offlineActive?player.offline.time+1:1
    tmp.gs = FORMS.gamespeed()
    updateNumTemp()
    updateRagePowerTemp()
    BUILDINGS.temp()
   
}