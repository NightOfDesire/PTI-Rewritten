const BUYABLES_DATA = {
    supernova_1: {
        name: "Time Manipulator",
        icon: 'time',
        get start() { return E(1)},
        get inc() { return E(2.55)},
        get isUnlocked() { return true },
        get autoUnlocked() { return false},
        get noSpend() { return false },
        get beMultiplicative() { return false },
        get res() { return player.sn.stars },
        set res(v) { player.sn.stars = v },
        get allowPurchase() { return true },
        cost(x=this.level) {
            let start = this.start
            let inc = this.inc
            return Decimal.mul(start, Decimal.pow(inc, x))
        },
        get bulk() {
            return getSupernovaUpgradeBulk(1)
        },
        get_cost: x => format(x) + " stars",
        effect(x) {
            let pow = E(2)/*.mul(BUILDINGS.eff('number_2'))*/
            let eff = pow.mul(x)
            eff = eff.softcap(100, 0.5, 0)
            return {power: pow, effect: eff}
        },
        get bonus() {
            let x = E(0)

            return x
        },
        get_power: x => "+"+formatMult(x.power)+" to gamespeed",
        get_effect: x => formatMult(x.effect)+" essence gain",
    },
   
    
}

const BUYABLE_ORDER = [
'supernova_1'
]

Object.keys(BUYABLES_DATA).forEach(i => {
    let b = BUYABLES_DATA[i]

    Object.defineProperty(b, "level", {
        get() { return player.buyables[i].amt },
        set(value) { player.buyables[i].amt = value },
    })
});

const BUYABLES = {
    tick() {
		for (var [i, b] of Object.entries(BUYABLES_DATA)) {
			if (b.isUnlocked && b.autoUnlocked && player.buyables[i].auto) this.buy(i, true)
		}
	},
    temp() {
        if (!tmp.buyables) {
            tmp.buyables = {}
        }

		let bt = tmp.buyables

		for (var i of BUYABLE_ORDER) {
            let b = BUYABLES_DATA[i]

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
    reset(i) { 
        if (player.buyables && player.buyables[i]) {
            player.buyables[i].amt = E(0)
        } 
    },

    //Buying
	buy(i, max=false) {
        let b = BUYABLES_DATA[i], cost = b.cost()

        if (b.res.lt(cost) || !(b.allowPurchase ?? true)) return

        if (max) {
            let bulk = b.bulk
            if (bulk.lte(b.level)) return
            b.level = bulk

            cost = b.cost(bulk.sub(1))
        } else {
            b.level = b.level.add(1)
        }

        console.log()

		if (!b.noSpend && b.res.gt(cost)) {
			b.res = b.res.sub(cost).max(0) // without .max(0) causes NaN because of negative amount
		}
	},

    //Effect
	eff(i, key="effect", def = E(1)) {
        let ret = def.sub(1)
		if (tmp.buyables && tmp.buyables[i]) {
            ret = tmp.buyables[i].effect[key] ?? def
        } else {
            ret =  E(0)
        }
        return ret
	},

    //DOM
	setup() {
		for (var [i, b] of Object.entries(BUYABLES_DATA)) {
            let el = new Element(i+"_buyable")

			if (el.el) el.setHTML(`<div class="table_center upgrade" style="width: 100%; margin-bottom: 5px;">
				<div style="width: 300px">
					<div class="resources">
						<img src="images/${b.icon||"mark"}.png">
                        <span style="margin-left: 5px; text-align: left;">${b.name} [<span id="buyable_lvl_${i}"></span>]</span>
					</div>
				</div>
				<button class="btn" id="buyable_btn_${i}" onclick="BUYABLES.buy('${i}')" style="width: 300px"><span id="buyable_cost_${i}"></span></button>
                <button class="btn" onclick="BUYABLES.buy('${i}', true)" style="width: 120px">Buy Max</button>
				<button class="btn" id="buyable_auto_${i}" onclick="player.buyables.${i}.auto = !player.buyables.${i}.auto" style="width: 80px"></button>
				<div style="margin-left: 5px; text-align: left; width: 400px">
					Power: <span id="buyable_pow_${i}"></span><br>
					Effect: <span id="buyable_eff_${i}"></span>
				</div>
			</div>`)
		}
	},
	update(i) {
        if (!tmp.buyables) tmp.buyables = {}
        if (!tmp.buyables[i]) {
            tmp.buyables[i] = {
                bulk: E(0),
                total: E(0),
                bonus: E(0),
                effect: {}
            }
        }
		let b = BUYABLES_DATA[i], bt = tmp.buyables[i], unl = b.isUnlocked

        tmp.el[i+"_buyable"].setDisplay(unl)

        if (!unl) return;
		
        tmp.el["buyable_lvl_"+i].setHTML(b.level.format(0) + (bt.bonus.gt(0) ? (b.beMultiplicative ? " × " : " + ") + bt.bonus.format(0) : "")) //  + " = " + bt.total.format(0)
        //tmp.el["building_scale_"+i].setHTML(/*b.scale ? getScalingName(b.scale) : ""*/b.name)

       

        let cost = b.cost(), allow = b.allowPurchase ?? true

        tmp.el["buyable_btn_"+i].setClasses({ btn: true, locked: b.res.lt(cost) || !allow })
        tmp.el["buyable_cost_"+i].setHTML(allow ? "Cost: "+b.get_cost(cost) : "Locked" + (b.denyPurchaseText??""))

        tmp.el["buyable_auto_"+i].setDisplay(b.autoUnlocked)
        tmp.el["buyable_auto_"+i].setHTML(player.buyables[i].auto ? "ON" : "OFF")

        let eff = bt.effect

        tmp.el["buyable_pow_"+i].setHTML(b.get_power(eff))
        tmp.el["buyable_eff_"+i].setHTML(b.get_effect(eff))
	},
}

// Config (custom cost, etc.)



function getSupernovaUpgradeBulk(i) {
    let bulk = E(0), fp = E(1), upg = BUYABLES_DATA["supernova_"+i]

    let start = upg.start, inc = upg.inc


        
        
        //if (i == 1 && player.ranks.rank.gte(2)) inc = inc.pow(0.8)
        //if (i == 2 && player.ranks.rank.gte(3)) inc = inc.pow(0.8)
        //if (i == 3 && player.ranks.rank.gte(4)) inc = inc.pow(0.8)
        //if (player.ranks.tier.gte(3)) inc = inc.pow(0.8)

        if (player.sn.stars.gte(start)) bulk = player.sn.stars.div(start).max(1).log(inc).mul(fp).add(1).floor()
    

    return bulk
}