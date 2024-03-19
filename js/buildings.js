/* BUILDINGS.JS: ORIGINAL BY AAREX AND MRREDSHARK77 */

const BUILDING = {
   
   
    
    number_1: {
        name: "Energetic",
        icon: 'placeholder',
        get start() { return E(25)},
        get inc() { return E(1.7193)},
        get isUnlocked() { return true },
        get autoUnlocked() { return player.rp.points.gte("e3.5") },
        get noSpend() { return false },
        get beMultiplicative() { return false },
        get res() { return player.number },
        set res(v) { player.number = v },
        get allowPurchase() { return true },
        cost(x=this.level) {
            let start = this.start
            let inc = this.inc
            return Decimal.mul(start, Decimal.pow(inc, x))
        },
        get bulk() {
            return getNumUpgradeBulk(1)
        },
        get_cost: x => format(x) + " number",
        effect(x) {
            let pow = E(1).mul(BUILDINGS.eff('number_2'))
            let eff = pow.mul(x)
            return {power: pow, effect: eff}
        },
        get bonus() {
            let x = E(0)
            x = x.add(player.number.sub("1e1000")).root("1000").floor()
            x = x.softcap("e33",0.05,0)
            return x
        },
        get_power: x => "+"+format(x.power)+" to number gain",
        get_effect: x => "+"+format(x.effect)+" number gain",
    },
    number_2: {
        name: "Crystallize",
        icon: 'placeholder',
        get start() { return E("e3")},
        get inc() { return E("e0.777")},
        get isUnlocked() { return player.number.gte("750") },
        get autoUnlocked() { return player.rp.points.gte("e8") },
        get noSpend() { return false },
        get beMultiplicative() { return false },
        get res() { return player.number },
        set res(v) { player.number = v },
        get allowPurchase() { return true },
        cost(x=this.level) {
            let start = this.start
            let inc = this.inc
            
            return Decimal.mul(start, Decimal.pow(inc, x))
        },
        get bulk() {
            return getNumUpgradeBulk(2)
        },
        get_cost: x => format(x) + " number",
        effect(x) {
            let pow = E(4).pow(BUILDINGS.eff('number_3'))
            let eff = pow.mul(x).add(1)
            return {power: pow, effect: eff}
        },
        get bonus() {
            let x = E(0)

            return x
        },
        get_power: x => "+"+formatMult(x.power)+" to Energetic power",
        get_effect: x => formatMult(x.effect)+" Energetic power",
    },
    number_3: {
        name: "Obelisk",
        icon: 'sm',
        get start() { return E("e12")},
        get inc() { return E("e2.8163")},
        get isUnlocked() { return player.number.gte("e10") },
        get autoUnlocked() { return player.rp.points.gte("e28")},
        get noSpend() { return false },
        get beMultiplicative() { return false },
        get res() { return player.number },
        set res(v) { player.number = v },
        get allowPurchase() { return true },
        cost(x=this.level) {
            let start = this.start
            let inc = this.inc
            
            return Decimal.mul(start, Decimal.pow(inc, x))
        },
        get bulk() {
            return getNumUpgradeBulk(3)
        },
        get_cost: x => format(x) + " number",
        effect(x) {
            let pow = E(1.33)
            pow = pow.mul(BUILDINGS.eff('number_4'))
            let eff = pow.mul(x).add(1)
            eff = eff.softcap("25",0.6,0)
            return {power: pow, effect: eff}
        },
        get bonus() {
            let x = E(0)

            return x
        },
        get_power: x => "+^"+format(x.power)+" to Crystallize power",
        get_effect: x => "^"+format(x.effect)+" Crystallize power",
    }, number_4: {
        name: "Darkness",
        icon: 'nullmatter',
        get start() { return E("e125")},
        get inc() { return E("e25")},
        get isUnlocked() { return player.number.gte("e100") },
        get autoUnlocked() { return player.rp.points.gte("e50")},
        get noSpend() { return false },
        get beMultiplicative() { return false },
        get res() { return player.number },
        set res(v) { player.number = v },
        get allowPurchase() { return true },
        cost(x=this.level) {
            let start = this.start
            let inc = this.inc
            if (x.gte("25")) inc = inc.pow(x.root(50).add(1))
            
            return Decimal.mul(start, Decimal.pow(inc, x))
        },
        get bulk() {
            return getNumUpgradeBulk(4)
        },
        get_cost: x => format(x) + " number",
        effect(x) {
            let pow = E(1.5)
            pow = pow.pow(BUILDINGS.eff('number_5'))
            pow = pow.softcap("e3",0.88,0)
            let eff = pow.mul(x).add(1)
            eff = eff.softcap("100",0.8,0)
            return {power: pow, effect: eff}
        },
        get bonus() {
            let x = E(0)

            return x
        },
        get_power: x => "+"+formatMult(x.power)+" to Obelisk power",
        get_effect: x => formatMult(x.effect)+" Obelisk power",
    },
    number_5: {
        name: "Infinity",
        icon: "inf",
        get start() { return E("e6666")},
        get inc() { return E("e666")},
        get isUnlocked() {return player.number.gte("e5555")},
        get autoUnlocked() {return player.number.gte("e2.5e5")},
        get noSpend() {return false},
        get beMultiplicative() {return false},
        get res() {return player.number},
        set res(v) {player.number=v},
        get allowPurchase() {return true},
        cost(x=this.level) {
            let start = this.start
            let inc = this.inc
            return Decimal.mul(start, Decimal.pow(inc, x))
        },
        get bulk() {
            return getNumUpgradeBulk(5)
        },
        get_cost: x => format(x) + " number",
        effect(x) {
            let pow = E(2)
            let eff = pow.mul(x).add(1)
            return {power: pow, effect: eff}
        },
        get bonus() {
            let x = E(0)
            
            return x
        },
        get_power: x => "+^"+format(x.power)+" to Darkness Power",
        get_effect: x => "^"+format(x.effect)+" Darkness Power"
    }
    
}

