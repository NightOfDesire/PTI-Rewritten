const TIME = {
    updateHTML() {
        tmp.el.TheTime.setHTML(`Universe Age: ${formatTime(player.time.amt)}`)
        if (player.ranks.tier.gte(1)) player.time.unl = true
    }
}