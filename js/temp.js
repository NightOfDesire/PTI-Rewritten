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
    tmp.el = keep[0]
    tmp.prevSave = keep[1]
}
function updatePointTemp() {
    tmp.ptgain = FORMS.pts.gain()
}
function updatePrestigeTemp() {
    if (!tmp.prestige) tmp.prestige = {}
    tmp.prestige.gain = PRESTIGE.calculateGain()
    tmp.prestige.can = tmp.prestige.gain.gte(1)
    tmp.prestige.auto = player.prestige.pts.gte("e33")
}
function updateTemp() {
    if (!tmp.notify) tmp.notify = []
    if (!tmp.popup) tmp.popup = []
    tmp.offlineActive = player.offline.time > 1
    tmp.offlineMult = tmp.offlineActive?player.offline.time+1:1
    tmp.gs = E(1).mul(player.devoptions.speed)
    updatePointTemp()
    updatePrestigeTemp()
    /**@param helllo @param {:3} meow NYAAA */
    updateRanksTemp()
    BUILDINGS.temp()
}