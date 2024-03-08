const RESOURCES_DIS = {
    number: {
        unl: ()=>true,
        icon: "stars",

        desc: (gs)=>format(player.number)+"<br>"+tmp.passiveNumberGain?formatGain(player.number, tmp.numberGain.mul(gs)):"(+"+format(tmp.numberGain)+"/click)"
    },
    /*rp: {
        unl: ()=>player.rp.unl||player.stellarity.gte(2.5e11),
        icon: "rp",
        class: "red",

        desc: (gs)=>format(player.rp.points,0)+"<br>"+(tmp.rp.gain.gte(1e30)?formatGain(player.rp.points, tmp.rp.gain.mul(gs)):"(+"+format(tmp.rp.gain,0)+")"),
    
        resetBtn() { FORMS.rp.reset() },
    },*/
    gamespeed: {
        unl: ()=>true,
        icon: "gamespeed",
        class: "orange",
        desc: (gs)=>{formatMult(tmp.gs)}
    }

}

function reset_res_btn(id) { RESOURCES_DIS[id].resetBtn() }

function setupResourcesHTML() {
    let h1 = ""

    for (i in RESOURCES_DIS) {
        let rd = RESOURCES_DIS[i]

        h1 += `
        <div id="${i}_res_div">
            <div ${i in TOOLTIP_RES ? `id="${i}_tooltip" class="tooltip ${rd.class||""}" tooltip-pos="left" tooltip-align="left" tooltip-text-align="left"` : `class="${rd.class||""}"`}>
                <span style="margin-right: 5px; text-align: right;" id="${i}_res_desc">X</span>
                <div><img src="images/${rd.icon||"mark"}.png" ${rd.resetBtn ? `onclick="reset_res_btn('${i}')" style="cursor: pointer;"` : ""}></div>
            </div>
        </div>
        `

       
    }

    new Element("resources_table").setHTML(h1)
   
}

function updateResourcesHTML() {
    let gs = tmp.gs

    for (i in RESOURCES_DIS) {
        let rd = RESOURCES_DIS[i]
        let unl = ! rd.unl()

        tmp.el[i+"_res_div"].setDisplay(unl)

        if (unl) {
            tmp.el[i+"_res_desc"].setHTML(rd.desc(gs))
        }
    }
}
