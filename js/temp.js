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

function updateNumTemp() {
    tmp.numberGain = FORMS.numberGain()
}
 


function updateTemp() {
    tmp.offlineActive = player.offline.time > 1
    tmp.offlineMult = tmp.offlineActive?player.offline.time+1:1
    updateNumTemp()
    //BUILDINGS.temp()
   
}