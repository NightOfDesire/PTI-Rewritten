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



   
   
}



function updateNumTemp() {
    tmp.numberGain = FORMS.numberGain()
}
function updateTemp() {
    if (!tmp.stab) {
        tmp.stab = []
    }
    if (player.number.gte(player.misc.hNum)) player.misc.hNum = player.number
    tmp.offlineActive = player.offline.time > 1
    tmp.offlineMult = tmp.offlineActive?player.offline.time+1:1
    tmp.gs = FORMS.gamespeed()
    updateNumTemp()
   
}