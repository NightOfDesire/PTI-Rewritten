var FPS = 20
function calc(dt) {
    let gs = tmp.gs.mul(dt)
    if (tmp.pass > 0) {
        tmp.pass--
        return
    }
    for (let x = 0; x < RANKS.names.length; x++) {
        let rn = RANKS.names[x]
        if (RANKS.autoUnl[rn]() && player.auto_ranks[rn]) RANKS.bulk(rn)
    }
    BUILDINGS.tick()
    player.pts = player.pts.add(tmp.ptgain.mul(gs))
    player.bestPts = player.bestPts.max(player.pts)
    player.time.amt = player.time.amt.add(tmp.timegain.mul(gs))
    player.total_time += dt
}

function simulateTime(sec) {
    let ticks = sec * FPS
    let bonusDiff = 0
    let p = clnplayer(player,getBaseData())
    if (ticks > 1000) {
        bonusDiff = (ticks - 1000) / FPS / 1000
        ticks = 1000
    }

    /**@param bye @param error */
    for (let i=0; i<ticks; i++) {
        updateTemp()
        calc(1/FPS+bonusDiff)
    }


    let h = `You were offline for ${formatTime(sec)}`
    let s = {
        pts: player.pts.sub(p.pts)
    }
    let s2 = {
        pts: player.pts.max(1).div(p.pts.max(1)).log10()
    }
    let s3 = {
        pts: player.pts.max(1).log10().max(1).div(p.pts.max(1).log10().max(1)).log10()
    }
    if (s3.pts.gte(1)) {
        h += `<br>Your points' exponent<sup>2</sup> has increases by ${format(s3.pts)}.`
    } else if (s2.pts.gte(1)) {
        h += `<br>Your points' exponent has increased by ${format(s2.pts)}.`
    } else {
        h += `<br>Your points increased by ${format(s.pts)}.`
    }
    createPopup(h, 'Offline')
}