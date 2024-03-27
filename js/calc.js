


function calc() {
    let dt = this.clone()
    let gs = tmp.gs.mul(dt)
    if (tmp.pass > 0) {
        tmp.pass--
        return
    }
    BUILDINGS.tick()
    player.pts = player.pts.add(tmp.ptgain.mul(gs))
    player.bestPts = player.bestPts.max(player.pts)
}

function simulateTime() {
    let sec = this.clone()
    let ticks = sec * 20
    let bonusDiff = 0
    let p = clonePlayer(player,setupPlayer())

    if (ticks > 1000) {
        bonusDiff = (ticks - 1000) / FPS / 1000
        ticks = 1000
    }
    for (let i=0; i<ticks; i++) {
        updateTemp()
        calc(1/FPS+bonusDiff)
    }


    let h = `You were offline for ${formatTime(sec)}`
    let s = {
        pts: player.pts.sub(p.pts)
    }
    let s2 = {

    }
    let s3 = {

    }
    h += `<br>Your points increased by ${format(s.pts)}`
    createPopup(h, 'Offline')
}