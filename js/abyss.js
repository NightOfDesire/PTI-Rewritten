const ABYSS = {
    update() {

        tmp.el["SUMMONDARKNESS"].setHTML(
            player.abyss.active ? (player.essence.lte(5e6) ? `Go Back To The Light` : `Embrace the darkness with ${format(player.essence)} score.`) : 'Summon The Darkness'
        )
        tmp.el["VoidEssence"].setHTML(`Void Essence: ${format(player.abyss.essence)} ${formatGain(player.abyss.essence, tmp.vessgain)}`)
        tmp.el["VoidPower"].setHTML(`Abyssal Score: ${format(player.abyss.score,0)}, which provides ${format(player.abyss.power.mul(100))}% Void Power`)
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
        let vp = player.abyss.score.div(5e6).root(5).pow(0.5)
        vp = vp.softcap(0.5, 0.4, 0)
        if (vp.gte(1)) vp = E(1)
        return vp
    },
    VoidEssenceGain() {
        let gain = player.abyss.power.mul(100).pow(1.2)

        return gain
    }
}

function updateAbyssTemp() {
    tmp.vessgain = ABYSS.VoidEssenceGain()
}