const TIME = {
    updateHTML() {
        tmp.el.TheTime.setHTML(`Universe Age: ${formatTime(player.time.amt)}`)
        if (player.ranks.tier.gte(1)) player.time.unl = true
        tmp.el.TimeEffs.setHTML(`
        Time Effect 1: ${formatMult(TIME.effects.one())} Points
        `)
    },
    effects: {
        one(){
            let eff = player.time.amt.div(15).root(2).add(1)

            return eff
        }
    }
}