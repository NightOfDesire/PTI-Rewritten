const PRESTIGE = {
    reset() {
        reset("pts")
        reset("build.points_1")
    },
    calculateGain() {
        let gain = player.pts.div(1e3).root(2.2)

        return gain
    },
    updateHTML() {
        tmp.el.PPtDisplay.setHTML(`Prestige Points: ${format(player.prestige.pts, 0)} ${tmp.prestige.auto ? formatGain(player.prestige.pts, tmp.prestige.gain.mul(tmp.gs)) : format(tmp.prestige.gain, 0)}`)
    }
}