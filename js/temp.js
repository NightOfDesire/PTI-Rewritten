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

       buyables: {}
    }



   
   
}



function updateEssenceTemp() {
    tmp.essenceGain = FORMS.essenceGain()
}
function updatePrestigeTemp() {
    if (!tmp.pres) tmp.pres = {}
    tmp.pres.gain = FORMS.pres.gain()
    tmp.pres.can = tmp.pres.gain.gte(1)
    tmp.pres.auto = player.ranks.rank.gte(5) || player.abyss.unl
}
function updateTemp() {
    if (!tmp.stab) tmp.stab = []
    if (!tmp.notify) tmp.notify = []
    if (!tmp.popup) tmp.popup = []
    if (player.essence.gte(player.misc.hEss)) player.misc.hEss = player.essence
    if (player.pres.pts.gte(player.misc.hEss)) player.misc.hPres = player.pres.pts
    tmp.offlineActive = player.offline.time > 1
    tmp.offlineMult = tmp.offlineActive?player.offline.time+1:1
    tmp.gs = FORMS.gamespeed()
    updateEssenceTemp()
    updatePrestigeTemp()
    updateRanksTemp()
    updateAbyssTemp()
    SUPERNOVA.updateTemp()
    UPGRADES.main.temp()
   
}