const PRESTIGE = {
    reset() {
        player.pts = E(0)
        player.build.points_1.amt = E(0)
        player.prestige.unl = true
    },
    calculateGain() {
        let gain = player.pts.div(750).root(2)

        return gain
    },
    updateHTML() {
        tmp.el.PPtDisplay.setHTML(`Prestige Points: ${format(player.prestige.pts, 0)} ${tmp.prestige.auto ? formatGain(player.prestige.pts, tmp.prestige.gain.mul(tmp.gs)) : "(+"+format(tmp.prestige.gain, 0)+")"}`)
    },
    
}