const RANKS = {
    reset(type) {
        switch(type) {
            case "rank": 

            player.essence = E(0)
            player.pres.pts = E(0)
            player.ranks.rank = player.ranks.rank.add(1)
            addNotify(`Ranked up to ${format(player.ranks.rank.add(1), 0)}.`, 1)
            default: ''
        }
    },
    text: {
        "1": `Prestige Shard gain is raised by 1.15, ${formatMult(2)} Essence`
    },
    effects: {
        
    }
}

function updateRanksHTML() {

    tmp.el.rankup.setHTML(`
    Reset your progress but rank up. ${RANKS.text[player.ranks.rank.add(1)] ? 'At rank ' + format(player.ranks.rank.add(1), 0) + '- ' + ' ' + RANKS.text[player.ranks.rank.add(1)] : ''}
    `)

}

setInterval(updateRanksHTML, 50)