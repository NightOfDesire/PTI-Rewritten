const UPGS = {
   
    main: {
        temp() {
            for (let x = 1; x <= this.cols; x++) {
                for (let y = 1; y <= this[x].lens; y++) {
                    let u = this[x][y]
                    if (!tmp.upgs) tmp.upgs = {}
                    if (!tmp.upgs.main) tmp.upgs.main = []
                    if (!tmp.upgs.main[x]) tmp.upgs.main[x] = []
                    if (!tmp.upgs.main[x][y] && u.effDesc) tmp.upgs.main[x][y]={effect:u.effect(),effDesc:u.effDesc()}
                }
            }
        },
        ids: [null, 'ppt'],
        cols: 1,
        over(x,y) { player.main_upg_msg = [x,y] },
        reset() { player.main_upg_msg = [0,0] },
        1: {
            title: "Prestige Upgrades",
            res: "Prestige Points",
            getRes() { return player.prestige.pts },
            unl() { return true },
            can(x) { return player.prestige.pts.gte(this[x].cost) && !player.mainUpg.ppt.includes(x) },
            buy(x) {
                if (this.can(x)) {
                    player.prestige.pts = player.prestige.pts.sub(this[x].cost)
                    player.mainUpg.ppt.push(x)
                }
            },
            auto_unl() { return false },
            lens: 1,
          
            1: {
                unl() { return true },
                desc: "Point gain is raised by ^1.1",
                cost: E(1e33),
                effect() {
                    let ret = E(1.1)
                    return ret
                },
                effDesc(x=this.effect()) {
                    return formatPow(x)
                }
            },
         }
        }
    }
function hasUpgrade(id,x) { return player.mainUpg[id].includes(x) }
function upgEffect(id,x,def=E(1)) { return tmp.upgs.main[id][x]?tmp.upgs.main[id][x].effect:def }
function resetMainUpgs(id,keep=[]) {
    let k = []
    let id2 = UPGS.main.ids[id]
    for (let x = 0; x < player.mainUpg[id2].length; x++) if (keep.includes(player.mainUpg[id2][x])) k.push(player.mainUpg[id2][x])
    player.mainUpg[id2] = k
}