const BUILDINGS_ORDER = [
    'number_5','number_4',
    'number_3','number_2','number_1'
]

Object.keys(BUILDING).forEach(i => {
    let b = BUILDING[i]

    Object.defineProperty(b, "level", {
        get() { return player.build[i].amt },
        set(value) { player.build[i].amt = value },
    })
});

const BUILDINGS = {
    tick() {
		for (var [i, b] of Object.entries(BUILDING)) {
			if (b.isUnlocked && b.autoUnlocked && player.build[i].auto) this.buy(i, true)
		}
	},
    temp() {
        if (!tmp.build) {
            tmp.build = {}
        }

		let bt = tmp.build

		for (var i of BUILDINGS_ORDER) {
            let b = BUILDING[i]

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
        if (player.build && player.build[i]) {
            player.build[i].amt = E(0)
        } 
    },

    //Buying
	buy(i, max=false) {
        let b = BUILDING[i], cost = b.cost()

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
		if (tmp.build && tmp.build[i]) {
            ret = tmp.build[i].effect[key] ?? def
        } else {
            ret =  E(0)
        }
        return ret
	},

    //DOM
	setup() {
		for (var [i, b] of Object.entries(BUILDING)) {
            let el = new Element("building_"+i)

			if (el.el) el.setHTML(`<div class="table_center upgrade" style="width: 100%; margin-bottom: 5px;">
				<div style="width: 300px">
					<div class="resources">
						<img src="images/${b.icon||"mark"}.png">
                        <span style="margin-left: 5px; text-align: left;">${b.name} [<span id="building_lvl_${i}"></span>]</span>
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
        if (!tmp.build) tmp.build = {}
        if (!tmp.build[i]) {
            tmp.build[i] = {
                bulk: E(0),
                total: E(0),
                bonus: E(0),
                effect: {}
            }
        }
		let b = BUILDING[i], bt = tmp.build[i], unl = b.isUnlocked

        tmp.el["building_"+i].setDisplay(unl)

        if (!unl) return;
		
        tmp.el["building_lvl_"+i].setHTML(b.level.format(0) + (bt.bonus.gt(0) ? (b.beMultiplicative ? " × " : " + ") + bt.bonus.format(0) : "")) //  + " = " + bt.total.format(0)
        //tmp.el["building_scale_"+i].setHTML(/*b.scale ? getScalingName(b.scale) : ""*/b.name)

       

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



function getNumUpgradeBulk(i) {
    let bulk = E(0), fp = E(1), upg = BUILDING["number_"+i]

    let start = upg.start, inc = upg.inc


        
        
        //if (i == 1 && player.ranks.rank.gte(2)) inc = inc.pow(0.8)
        //if (i == 2 && player.ranks.rank.gte(3)) inc = inc.pow(0.8)
        //if (i == 3 && player.ranks.rank.gte(4)) inc = inc.pow(0.8)
        //if (player.ranks.tier.gte(3)) inc = inc.pow(0.8)

        if (player.number.gte(start)) bulk = player.number.div(start).max(1).log(inc).mul(fp).add(1).floor()
    

    return bulk
}