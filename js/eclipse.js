const ECLIPSE = {
    ACTIVATE() {
        if (!player.eclipse.active) {
        player.essence = E(0)
        player.pres.pts = E(0)
        player.ranks.rank = E(0)
        player.eclipse.active = true
        document.body.style.backgroundColor = "orange"
        addNotify(`You feel strange.. and it seems your resources are much harder to acquire.`,10)
        } else {
            if (player.essence.gte('1e20')) {
                player.eclipse.shards = player.eclipse.shards.add(ECLIPSE.shardGain())
            }
            player.eclipse.active = false
            document.body.style.backgroundColor = "hsl(0, 0%, 7%);"
            addNotify(`It feels much colder now.. and your resources appear to be back to normal.`,10)
        }
    },
    ACTIVE() {
        return player.eclipse.active
    },
    shardGain() {
        let sg = player.essence.pow(0.0736).div(879.022517)

        return sg
    }
}

function updateEclipseHTML() {
    tmp.el.Activate_Eclipse.setHTML(!player.eclipse.active ? `?????` : (player.essence.lt('1e20') ? `?????` : `Undo the Eclipse for +${format(ECLIPSE.shardGain())} <b>Eclipsal Shards</b>`))
    tmp.el.Eclipse_Active.setHTML(ECLIPSE.ACTIVE() ? `<p class="orange"> ECLIPSE ACTIVE</p>` : ``)
}