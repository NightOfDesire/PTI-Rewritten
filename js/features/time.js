const TIME = {
    updateHTML() {
        tmp.el.TheTime.setHTML(`Universe Age: ${formatTime(player.time.amt)}`)

        /**@param whoops. */
        if (player.ranks.tier.gte(1)) player.time.unl = true
    }
}