const SUPERNOVA = {
    reset(force=false) {
        if (force) {
            createConfirm(`Are you sure you want to force a supernova reset?`,SUPERNOVA.reset)
        }
        if (!force) {
            if (tmp.sn.can) {
                player.sn.time = E(0)
                player.sn.amt = player.sn.times.add(1)

                player.essence = E(0)
                player.pres.pts = E(0)
                player.pres.unl = false
                player.ranks.rank = E(0)
                player.ranks.tier = E(0)
                player.eclipse.score = E(0)
                player.eclipse.shards = E(0)
                player.eclipse.active = false
                player.eclipse.unl = false
                player.abyss.score = E(0)
                player.abyss.essence = E(0)
                player.abyss.oddities = E(0)
                player.abyss.active = false
                player.abyss.unl = false
                player.sn.stars = player.sn.stars.add(tmp.sn.gain)
            }
        }
        player.sn.time = E(0)
        player.essence = E(0)
        player.pres.pts = E(0)
        player.pres.unl = false
        player.ranks.rank = E(0)
        player.ranks.tier = E(0)
        player.eclipse.score = E(0)
        player.eclipse.shards = E(0)
        player.eclipse.active = false
        player.eclipse.unl = false
        player.abyss.score = E(0)
        player.abyss.essence = E(0)
        player.abyss.oddities = E(0)
        player.abyss.active = false
        player.abyss.unl = false
    },
    starGain() {
        let gain = player.essence.div("e150").root(2)
        if (player.essence.lt(1e150)) return E(0)
        return gain
    },
    calcReq() {
        let base = E("e150")
        let inc  = E("e15")
        let pow = player.sn.amt.div(10).add(1)


        let req = Decimal.pow(Decimal.mul(base, Decimal.pow(inc, player.sn.amt)), pow)


        return req
    },
    updateTemp() {
        if (!tmp.sn) tmp.sn = {}
        tmp.sn.can = player.essence.gte(SUPERNOVA.calcReq())
        tmp.sn.gain = SUPERNOVA.calcReq()
    },
    updateHTML() {
        if (player.sn.amt.lt(10)) {
            tmp.el.SupernovaDisplay.setDisplay(player.essence.gte(SUPERNOVA.calcReq()))
        } 
        tmp.el.SupernovaButton.setDisplay(player.sn.amt.gte(10))
        tmp.el.SupernovaReq.setDisplay(player.sn.amt.gte(10))
        tmp.el.snline2.setDisplay(player.sn.amt.gte(10))
        tmp.el.SupernovaButton.setHTML(`Reset EVERYTHING before this point, but supernova for +${format(tmp.sn.gain)}`)
        tmp.el.SupernovaReq.setHTML(`Currently, it requires ${format(SUPERNOVA.calcReq())} <p class="yellow">Essence</p> to go <p class="supernova">Supernova</p>.`)
    }
}