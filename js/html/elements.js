





const SCALE_START = {
    super: {
        rank: E(25),
        tier: E(25),
        pointUpg: E(50)
    },
    hyper: {
        rank: E(75),
        tier: E(75),
        pointUpg: E(125)
    },
    extreme: {

    },
    ultra: {

    },
	exotic: {

	}
}
const SCALE_POWER = {
    super: {
        rank: E(1.67),
        tier: E(1.7),
        pointUpg: E(2),
    },
    hyper: {
        rank: E(2.1),
        tier: E(2.2),
        pointUpg: E(3)
    },
    extreme: {

    },
    ultra: {

    },
	exotic: {

	}
}



const SCALE_TYPE = ['super','hyper','extreme','ultra','exotic']
const FULL_SCALE_NAME = ['Super','Hyper','Extreme','Ultra','EXOTIC']
const SCALING_RES = {
    rank(x=0) {return player.ranks.rank},
    tier(x=0) {return player.ranks.tier},
    /**@param kys @param javascript */
	/**@param RAHHHH */
	pointUpg(x=1) {return player.build["points_"+(x+1)].amt}
}
const NAME_FROM_RES = {
    rank: "Rank",
    tier: "Tier",
    pointUpg: "Point Upgrades 1-3"
}
const SCALE_FP = {}





function updateScalingHTML() {
	let s = SCALE_TYPE[player.scaling_ch]
	tmp.el.scaling_name.setTxt(FULL_SCALE_NAME[player.scaling_ch])
	if (!tmp.scaling) return
	for (let x = 0; x < SCALE_TYPE.length; x++) {
		let type = SCALE_TYPE[x]
		tmp.el["scaling_div_"+x].setDisplay(player.scaling_ch == x)
		if (player.scaling_ch == x) {
			for (let key in SCALE_START[type]) {
				let have = tmp.scaling[type].includes(key)
				tmp.el['scaling_'+x+'_'+key+'_div'].setDisplay(have)
				if (have) {
					let p = tmp.scaling_power[type][key], q = Decimal.pow(SCALE_POWER[type][key],p)
					tmp.el['scaling_'+x+'_'+key+'_power'].setTxt(format(p.mul(100))+"%, "+(x%4==3?q.format()+"^":"^"+q.format()+(x>=6?" to exponent":"")))
					tmp.el['scaling_'+x+'_'+key+'_start'].setTxt(format(tmp.scaling_start[type][key],0))
				}
			}
		}
	}
}


function updateScalingTemp() {
	for (let x = 0; x < SCALE_TYPE.length; x++) {
		let st = SCALE_TYPE[x]
        if (!tmp.scaling) tmp.scaling = {}
        if (!tmp.no_scalings) tmp.no_scalings = {}
		if (!tmp.scaling[st]) tmp.scaling[st] = []
        if (!tmp.no_scalings[st]) tmp.no_scalings[st] = []
        if (!tmp.scaling_power) tmp.scaling_power = {}
        if (!tmp.scaling_power[st]) tmp.scaling_power[st] = []
        if (!tmp.scaling_start) tmp.scaling_start = {}
        if (!tmp.scaling_start[st]) tmp.scaling_start[st] = []




		let sp = tmp.scaling_power[st], ss = tmp.scaling_start[st], ns = tmp.no_scalings[st]
		let key = Object.keys(SCALE_START[st])

		for (let y = 0; y < key.length; y++) {
			let sn = key[y]

			sp[sn] = getScalingPower(x,sn)
			ss[sn] = getScalingStart(x,sn)
			if (noScalings(x,sn)) ns.push(sn)
			else {
		/**@param hell @param nawh */
				if (sn == "pointUpg") for (let i = 0; i < 3; i++) {
					if (scalingActive(sn, SCALING_RES[sn](i), st)) {
						tmp.scaling[st].push(sn)
						break
					}
				}
				else if (scalingActive(sn, SCALING_RES[sn](), st)) tmp.scaling[st].push(sn)
			}
		}
	}
}


function scalingActive(name, amt, type) {
	if (tmp.no_scalings[type].includes(name) || SCALE_START[type][name] === undefined) return false
	return Decimal.gte(amt, tmp.scaling_start[type][name]);
}

