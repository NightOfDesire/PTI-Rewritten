const ECLIPSE = {
    activate() {
        player.eclipse.active ? this.DEACTIVATE() : this.ACTIVATE
    },
    ACTIVATE() {
        player.eclipse.active = true
        player.essence = E(0)
        player.pres.pts = E(0)
        player.ranks.rank = E(0)
        document.body.style.backgroundColor = "orange"
        addNotify(`You feel strange.. and it seems your resources are much harder to acquire.`,10)
    },
    DEACTIVATE() {
        setTimeout(1250)
        if (player.essence.gte('1e20')) {
            player.eclipse.shards = player.eclipse.shards.add(this.shardGain())
        }
        player.eclipse.active = false
        document.body.style.backgroundColor = "hsl(0, 0%, 7%)"
        addNotify(`It feels much colder now.. and y(our resources seem to be back to normal.`)
    },
    ACTIVE() {
        return player.eclipse.active
    },
    shardGain() {
        let sg = player.essence.pow(2).root(666)

        return sg
    }
}

function updateEclipseHTML() {
    tmp.el.Activate_Eclipse.setHTML(!player.eclipse.active ? `?????` : (player.essence.lt('1e20') ? `?????` : `Undo the Eclipse for +${format(ECLIPSE.shardGain())} <b>Eclipsal Shards</b>`))
    tmp.el.Eclipse_Active.setHTML(ECLIPSE.ACTIVE() ? `<p class="orange"> ECLIPSE ACTIVE</p>` : ``)
}