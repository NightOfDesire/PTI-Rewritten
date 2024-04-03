const PRESTIGE = {
    reset() {
        player.pts = E(0)
        for (let x = 0; x <= 3; x++) {
            BUILDINGS.reset('points_'+x)
        }
        player.prestige.unl = true
    },
    calculateGain() {
        let gain = player.pts.div(750).root(2)

        return gain.floor()
    },
    updateHTML() {
        tmp.el.PPtDisplay.setHTML(`Prestige Points: ${format(player.prestige.pts, 0)} ${tmp.prestige.auto ? formatGain(player.prestige.pts, tmp.prestige.gain.mul(tmp.gs)) : "(+"+format(tmp.prestige.gain, 0)+")"}`)
    },
    
}