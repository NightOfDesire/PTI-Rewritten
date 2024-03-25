const SUPERNOVA = {
    reset(force=false) {
        if (force) {
            createConfirm(`Are you sure you want to force a supernova reset?`,SUPERNOVA.reset)
        }
        if (!force) {
            if (tmp.sn.can == true) {
                player.sn.time = E(0)
                player.sn.amt = player.sn.amt.add(1)
                player.sn.unl = true

                player.essence = E(0)
                player.pres.pts = E(0)
                player.pres.unl = false
                player.ranks.rank = E(0)
                player.ranks.tier = E(0)
                player.ranks.asc = E(0)
                player.eclipse.score = E(0)
                player.eclipse.shards = E(0)
                player.eclipse.active = false
                player.eclipse.unl = false
                player.abyss.score = E(0)
                player.abyss.essence = E(0)
                player.abyss.oddities = E(0)
                player.abyss.active = false
                player.abyss.unl = false
                player.misc.hEss = E(0)
                player.misc.hPres = E(0)
                player.sn.stars = player.sn.stars.add(tmp.sn.gain)
            }
        } else {
            player.sn.time = E(0)
            player.essence = E(0)
            player.pres.pts = E(0)
            player.pres.unl = false
            player.ranks.rank = E(0)
            player.ranks.tier = E(0)
            player.ranks.asc = E(0)
            player.eclipse.score = E(0)
            player.eclipse.shards = E(0)
            player.eclipse.active = false
            player.eclipse.unl = false
            player.abyss.score = E(0)
            player.abyss.essence = E(0)
            player.abyss.oddities = E(0)
            player.abyss.active = false
            player.abyss.unl = false
            player.misc.hEss = E(0)
            player.misc.hPres = E(0)
        }
    },
    starGain() {
        let gain = player.essence.div("e150").root(2)
        if (hasUpgrade('stars', 4)) gain = gain.mul(2)
        if (player.essence.lt(1e150)) return E(0)
        return gain
    },
    calcReq() {
        let base = E("e54")
        let inc  = E("e15")
        let pow = player.sn.amt.div(10).add(1)


        let req = Decimal.pow(Decimal.mul(base, Decimal.pow(inc, player.sn.amt)), pow)
        if (hasUpgrade('stars', 2)) req = req.pow(0.9)

        return req
    },
    updateTemp() {
        if (!tmp.sn) tmp.sn = {}
        tmp.sn.can = player.essence.gte(SUPERNOVA.calcReq())
        tmp.sn.gain = SUPERNOVA.starGain()
    },
    updateHTML() {
        if (player.sn.amt.lt(10)) {
            tmp.el.SupernovaDisplay.setDisplay(tmp.sn.can == true)
        }  else {
            tmp.el.SupernovaDisplay.setDisplay(false)
        }
        tmp.el.stars.setHTML(`Stars: ${format(player.sn.stars)}<br>Stars give ${formatMult(player.sn.stars.log(3).add(1))} gamespeed by themselves.`)
        tmp.el.SupernovaButton.setDisplay(player.sn.amt.gte(10) && player.essence.gte(SUPERNOVA.calcReq()))
        tmp.el.SupernovaReq.setDisplay(player.sn.amt.gte(10))
        tmp.el.snline2.setDisplay(player.sn.amt.gte(10))
        tmp.el.SupernovaButton.setHTML(`Reset EVERYTHING before this point, but supernova for +${format(tmp.sn.gain)}`)
        tmp.el.SupernovaReq.setHTML(`Currently, it requires ${format(SUPERNOVA.calcReq())} Essence to go Supernova.`)
    }
}