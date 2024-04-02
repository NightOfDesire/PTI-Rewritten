var diff = 0;
var date = Date.now();
var player;

function loop() {
    diff = Date.now()-date;
    updateHTML()
    updateTemp()
    calc(diff/1000);
    date = Date.now();
    player.offline.current = date
}

function turnOffline() {
    player.offline.active = !player.offline.active
}

const FORMS = {
    pts: {
        gain() {
            let x = E(1)
            x = x.add(BUILDINGS.eff('points_1'))
            x = x.mul(FORMS.pres.PPtEffect())
            if (player.ranks.rank.gte(2)) x = x.mul(3)
            if (player.ranks.rank.gte(3)) x = x.mul(RANKS.effect.rank[3]())

            x = x.softcap(SOFTCAPS.points.one().start, SOFTCAPS.points.one().power, 0)
            return x
        }
    },
    pres: {
        PPtEffect() {
            let eff = player.prestige.pts.pow(1.25).div(2).add(1)

            return eff
        }
    },
    time: {
        gain() {
            let x = E(1)

            return x
        }
    }
}



const SCALE_START = {
    super: {
        rank: E(25),
        tier: E(25),
        pointUpg: E(50)
    },
    hyper: {
        rank: E(75),
        tier: E(75),
        pointUpg: E(100)
    },
    /*extreme: {

    },
    ultra: {

    }*/
}
const SCALE_POWER = {
    super: {
        rank: E(1.67),
        tier: E(1.7),
        pointUpg: E(1.5),
    },
    hyper: {
        rank: E(2.1),
        tier: E(2.2),
        pointUpg: E(2)
    }/*,
    extreme: {

    },
    ultra: {

    }*/
}

const SCALE_TYPE = ['super','hyper',/*'extreme','ultra'*/]
const FULL_SCALE_NAME = ['Super','Hyper',/*'Extreme','Ultra'*/]
const SCALING_RES = {
    rank(x=0) {return player.ranks.rank},
    tier(x=0) {return player.ranks.tier},
    pointUpg(x=1) {return player.build["points_"+x].amt}
}
const NAME_FROM_RES = {
    rank: "Rank",
    tier: "Tier",
    pointUpg: "Point Upgrades 1-3"
}
const SCALE_FP = {}



function updateScalingHTML() {
	let s = SCALE_TYPE[player.scaling_ch]
	// tmp.el.scaling_name.setTxt(FULL_SCALE_NAME[player.scaling_ch])
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

		tmp.scaling[st] = []
		tmp.no_scalings[st] = []

		let sp = tmp.scaling_power[st], ss = tmp.scaling_start[st], ns = tmp.no_scalings[st]
		let key = Object.keys(SCALE_START[st])

		for (let y = 0; y < key.length; y++) {
			let sn = key[y]

			sp[sn] = getScalingPower(x,sn)
			ss[sn] = getScalingStart(x,sn)
			if (noScalings(x,sn)) ns.push(sn)
			else {
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