function scaleStart(type,name) { return tmp.scaling_start[type][name]||SCALE_START[type][name] }

function getScalingName(name, x=0, y=0) {
	if (!NAME_FROM_RES[name]) return ''

	let cap = Object.keys(SCALE_START).length;
	let current = "";
	let amt = SCALING_RES[name](x,y);
	for (let n = cap - 1; n >= 0; n--) {
		if (scalingActive(name, amt, Object.keys(SCALE_START)[n]))
			return capitalFirst(Object.keys(SCALE_START)[n]) + (n%4==3?"-":" ");
	}
	return current;

}

function getScalingStart(type, name) {
    let start = SCALE_START[SCALE_TYPE[type]][name]








    return start.floor()
}

function getScalingPower(type, name) {
    let power = E(1)

    return power.max(type==3?0.5:0)
}

function noScalings(type, name) {

    return false
}















Decimal.prototype.scaleName = function (type, id, rev=false, type_index) {
    var x = this.clone()
    if (SCALE_START[type][id] && SCALE_POWER[type][id]) {
        let s = tmp.scaling_start[type][id]
        let p = tmp.scaling_power[type][id]
        let e = Decimal.pow(SCALE_POWER[type][id],p)
        x = x.scale(s,e,type_index%4==3?type_index>=7?3:1:type_index>=6?2:0,rev)
    }
    return x
}





Decimal.prototype.scaleEvery = function (id, rev=false, fp=SCALE_FP[id]?SCALE_FP[id]():[1,1,1,1,1,1]) {
    var x = this.clone()
    for (let i = 0; i < SCALE_TYPE.length; i++) {
        let s = rev?i:SCALE_TYPE.length-1-i
        let sc = SCALE_TYPE[s]

        let f = fp[s]||1

        // if (Decimal.gt(f,1)) console.log(id,format(f))

        // if (tmp.no_scalings[sc].includes(id)) continue

        x = tmp.no_scalings[sc].includes(id) ? rev?x.mul(f):x.div(f) : rev?x.mul(f).scaleName(sc,id,rev,s):x.scaleName(sc,id,rev,s).div(f)
    }
    return x
}














































