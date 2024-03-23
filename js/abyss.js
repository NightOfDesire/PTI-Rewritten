const ABYSS = {
    update() {

        tmp.el["SUMMONDARKNESS"].setHTML(
            player.abyss.active ? (player.essence.lte(5e6) ? `Go Back To The Light` : `Embrace the darkness with ${format(player.essence)} score.`) : 'Summon The Darkness'
        )
        tmp.el["VoidEssence"].setHTML(`Void Essence: ${format(player.abyss.essence)} ${formatGain(player.abyss.essence, tmp.vessgain)}`)
        tmp.el["VoidPower"].setHTML(`Abyssal Score: ${format(player.abyss.score,0)}, which provides ${format(player.abyss.power.mul(100))}% Void Power`)

        tmp.el["VoidEssenceEffects"].setHTML(`
        VE Effects:<br>^${format(ABYSS.VoidEssence.effect1())} PS<br>${player.ranks.rank.gte(20) || player.ranks.tier.gte(4) || player.ranks.asc.gte(1) ? `Essence softcap 2 starts ^${format(ABYSS.VoidEssence.effect2())} later` : ``}
        `)
        player.abyss.power = this.VoidPower()
        player.abyss.unl = player.ranks.tier.gte(2) || player.misc.hEss.gte(1e45) || ABYSS.active()
    },
    active() {
        return player.abyss.active
    },
    summon() {
        if (ABYSS.active()) {
            if (player.essence.gte(player.abyss.score)) player.abyss.score = player.essence
            /** */
            /** */
            player.abyss.active = false
        } else {

            FORMS.tierReset()
            player.abyss.active = true

        }
    },
    VoidPower() {
        let vp = player.abyss.score.sub(5e6).div(1e7).root(5).pow(0.3)
        vp = vp.softcap(0.25, 0.4, 0)
        if (player.abyss.score.lt(5e6)) vp = E(0)
        if (vp.gte(1)) vp = E(1)
        return vp
    },
    VoidEssence: {
        gain() {
            let gain = player.abyss.power.mul(20)

            return gain
        },
        effect1() {
            let eff = player.abyss.essence.div(10).pow(0.7).add(1)
            eff = eff.softcap(1.8, 0.6, 0)
            if (player.abyss.essence.lt(10)) eff = E(1)
            return eff
        },
        effect2() {
            let eff = player.abyss.essence.div(1000).pow(0.667).add(1)
            eff = eff.softcap(3, 0.5, 0)
            if (player.ranks.rank.lt(20) || player.ranks.tier.lt(4) || player.ranks.asc.lt(1)) eff = E(1)
            if (player.abyss.essence.lt(1000)) eff = E(1)
            return eff
        }
    }
}

function updateAbyssTemp() {
    tmp.vessgain = ABYSS.VoidEssence.gain()
}