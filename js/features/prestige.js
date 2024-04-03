const PRESTIGE = {
    reset() {
        player.pts = E(0)
        for (let x = 0; x <= 3; x++) {
            BUILDINGS.reset('points_'+x)
        }
        player.prestige.unl = true
    },
    calculateGain() {
        let gain = player.pts.div(675).root(1.775)

        return gain.floor()
    },
    updateHTML() {
        tmp.el.PPtDisplay.setHTML(`
        Prestige Points: ${format(player.prestige.pts, 0)} ${tmp.prestige.auto ? formatGain(player.prestige.pts, tmp.prestige.gain.mul(tmp.gs)) : "(+"+format(tmp.prestige.gain, 0)+")"}
        <br>Effect: ${formatMult(FORMS.pres.PPtEffect())} Points
        `)
    },
    
}