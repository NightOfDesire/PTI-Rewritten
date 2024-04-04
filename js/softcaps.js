const SOFTCAPS = {
    points: {
        one() {
            let s = E(1e12)
            let p = E(0.667)
            return {start: s, power: p}
        }
    }
}




/*const SOFTCAP_TEXT = {
    points: [
        {id: "one", text: `After <b>${format(SOFTCAPS.points[this[0].id]().start)}</b>, point gain is softcapped!`}
    ],
}*/

/*function setupSoftcapHTML() {
    let scs = ""
    for (let x = 0; x < SOFTCAP_TEXT.points.length; x++) {
        let n = SOFTCAP_TEXT.points[x]
        scs += `<div id=${n.id}>
        ${n.text}
        </div>`
    }
    tmp.el.pt_softcaps.setHTML(scs)
}

let nil = null
function updateSoftcapHTML() {
    for (let x = 0; x < SOFTCAP_TEXT.points.length; x++) {
        let n = SOFTCAP_TEXT.points[x]
        tmp.el[n.id].setHTML(n.text)
        tmp.el[n.id].setDisplay(player.bestPts.gte(SOFTCAPS.points[n.id]().start))
    }
}*/