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
                player.sn.stars = player.essence.stars.add(this.starGain())
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
        if (tmp.sn) tmp.sn = {}
        tmp.sn.can = player.essence.gte(SUPERNOVA.calcReq())
    },
    updateHTML() {

    }
}