function setupModsHTML() {
    let table = new Element(mods_table)
    h = ''
    for (let x = 0; x < MODS.amt; x++) {
        let mod = MODS.list[x]
        h += `<div class="mod_${mod.Name}>
        <b>${mod.Name} [${format(player.MODIFIERS.comps[mod],0)}/${format(mod.max, 0)}}]<br>
        <div id="mod_${mod.Name}_desc">${mod.Desc}</div><br>
        <div id="mod_${mod.Name}_rewarddesc">${mod.RewardDesc}</div></b>
        <div id="mod_${mod.Name}_reslvl">${mod.ResetLevel}</div><br>
        <button id="${mod.Name}_enter" onclick="!MODS.active(${mod})?MODS.enter(${mod}):MODS.exit(${mod})">${MODS.active(player.MODIFIERS.chosen) ? 'Exit' : 'Enter'}</button>
        </div>`
        table.setHTML(h)
        if (!player.MODIFIERS.comps[mod]) player.MODIFIERS.comps[mod] = E(0)
    }

    
    
}

function updateModsHTML() {
    for (var mod in MODS) {
        if (typeof mod != 'number') return
        let tplt = 'mod_'+mod.Name
        tmp.el[tplt].setHTML(`<b>${mod.Name} [${format(player.MODIFIERS.comps[mod],0)}/${format(mod.max,0)}]`)
        tmp.el[tplt+"_enter"].setHTML(`${MODS.active(mod) ? 'Exit' : 'Enter'}`)
    }
}

const MODS = {
    amt: this.list.length,
    active(mod) {
        return player.MODIFIERS.chosen == mod
    },
    enter(mod) {
        if (player.MODIFIERS.chosen != mod) {
            this.reset(mod)
            player.MODIFIERS.chosen = mod
        }
    },
    exit(mod) {
        if (mod.resource.gte(this.calcreq(mod))) {
            player.MODIFIERS.comps[mod] = player.MODIFIERS.comps[mod].add(1)
        }
        player.MODIFIERS.chosen = 0
    },
    reset(mod) {
        if (mod < 3) {
            player.essence = E(0)
            player.pres.pts = E(0)
        }
    },

    getModData(mod) {
        let req = this.calcreq(mod)
        return {goal: req}
    },
    calcreq(mod) {
        let MOD = this.list[mod]
        let start = MOD.start
        let inc = MOD.inc
        let comps = player.MODIFIERS.comps[mod]
        let ss = comps.div(10).add(1)
        return Decimal.pow(Decimal.mul(start, Decimal.pow(inc, comps)), ss)
    },
    list: {
        1: {
            get start() {return E("1e6")},
            get inc() {return E("27.5183")},
            get max() {return E(10)},
            get resource() {return player.essence},
            Name: 'Insane Essence',
            Desc: 'Essence\'s first softcap starts instantly and is 4x stronger, additionally base Essence gain is raised by 0.5.',
            RewardDesc: 'PS formula is better, Essence SC1\'s start is raised by 3',
            ResetLevel: 'This modifier will force a rank reset.'
        }
    }
}