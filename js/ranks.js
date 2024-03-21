const RANKS = {
    reset(type) {
        switch(type) {
            case "tier": 
            if (tmp.ranks.tier.can) {
                player.essence = E(0)
                player.pres.pts = E(0)
                player.ranks.rank = E(0)
                player.ranks.tier = player.ranks.tier.add(1)
                addNotify(`Tiered up to ${format(player.ranks.tier.add(1), 0)}.`, 1)
            }
            default:
                if (tmp.ranks[type].can) {
                    player.essence = E(0)
                    player.pres.pts = E(0)
                    player.ranks.rank = player.ranks.rank.add(1)
                }
        }
    },
    reqs : {
        rank(x=player.ranks.rank) {
            let base = E("275000")
            let inc = E(6.716)
            inc = inc.pow(x.div(35).add(1))
            let req = Decimal.mul(base, Decimal.pow(inc, x))
            
            return req
        }
    },
    desc: {
        rank: {
            '1': "Prestige Shard gain is raised by 1.25, gain thrice as much Essence",
            '2': "Essence is boosted by [(x^2)^0.8].",
            '5': "Automatically generate prestige shards."
        }
    },
    effects: {
        rank: {
            '1'() {
                let ret = player.ranks.rank.pow(2).pow(0.8)

                return ret
            }
        }
    },
    names: ['rank']
}

function updateRanksHTML() {
    tmp.el.rank.setHTML(`Rank: <b>${format(player.ranks.rank, 0)}</b>`)
    tmp.el.rankup.setHTML(`
    Reset your progress but rank up. ${RANKS.desc.rank[player.ranks.rank.add(1)] ? 'At rank ' + format(player.ranks.rank.add(1), 0) + ' - ' + RANKS.desc.rank[player.ranks.rank.add(1)] : ''}
    <br>Need: ${format(RANKS.reqs.rank())} Essence
    `)

}

function updateRanksTemp() {
    if (!tmp.ranks) tmp.ranks = {}
        tmp.ranks.rank = {
            can: player.essence.gte(RANKS.reqs.rank()),
        }
}