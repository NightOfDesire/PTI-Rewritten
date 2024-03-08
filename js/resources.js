const RESOURCES_DIS = {
    number: {
        unl: ()=>true,

        desc: (gs)=>format(player.number)+"<br>(+"+format(tmp.numberGain)+"/click)"
    },
    /*sm: {
        unl: ()=>player.sm.unl||player.points.gte(2.5e11),
        icon: "sm",
        class: "yellow",

        desc: (gs)=>format(player.sm.points)+"<br>"+(tmp.sm.gain.gte(1e30)?formatGain(player.sm.points, tmp.sm.gain.mul(gs)):"(+"+format(tmp.sm.gain,0)+")"),
    
        resetBtn() { FORMS.sm.reset() },
    },
    nm: {
        unl: ()=>player.nm.unl||player.points.gte(1e50),
        icon: "nullmatter",
        class: "grey",
        desc: (gs)=>format(player.nm.points)+"<br>"+(hasUpgrade('nm',10)?formatGain(player.nm.points, tmp.nm.gain.mul(gs)):"(+"+format(tmp.nm.gain,0)+")"),
        resetBtn() {FORMS.nm.reset()}
    },
    gamespeed: {
        unl: ()=>true,
        icon: "gamespeed",
        class: "orange",
        desc: (gs)=>formatMult(gs)+' gamespeed'
    }*/

}
function hasUpgrade() {return false}
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
    let gs = E(1)

    for (i in RESOURCES_DIS) {
        let rd = RESOURCES_DIS[i]
        let unl = rd.unl()

        tmp.el[i+"_res_div"].setDisplay(unl)

        if (unl) {
            tmp.el[i+"_res_desc"].setHTML(rd.desc(gs))
        }
    }
}