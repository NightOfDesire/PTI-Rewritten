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
    tmp.el = keep[0]
    tmp.prevSave = keep[1]
}
    function updatePointTemp() {
        tmp.ptgain = pts.gain()
    }
function updateTemp() {
    if (!tmp.stab) tmp.stab = []
    if (!tmp.notify) tmp.notify = []
    if (!tmp.popup) tmp.popup = []
    tmp.offlineActive = player.offline.time > 1
    tmp.offlineMult = tmp.offlineActive?player.offline.time+1:1
    tmp.gs = E(1).mul(player.devoptions.speed)
    updatePointTemp()
}