/* BUILDINGS.JS: ORIGINAL BY AAREX AND MRREDSHARK77 */

const BUILDINGS_DATA = {
   
   
    
    points_1: {
        name: "Empowerment",

        get isUnlocked() { return trur },
        get autoUnlocked() { return false },
        get noSpend() { return false },

        get res() { return player.pointd },
        set res(v) { player.points = v },

        cost(x=this.level) {
            let start = 10
            let inc = 1.5
            let pow = 1
            return Decimal.pow(Decimal.mul(start, Decimal.pow(inc, x)), pow)
        },
        get bulk() {
            return E(0)
        },

        get_cost: x => format(x) + " Points",

        effect(x) {
            let pow = E(1)
            let eff = pow.mul(x)
            return {power: pow, effect: eff}
        },

        get bonus() {
            let x = E(0)

            return x
        },

        get_power: x => "+" + format(x.power) + " to point gain",
        get_effect: x => "+" + (x.effect) + " point gain",
    },
    
}

const BUILDINGS_ORDER = [
    
]

Object.keys(BUILDINGS_DATA).forEach(i => {
    let b = BUILDINGS_DATA[i]

    Object.defineProperty(b, "level", {
        get() { return player.build[i].amt },
        set(value) { player.build[i].amt = value },
    })
});

const BUILDINGS = {
    //Calculation
    tick() {
		for (var [i, b] of Object.entries(BUILDINGS_DATA)) {
			if (b.isUnlocked && b.autoUnlocked && player.build[i].auto) this.buy(i, true)
		}
	},
    temp() {
		let bt = tmp.build

		for (var i of BUILDINGS_ORDER) {
            let b = BUILDINGS_DATA[i]

			if (b.isUnlocked || b.forceEffect) {
                let bonus = b.bonus
                let total = b.beMultiplicative ? b.level.add(1).mul(bonus.add(1)).sub(1) : b.level.add(bonus)

                bt[i] = {
                    bulk: b.bulk,
                    total: total,
                    bonus: bonus,
                    effect: b.effect(total),
                }
            } else {
                bt[i] = {
                    bulk: E(0),
                    total: E(0),
                    bonus: E(0),
                    effect: {},
                }
            }
		}
	},

    //Reset
    reset(i) { player.build[i].amt = E(0) },

    //Buying
	buy(i, max=false) {
        let b = BUILDINGS_DATA[i], cost = b.cost()

        if (b.res.lt(cost) || !(b.allowPurchase ?? true)) return

        if (max) {
            let bulk = b.bulk
            if (bulk.lte(b.level)) return
            b.level = bulk

            cost = b.cost(bulk.sub(1))
        } else {
            b.level = b.level.add(1)
        }

        

		if (!b.noSpend && b.res.gt(cost)) {
			b.res = b.res.sub(cost).max(0) // without .max(0) causes NaN because of negative amount
		}
	},

    //Effect
	eff(i, key="effect", def = E(1)) {
		return tmp.build[i].effect[key] ?? def
	},

    //DOM
	setup() {
		for (var [i, b] of Object.entries(BUILDINGS_DATA)) {
            let el = new Element("building_"+i)

			if (el.el) el.setHTML(`<div class="table_center upgrade" style="width: 100%; margin-bottom: 5px;">
				<div style="width: 300px">
					<div class="resources">
						<img src="images/${b.icon||"mark"}.png">
						
					</div>
				</div>
				<button class="btn" id="building_btn_${i}" onclick="BUILDINGS.buy('${i}')" style="width: 300px"><span id="building_cost_${i}"></span></button>
                <button class="btn" onclick="BUILDINGS.buy('${i}', true)" style="width: 120px">Buy Max</button>
				<button class="btn" id="building_auto_${i}" onclick="player.build.${i}.auto = !player.build.${i}.auto" style="width: 80px"></button>
				<div style="margin-left: 5px; text-align: left; width: 400px">
					Power: <span id="building_pow_${i}"></span><br>
					Effect: <span id="building_eff_${i}"></span>
				</div>
			</div>`)
		}
	},
	update(i) {
		let b = BUILDINGS_DATA[i], bt = tmp.build[i], unl = b.isUnlocked

        tmp.el["building_"+i].setDisplay(unl)

        if (!unl) return;
		
        tmp.el["building_lvl_"+i].setHTML(b.level.format(0) + (bt.bonus.gt(0) ? (b.beMultiplicative ? " × " : " + ") + bt.bonus.format(0) : "")) //  + " = " + bt.total.format(0)
       

        let cost = b.cost(), allow = b.allowPurchase ?? true

        tmp.el["building_btn_"+i].setClasses({ btn: true, locked: b.res.lt(cost) || !allow })
        tmp.el["building_cost_"+i].setHTML(allow ? "Cost: "+b.get_cost(cost) : "Locked" + (b.denyPurchaseText??""))

        tmp.el["building_auto_"+i].setDisplay(b.autoUnlocked)
        tmp.el["building_auto_"+i].setHTML(player.build[i].auto ? "ON" : "OFF")

        let eff = bt.effect

        tmp.el["building_pow_"+i].setHTML(b.get_power(eff))
        tmp.el["building_eff_"+i].setHTML(b.get_effect(eff))
	},
}

