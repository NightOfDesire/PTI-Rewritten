const ABYSS = {
    update() {

        tmp.el.SUMMONDARKNESS.setHTML(
            player.abyss.active ? (player.essence.lte(5e6) ? `Go Back To The Light` : `Embrace the darkness for +${format(ABYSS.VoidEssGain())} <b>Void Essence</b>`) : 'Summon The Darkness'
        )
        player.abyss.unl = player.ranks.tier.gte(2) || player.misc.hEss.gte(1e45) || ABYSS.active()
    },
    active() {
        return player.abyss.active
    },
    summon(active=player.abyss.active) {
        if (active) {
            if (player.essence.gte(5e6)) {
                player.abyss.essence = player.abyss.essence.add(ABYSS.VoidEssGain())
                addNotify(`Embraced for +${format(ABYSS.VoidEssGain())} <b>Void Essence</b>`)
            }
            ABYSS.summon(false)
        } else {
            FORMS.tierReset()

        }
    },
    VoidEssGain() {
        let gain = player.essence.div(5e6).root(2).pow(0.95)

        return gain
    }
}