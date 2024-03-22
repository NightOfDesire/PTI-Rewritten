const ECLIPSE = {
    ACTIVATE() {
        if (!player.eclipse.active) {
        player.essence = E(0)
        player.pres.pts = E(0)
        player.ranks.rank = E(0)
        player.eclipse.active = true
        addNotify(`You feel strange.. and it seems your resources are much harder to acquire.`,10)
        } else {
            if (player.essence.gte('1.5e21')) {
                player.eclipse.shards = player.eclipse.shards.add(ECLIPSE.shardGain())
            }
            if (player.essence.gte(player.eclipse.score)) player.eclipse.score = player.essence
            player.eclipse.active = false
            addNotify(`It feels much colder now.. and your resources appear to be back to normal.`,10)
        }
    },
    ACTIVE() {
        return player.eclipse.active
    },
    shardGain() {
        let o1 = E(1.5e21)
        let o2 = E(0.2)
        let sg = player.essence.div(o1).pow(o2)
        if (player.ranks.tier.gte(2)) sg = sg.mul(RANKS.effects.tier[2]())
        return sg
    }
}

function updateEclipseHTML() {


    if (player.ranks.rank.gte(15)) player.eclipse.unl = true
    tmp.el.EclipsalShards.setHTML(`
    Eclipsal Shards: ${format(player.eclipse.shards)}<br>
    Effects: essence is raised by ${format(FORMS.eclipse.shardeffs[1]())}<br>
    <b>EFFECTS ONLY WORK AT FULL POWER WHILE OUTSIDE OF ECLIPSE</b>
    `)
    document.body.style.backgroundColor = `${player.eclipse.active ? "orange" : "hsl(0, 0%, 7%)"}`
    tmp.el.Activate_Eclipse.setHTML(!player.eclipse.active ? `?????` : (player.essence.lt('1.5e21') ? `Back out of ?????` : `Undo the Eclipse for +${format(ECLIPSE.shardGain())} <b>Eclipsal Shards</b>`))
    tmp.el.Eclipse_Active.setHTML(ECLIPSE.ACTIVE() ? `<p class="corrupted_text">ECLIPSE ACTIVE</p>` : ``)
}