// Config (custom cost, etc.)

function checkBuildings() {
    /*let b

    // Mass Upgrades
    if (player.massUpg) for (let x = 1; x <= 4; x++) {
        b = player.build['mass_'+x]

        if (b.amt.lte(0) && player.massUpg[x] && Decimal.gt(player.massUpg[x],0)) {
            b.amt = E(player.massUpg[x])
            player.massUpg[x] = undefined;
        }

        b.auto = b.auto || player.autoMassUpg[x]

        player.autoMassUpg[x] = false
    }

    // Tickspeed
    b = player.build.tickspeed
    if (b.amt.lte(0) && player.tickspeed && Decimal.gt(player.tickspeed,0)) {
        b.amt = E(player.tickspeed)
        player.tickspeed = undefined;
    }
    b.auto = b.auto || player.autoTickspeed
    player.autoTickspeed = false

    // Accelerator
    b = player.build.accelerator
    if (b.amt.lte(0) && player.accelerator && Decimal.gt(player.accelerator,0)) {
        b.amt = E(player.accelerator)
        player.accelerator = undefined;
    }
    b.auto = b.auto || player.autoAccel
    player.autoAccel = false

    // BHC
    b = player.build.bhc
    if (b.amt.lte(0) && player.bh.condenser && Decimal.gt(player.bh.condenser,0)) {
        b.amt = E(player.bh.condenser)
        player.bh.condenser = undefined;
    }
    b.auto = b.auto || player.bh.autoCondenser
    player.bh.autoCondenser = false

    // FVM
    b = player.build.fvm
    if (b.amt.lte(0) && player.bh.fvm && Decimal.gt(player.bh.fvm,0)) {
        b.amt = E(player.bh.fvm)
        player.bh.fvm = undefined;
    }
    b.auto = b.auto || player.bh.autoFVM
    player.bh.autoFVM = false

    // Cosmic Ray
    b = player.build.cosmic_ray
    if (b.amt.lte(0) && player.atom.gamma_ray && Decimal.gt(player.atom.gamma_ray,0)) {
        b.amt = E(player.atom.gamma_ray)
        player.atom.gamma_ray = undefined;
    }
    b.auto = b.auto || player.atom.auto_gr
    player.atom.auto_gr = false

    // Star Booster
    b = player.build.star_booster
    if (b.amt.lte(0) && player.stars.boost && Decimal.gt(player.stars.boost,0)) {
        b.amt = E(player.stars.boost)
        player.stars.boost = undefined;
        b.auto = hasTree('qol4')
    }

    // Cosmic String
    b = player.build.cosmic_string
    if (b.amt.lte(0) && player.qu.cosmic_str && Decimal.gt(player.qu.cosmic_str,0)) {
        b.amt = E(player.qu.cosmic_str)
        player.qu.cosmic_str = undefined;
    }
    b.auto = b.auto || player.qu.auto_cr
    player.qu.auto_cr = false

    // Parallel Extruder
    b = player.build.pe
    if (b.amt.lte(0) && player.inf.pe && Decimal.gt(player.inf.pe,0)) {
        b.amt = E(player.inf.pe)
        player.inf.pe = undefined;
    }*/
}