/**@param {nuhuh} nuhuh*/
function setupHTML() {
	let tabs = new Element("tabs")
	let stabs = new Element("stabs")
	let table = ""
	let table2 = ""
	for (let x = 0; x < TABS[1].length; x++) {
		table += /*`<div>*/
			`<button style="width: 15%;" onclick="TABS.choose(${x})" class="btn_tab" id="tab${x}">${TABS[1][x].icon ? `<iconify-icon icon="${TABS[1][x].icon}" width="17" style="color: ${TABS[1][x].color||"white"}"></iconify-icon>` : ""}${TABS[1][x].id}</button>
		`/*</div>`*/
		if (TABS[2][x]) {
			let a = `<div id="stabs${x}" class="table_center stab_btn">`
			for (let y = 0; y < TABS[2][x].length; y++) {
				a += `<div style="width: 120px">
					<button onclick="TABS.choose(${y}, true)" class="btn_tab" id="stab${x}_${y}">${TABS[2][x][y].id}</button>
				</div>`
			}
			a += `</div>`
			table2 += a

		}
	}
	tabs.setHTML(table)
	stabs.setHTML(table2)
	BUILDINGS.setup()
	let ranks_table = new Element("ranks_table")
	table = ""
	for (let x = 0; x < RANKS.names.length; x++) {
		let rn = RANKS.names[x]
		table += `<div style="width: 300px" id="ranks_div_${x}">
			<button id="ranks_auto_${x}" class="btn" style="width: 80px;" onclick="RANKS.autoSwitch('${rn}')">OFF</button>
			<span id="ranks_scale_${x}""></span>${RANKS.fullNames[x]} <h4 id="ranks_amt_${x}">X</h4><br><br>
			<button onclick="RANKS.reset('${rn}')" class="btn reset" id="ranks_${x}">
				Reset your ${x>0?RANKS.fullNames[x-1]+"s":'points and upgrades'}, but ${RANKS.fullNames[x]} up.<span id="ranks_desc_${x}"></span><br>
				Req: <span id="ranks_req_${x}">X</span>
			</button>
		</div>`
	}
	ranks_table.setHTML(table)
	let ranks_rewards_table = new Element("ranks_rewards_table")
	table = ""
	for (let x = 0; x < RANKS.names.length; x++) {
		let rn = RANKS.names[x]
		table += `<div id="ranks_reward_div_${x}">`
		let keys = Object.keys(RANKS.desc[rn])
		for (let y = 0; y < keys.length; y++) {
			table += `<span id="ranks_reward_${rn}_${y}"><b>${RANKS.fullNames[x]} ${keys[y]}:</b> ${RANKS.desc[rn][keys[y]]}${RANKS.effect[rn][keys[y]]?` Currently: <span id='ranks_eff_${rn}_${y}'></span>`:""}</span><br>`
		}
		table += `</div>`
	}

	ranks_rewards_table.setHTML(table)
	let scaling_table = new Element("scaling_table")
	table = ""
	
	for (let x = 0; x < SCALE_TYPE.length; x++) {
		table += `<div id="scaling_div_${x}">`
		let key = Object.keys(SCALE_START[SCALE_TYPE[x]])
		for (let y = 0; y < key.length; y++) {
			table += `<div id="scaling_${x}_${key[y]}_div" style="margin-bottom: 10px;"><b>${NAME_FROM_RES[key[y]]}</b> (<span id="scaling_${x}_${key[y]}_power"></span>): Starts at <span id="scaling_${x}_${key[y]}_start"></span></div>`
		}
		table += `</div>`
	}
	scaling_table.setHTML(table)
	let main_upgs_table = new Element("main_upgs_table")
	table = ""
	for (let x = 1; x <= UPGS.main.cols; x++) {
		let id = UPGS.main.ids[x]
		table += `<div id="main_upg_${x}_div" style="width: 230px; margin: 0px 10px;"><b>${UPGS.main[x].title}</b><br><br><div style="font-size: 13px; min-height: 50px" id="main_upg_${x}_res"></div><br><div class="table_center" style="justify-content: start;">`
		for (let y = 1; y <= UPGS.main[x].lens; y++) {
			let key = UPGS.main[x][y]
			table += `<img onclick="UPGS.main[${x}].buy(${y})" onmouseover="UPGS.main.over(${x},${y})" onmouseleave="UPGS.main.reset()"
			 style="margin: 3px;" class="img_btn" id="main_upg_${x}_${y}" src="images/${key.icon||"mark"}.png">`
		}
		table += `</div><br><button id="main_upg_${x}_auto" class="btn" style="width: 80px;" onclick="player.auto_mainUpg.${id} = !player.auto_mainUpg.${id}">OFF</button></div>`
	}
	main_upgs_table.setHTML(table)
	setupStatsHTML()
	setupElementsHTML()
    tmp.el = {}
	let all = document.getElementsByTagName("*")
	for (let i=0;i<all.length;i++) {
		let x = all[i]
		tmp.el[x.id] = new Element(x)
	}

	
}
function updateTabsHTML() {
	let s = true
	tmp.el.stabs_div.setDisplay(TABS[2][player.tab])
	
	for (let x = 0; x < TABS[1].length; x++) {
		let tab = TABS[1][x]
		if (s) {
			tmp.el["tab"+x].setDisplay(tab.unl ? tab.unl() : true)
			tmp.el["tab"+x].setClasses({btn_tab: true, [tab.style ? tab.style : "normal"]: true, choosed: x == player.tab})
		}

		if (tmp.el["tab_"+x]) tmp.el["tab_"+x].setDisplay(x == player.tab)
		if (TABS[2][x]) {
			tmp.el["stabs"+x].setDisplay(x == player.tab)
			if (x == player.tab) for (let y = 0; y < TABS[2][x].length; y++)  {
				let stab = TABS[2][x][y]
				tmp.el["stab"+x+"_"+y].setDisplay(stab.unl ? stab.unl() : true)
				/**@param {string} BRUUUUU */
				tmp.el["stab"+x+"_"+y].setClasses({btn_tab: true, [stab.style ? stab.style : "normal"]: true, choosed: y == player.stab[x]})
				if (tmp.el["stab_frame"+x+"_"+y]) tmp.el["stab_frame"+x+"_"+y].setDisplay(y == player.stab[x])
			}
		}
	}
}

