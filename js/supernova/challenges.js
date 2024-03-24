const CHALS = {
    list: [1],
    inChal(x) {
        return player.chals.active == x
    },
    setup() {
        for (let x = 0; x < CHALS.list.length; x++) {
            if (!player.chals.comps[x]) {
                player.chals.comps[x] = E(0)
            }
        }
        let chals_table = new Element("chals_table")
    },
    rd(x) {
        if (x < 100) {
            return ' Essence'
        }
    },
    reward(x) {
        if (CHALS.chals[x].reward) {
            return CHALS.chals[x].reward
        }
    },
    chals: {
        1: {
            id: '1',
            Title: 'Dark Ages',
            Desc: 'Essence is divided 5 and ^2 (lowers gain), both softcaps start instantly, you no longer gain PS.',
            Reward: 'Both essence softcaps start ^3 later, essence is raised by 1.2',
            goal(x=player.chals.comps[this.id]) {
                let start = E("e4")
                let inc = E("e0.61536")
                return Decimal.mul(start, Decimal.pow(inc, x))
            },
            reward(x=player.chals.comps[this.id]) {

            }
        }
    }
}