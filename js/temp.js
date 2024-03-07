var tmp = {
    
}

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
       
    }

   
    
    tmp.el = keep[0]
    tmp.prevSave = keep[1]
    tmp.notify = {}


}

function updatePointTemp() {
    tmp.pointGain = FORMS.pointGain()
}
 


function updateTemp() {
    tmp.offlineActive = player.offline.time > 1
    tmp.offlineMult = tmp.offlineActive?player.offline.time+1:1
    updatePointTemp()
    BUILDINGS.temp()
   
}