function updateRanksRewardHTML() {
	tmp.el["ranks_reward_name"].setTxt(RANKS.fullNames[player.ranks_reward])
	for (let x = 0; x < RANKS.names.length; x++) {
		let rn = RANKS.names[x]
		tmp.el["ranks_reward_div_"+x].setDisplay(player.ranks_reward == x)
		if (player.ranks_reward == x) {
			let keys = Object.keys(RANKS.desc[rn])
			for (let y = 0; y < keys.length; y++) {
				let unl = player["best"+RANKS.fullNames[x]].gte(keys[y])
				tmp.el["ranks_reward_"+rn+"_"+y].setDisplay(unl)
				if (unl) if (tmp.el["ranks_eff_"+rn+"_"+y]) tmp.el["ranks_eff_"+rn+"_"+y].setTxt(RANKS.effDesc[rn][keys[y]](RANKS.effect[rn][keys[y]]()))
			}
		}
	}
}

function updateMainUpgradesHTML() {
	if (player.main_upg_msg[0] != 0) {
		let upg1 = UPGS.main[player.main_upg_msg[0]]
		let upg2 = UPGS.main[player.main_upg_msg[0]][player.main_upg_msg[1]]
		let msg = "<span class='sky'>"+(typeof upg2.desc == "function" ? upg2.desc() : upg2.desc)+"</span><br><span>Cost: "+format(upg2.cost,0)+" "+upg1.res+"</span>"
		if (upg2.effDesc !== undefined) msg += "<br><span class='green'>Currently: "+tmp.upgs.main[player.main_upg_msg[0]][player.main_upg_msg[1]].effDesc+"</span>"
		tmp.el.main_upg_msg.setHTML(msg)
	} else tmp.el.main_upg_msg.setTxt("")
	for (let x = 1; x <= UPGS.main.cols; x++) {
		let id = UPGS.main.ids[x]
		let upg = UPGS.main[x]
		let unl = upg.unl()
		tmp.el["main_upg_"+x+"_div"].setDisplay(unl)
		tmp.el["main_upg_"+x+"_res"].setTxt(`You have ${upg.getRes().format(0)} ${upg.res}`)
		if (unl) {
			for (let y = 1; y <= upg.lens; y++) {
				let unl2 = upg[y].unl ? upg[y].unl() : true
				tmp.el["main_upg_"+x+"_"+y].changeStyle("visibility", unl2?"visible":"hidden")
				if (unl2) tmp.el["main_upg_"+x+"_"+y].setClasses({img_btn: true, locked: !upg.can(y), bought: player.mainUpg[id].includes(y)})
			}
			tmp.el["main_upg_"+x+"_auto"].setDisplay(upg.auto_unl ? upg.auto_unl() : false)
			tmp.el["main_upg_"+x+"_auto"].setTxt(player.auto_mainUpg[id]?"ON":"OFF")
		}
	}
}

function updateHTML() {

	document.documentElement.style.setProperty('--cx', tmp.cx)
	document.documentElement.style.setProperty('--cy', tmp.cy)

	/**@param hello @param error */
	updateTabsHTML()
	tmp.el.loading.setDisplay(!tmp.start)
	tmp.el.app.setDisplay(tmp.start)
	/**@nuh uh @param nuh @uh */
	tmp.el.PtDisplay.setHTML(`${format(player.pts, 2)} Points ${formatGain(player.pts, tmp.ptgain.mul(tmp.gs))}`)
	/**@param no @param just @param no */
	updateSettingsHTML()
	BUILDINGS.update('points_1')
	BUILDINGS.update('points_2')
	BUILDINGS.update('points_3')
	BUILDINGS.update('points_4')
	updateRanksHTML()
	updateStatsHTML()
	PRESTIGE.updateHTML()
	if (player.stab[2] == 1) updateMainUpgradesHTML()
	if (player.stab[4] == 0) updateRanksRewardHTML()
	if (player.stab[4] == 1) updateScalingHTML()
	if (player.stab[3] == 1) updateElementsHTML()
	TIME.updateHTML()
	/**@param hello */
	//tmp.el.test.setHTML(SOFTCAPS.points.one())
}

