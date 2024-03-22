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
            let base = E("4e5")
            let inc = E(10)
            inc = inc.pow(x.div(17.5).add(1))
            if (x.gte("8")) inc = inc.pow(1.33)
            if (x.gte("17")) inc = inc.pow(1.25)
            inc = inc.sub(FORMS.eclipse.shardeffs[2]())
            let req = Decimal.mul(base, Decimal.pow(inc, x))
            return req
        }
    },
    desc: {
        rank: {
            '1': "Prestige Shard gain is raised by 1.25, gain thrice as much Essence",
            '2': "Essence is boosted by rank [(x^2)^0.8].",
            '5': "Automatically generate prestige shards.",
            '10': "Essence boosts PS by x(log10(essence)^0.1)+1",
            '15': 'Unlock ????? <p class="corrupted_text2"></p>'
        }
    },
    effects: {
        rank: {
            '2'() {
                let ret = player.ranks.rank.pow(2).pow(0.8)

                return ret
            },
            '10'() {
                let ret = (player.essence.add(1).log10().root(10)).add(1)

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