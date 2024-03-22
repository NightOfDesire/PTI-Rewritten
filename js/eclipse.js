const ECLIPSE = {
    ACTIVATE() {
        if (!player.eclipse.active) {
        player.essence = E(0)
        player.pres.pts = E(0)
        player.ranks.rank = E(0)
        player.eclipse.active = true
        addNotify(`You feel strange.. and it seems your resources are much harder to acquire.`,10)
        } else {
            if (player.essence.gte('1e20')) {
                player.eclipse.shards = player.eclipse.shards.add(ECLIPSE.shardGain())
            }
            player.eclipse.active = false
            addNotify(`It feels much colder now.. and your resources appear to be back to normal.`,10)
        }
    },
    ACTIVE() {
        return player.eclipse.active
    },
    shardGain() {
        let o1 = E(1e20)
        let o2 = E(0.2)
        let sg = player.essence.div(o1).pow(o2)
        return sg
    }
}

function updateEclipseHTML() {
    document.body.style.backgroundColor = `${player.eclipse.active ? "orange" : "hsl(0, 0%, 7%)"}`
    tmp.el.Activate_Eclipse.setHTML(!player.eclipse.active ? `?????` : (player.essence.lt('1e20') ? `?????` : `Undo the Eclipse for +${format(ECLIPSE.shardGain())} <b>Eclipsal Shards</b>`))
    tmp.el.Eclipse_Active.setHTML(ECLIPSE.ACTIVE() ? `<p class="corrupted_text">ECLIPSE ACTIVE</p>` : ``)
}