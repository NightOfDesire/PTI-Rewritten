const RANKS = {
    names: ['rank'],
    fullNames: ['Rank'],
    reset(type) {
        if (tmp.ranks[type].can) {
            player.ranks[type] = player.ranks[type].add(1)
            let reset = true
           
            if (reset) this.doReset[type]()
            updateRanksTemp()

           
        }
    },
    reqs: {
        rank(x=player.ranks.rank) {
            let base = E(10)
            let inc = E(10)
            inc = inc.pow(x.div(20).add(1))
            inc = inc.scale(50, 1.02, 0)
            

            let req = Decimal.mul(base, Decimal.pow(inc, x)).scale("e15",1.01,0)

            return req
        }
    },
    unl: {
       
    },
    doReset: {
        rank() {
            player.pts = E(0)
            for (let x = 1; x <= 3; x++) BUILDINGS.reset("points_"+x)
        },
       
    },
    autoSwitch(rn) { player.auto_ranks[rn] = !player.auto_ranks[rn] },
    autoUnl: {
        rank() { return false },
       
    },
    desc: {
        rank: {
            '1': "unlock point upgrade 2.",
        },
    },
    effect: {
        rank: {
           
      
        },
    },
    effDesc: {
        rank: {
            /*3(x) { return "+"+format(x) },*/
           
        },
    }
}

const RTNS = [
    ['','Rank','Tier','Tetr','Pent','Hex','Hept','Oct','Enne'],
    ['','dec','icos'], // d>2 -> cont
    ['','hect'], // h>1 -> ct
]

const RTNS2 = [
    ['','un','do','tri','tetra','penta','hexa','hepta','octa','nona'], // d < 3
    ['','un','du','tria','tetra','penta','hexa','hepta','octa','nona'],
    ['','un','di','tri','tetra','penta','hexa','hepta','octa','nona'], // h
]

function getRankTierName(i) {
    if (Decimal.gte(i,999)) return '['+format(i)+']'
    else {
        i = Number(i)

        if (i < 9) return RTNS[0][i]
        i += 1
        let m = ''
        let h = Math.floor(i / 100), d = Math.floor(i / 10) % 10, o = i % 10

        if (d > 1 && o == 1) m += 'hen' 
        else if (d == 2 && o == 3) m += 'tr' 
        else m += RTNS2[0][o]
        if (d > 2) m += RTNS2[1][d] + 'cont'
        else m += RTNS[1][d]
        if (h > 0 && d > 0) m += 'a'
        if (h > 0) m += (h > 1 ? RTNS2[2][h] + 'ct' : 'hect')

        return capitalFirst(m)
    }
}

function updateRanksTemp() {
    if (!tmp.ranks) tmp.ranks = {}
    for (let x = 0; x < RANKS.names.length; x++) {
        let rn = RANKS.names[x]
        if (!tmp.ranks[rn]) tmp.ranks[rn] = {
            can: false
        }
    }

    for (let x = 0; x < RANKS.names.length; x++) {
        let rn = RANKS.names[x]
        /**@param hiii */
        /**@param WHOOPSSS */
        tmp.ranks[rn].req = RANKS.reqs[rn]()
        tmp.ranks[rn].can = (
            RANKS.names[x-1] ? player.ranks[RANKS.names[x-1]].gte(RANKS.reqs[rn]()) : player.pts.gte(RANKS.reqs[rn]())
        )
    }
}

function updateRanksHTML() {
    

   
        for (let x = 0; x < RANKS.names.length; x++) {
            let rn = RANKS.names[x]
            let unl = (!tmp.brUnl || x > 3)&&(RANKS.unl[rn]?RANKS.unl[rn]():true)
            tmp.el["ranks_div_"+x].setDisplay(unl)
            if (unl) {
                let keys = Object.keys(RANKS.desc[rn])
                let desc = ""
                for (let i = 0; i < keys.length; i++) {
                    if (player.ranks[rn].lt(keys[i])) {
                        desc = ` At ${RANKS.fullNames[x]} ${format(keys[i],0)} - ${RANKS.desc[rn][keys[i]]}`
                        break
                    }
                }
    
               
                tmp.el["ranks_amt_"+x].setTxt(format(player.ranks[rn],0))
                tmp.el["ranks_"+x].setClasses({btn: true, reset: true, locked: !tmp.ranks[rn].can})
                tmp.el["ranks_desc_"+x].setTxt(desc)
                tmp.el["ranks_req_"+x].setTxt(x==0?format(tmp.ranks[rn].req) + " Points":RANKS.fullNames[x-1]+" "+format(tmp.ranks[rn].req,0))
                tmp.el["ranks_auto_"+x].setDisplay(RANKS.autoUnl[rn]())
                tmp.el["ranks_auto_"+x].setTxt(player.auto_ranks[rn]?"ON":"OFF")
            }
}
}