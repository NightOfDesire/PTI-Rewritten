var diff = 0;
var date = Date.now();
var player

const ST_NAMES = [
	null, [
		["","U","D","T","Qa","Qt","Sx","Sp","Oc","No"],
		["","Dc","Vg","Tg","Qag","Qtg","Sxg","Spg","Ocg","Nog"],
		["","Ce","De","Te","Qae","Qte","Sxe","Spe","Oce","Noe"],
       // ["","U","D","T","Qd","Qn","Sx","Sp","Oc","No"],
       // ["","De","Vg","Tg","qg","Qg","sg","Sg","Og","Ng"],
       // ["","Ce","Du","Tr","Qa","Qi","Se","Si","Ot","Ni"]
	],[
		["","Mi","Mc","Na","Pi","Fm","At","Zp","Yc","Xo"],
		["","Me","Du","Tr","Te","Pe","He","Hp","Ot","En"],
		["","c","Ic","TCn","TeC","PCn","HCn","HpC","OCn","ECn"],
		["","Hc","DHe","THt","TeH","PHc","HHe","HpH","OHt","EHc"]
	]
]

const RESETS = {
    rage() {
        player.rp.points = player.rp.points.add(tmp.rp.gain)
        player.rp.unl = true
        FORMS.rp.doReset()
    },
    atomize() {
        player.am.points = player.am.points.add(tmp.am.gain)
        player.am.unl = true
        FORMS.am.doReset()
    }
}

const FORMS = {
    number: {
        gain() {
            if (tmp.passiveNumberGain == false) {
                player.number = player.number.add(tmp.numberGain)
                player.misc.totalNumber = player.misc.totalNumber.add(tmp.numberGain)
            }
        }
    },
    numberGain() {
    let x = E(1)
    x = x.add(BUILDINGS.eff('number_1'))
    x = x.mul(player.rp.points.pow('1.5').add(1))
    x = x.pow(FORMS.am.at_ma.effects.first())
    return x
   },
   rp: {
    gain() {
        let gain = player.number.div(2.5e6).root(2.8)
        gain = gain.mul(player.am.points.pow(10).add(1))
        return gain.floor()
    },
    reset() {
        if (tmp.rp.can == true) {
            RESETS.rage()
        }
    },
    doReset() {
        player.number = E(0)
        for (let n=0;n<=5;n++) {
            BUILDINGS.reset('number_'+n)
        }
    },
    see() {
        return player.rp.unl || player.number.gte(1e5) || player.rp.points.gt(0)
    }
   },
   am: {
    gain() {
        let gain = player.rp.points.div(9e18).root(3)
        
        return gain.floor()
    },
    reset() {
        if (tmp.am.can == true) {
            RESETS.atomize()
        }
    },
    doReset() {
        FORMS.rp.doReset()
        player.rp.points = E(0)
    },
    see() {
        return player.am.unl || player.rp.points.gte("e15") || player.am.points.gt(0)
    },
    AMgain() {
        let x = E(0)
        if (player.rp.unl) x = x.add(1)
        x = x.add(player.am.points.log(100).pow(0.3).pow((player.am.points.div(100).root(15).add(1))).add(1))

        return x.floor()
    },
    at_ma: {
        effects: {
            first() {
                let eff = E(0)
                eff = eff.add(player.am.atomic_mass.root(25).add(1))
                eff = eff.softcap("10",0.25,0)
                return eff
            }
        }
    }
   },
   gamespeed() {
    let x = E(1)
    //x = x.add(player.number.root(125)).add
    return x
   }

}

function loop() {
    diff = Date.now()-date;
    //ssf[1]()
    updateHTML()
    updateTemp()
    BUILDINGS.tick()
    //calc(diff/1000);
    date = Date.now();
    player.offline.current = date
}

function turnOffline() {
player.offline.active = !player.offline.active}

function format(ex, acc=4, max=100, type=player.options.notation) {
    

    ex = E(ex)
    neg = ex.lt(0)?"-":""
    if (ex.mag == Infinity) return neg + 'Infinite'
    if (Number.isNaN(ex.mag)) return neg + 'NaN'
    if (ex.lt(0)) ex = ex.mul(-1)
    if (ex.eq(0)) return ex.toFixed(acc)
    let e = ex.log10().floor()
    switch (type) {
        case "scientific":
            if (ex.log10().lt(Math.min(-acc,0)) && acc > 1) {
                let e = ex.log10().ceil()
                let m = ex.div(e.eq(-1)?E(0.1):E(10).pow(e))
                let be = e.mul(-1).max(1).log10().gte(9)
                return neg+(be?'':m.toFixed(4))+'e'+format(e, 0, max, "scientific")
            } else if (e.lt(max)) {
                let a = Math.max(Math.min(acc-e.toNumber(), acc), 0)
                return neg+(a>0?ex.toFixed(a):ex.toFixed(a).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'))
            } else {
                if (ex.gte("eeeee15")) {
                    let slog = ex.slog()
                    return (slog.gte(1e9)?'':E(10).pow(slog.sub(slog.floor())).toFixed(4)) + "F" + format(slog.floor(), 0)
                }
                let m = ex.div(E(10).pow(e))
                let be = e.log10().gte(9)
                return neg+(be?'':m.toFixed(4))+'e'+format(e, 0, max, "scientific")
            }
        case "standard":
            let e3 = ex.log(1e3).floor()
			if (e3.lt(1)) {
				return neg+ex.toFixed(Math.max(Math.min(acc-e.toNumber(), acc), 0))
			} else {
				let e3_mul = e3.mul(3)
				let ee = e3.log10().floor()
				if (ee.gte(3000)) return "e"+format(e, acc, max, "standard")

				let final = ""
				if (e3.lt(4)) final = ["", "K", "M", "B"][Math.round(e3.toNumber())]
				else {
					let ee3 = Math.floor(e3.log(1e3).toNumber())
					if (ee3 < 100) ee3 = Math.max(ee3 - 1, 0)
					e3 = e3.sub(1).div(E(10).pow(ee3*3))
					while (e3.gt(0)) {
						let div1000 = e3.div(1e3).floor()
						let mod1000 = e3.sub(div1000.mul(1e3)).floor().toNumber()
						if (mod1000 > 0) {
							if (mod1000 == 1 && !ee3) final = "U"
							if (ee3) final = FORMATS.standard.tier2(ee3) + (final ? "-" + final : "")
							if (mod1000 > 1) final = FORMATS.standard.tier1(mod1000) + final
						}
						e3 = div1000
						ee3++
					}
				}

				let m = ex.div(E(10).pow(e3_mul))
				return neg+(ee.gte(10)?'':(m.toFixed(E(3).sub(e.sub(e3_mul)).add(acc==0?0:1).toNumber()))+' ')+final
			}
        default:
            return neg+FORMATS[type].format(ex, acc, max)
    }
}

const ARV = ['mlt','mgv','giv','tev','pev','exv','zev','yov']

function formatMass(ex, acc=4) {
    let md = player.options.massDis
    ex = E(ex)
    if (md == 1) return format(ex, acc) + ' g'
    else if (md == 2) return format(ex.div(1.5e56).max(1).log10().div(1e9), acc) + ' mlt'
    else if (md == 3) {
        return  ex.gte('ee14979') ? formatARV(ex, acc) : ex.gte('1.5e1000000056') ? format(ex.div(1.5e56).max(1).log10().div(1e9), acc) + ' mlt' : format(ex, acc) + ' g'
    }

    if (ex.gte(E(1.5e56).mul('ee9'))) return formatARV(ex)
    if (ex.gte(1.5e56)) return format(ex.div(1.5e56), acc) + ' uni'
    if (ex.gte(2.9835e45)) return format(ex.div(2.9835e45), acc) + ' MMWG'
    if (ex.gte(1.989e33)) return format(ex.div(1.989e33), acc) + ' M☉'
    if (ex.gte(5.972e27)) return format(ex.div(5.972e27), acc) + ' M⊕'
    if (ex.gte(1.619e20)) return format(ex.div(1.619e20), acc) + ' MME'
    if (ex.gte(1e6)) return format(ex.div(1e6), acc) + ' tonne'
    if (ex.gte(1e3)) return format(ex.div(1e3), acc) + ' kg'
    return format(ex, acc)+ ' g'
}

function getMltValue(mass){
	mass = E(mass);
	if(mass.lte(1e50)){
		return mass.div(1.5e56).mul(Decimal.log10(Decimal.exp(1))).div(1e9);
	}else{
		return mass.div(1.5e56).add(1).log10().div(1e9);
	}
}

function formatARV(ex,gain=false) {
    let mlt = getMltValue(ex);
    if (gain) mlt = ex
    let arv = mlt.log10().div(15).floor()
	if (player.options.massDis == 2 || player.options.massDis == 3 && arv.lt(1002))arv = E(0)
	if(arv.add(2).gte(1000))return format(mlt.log10().div(15).add(2))+" arvs";
    return format(mlt.div(Decimal.pow(1e15,arv))) + " " + (arv.gte(8)?"arv^"+format(arv.add(2),0):ARV[arv.toNumber()])
}

function formatGain(amt, gain, isMass=false) {
    let md = player.options.massDis
    let f = isMass?formatMass:format
    let next = amt.add(gain)
    let rate
    let ooms = next.max(1).log10().div(amt.max(1).log10())
    if (((ooms.gte(10) && amt.gte('ee100')) || ooms.gte(10**0.05) && amt.gte('ee1000')) && (!isMass || md == 1 || md == 2)) {
        ooms = ooms.log10().mul(20)
        rate = "(+"+format(ooms) + " OoMs^2/sec)"
    }else{
		ooms = next.div(amt)
		if ((ooms.gte(10) && amt.gte(1e100)) || (isMass && md == 2)) {
        ooms = ooms.log10().mul(20)
        if (isMass && amt.gte(mlt(1)) && ooms.gte(1e6) && md != 1){
			let mlt_amt = getMltValue(amt)
			let mlt_next = getMltValue(amt.add(gain.div(20)))
			rate = "(+"+formatARV(mlt_next.sub(mlt_amt).mul(20),true) + "/sec)"
		}
        else rate = "(+"+format(ooms) + " OoMs/sec)"
		if ((md == 0 || md == 3) && isMass){
			let arv_amt = getMltValue(amt).log10().div(15);
			let arv_next = getMltValue(amt.add(gain.div(20))).log10().div(15);
			if (getMltValue(gain).log10().div(15).gte(1000) || arv_next.sub(arv_amt).gte(10))rate = "(+"+format(arv_next.sub(arv_amt).mul(20)) + " arvs/sec)"
		}
    }
    else rate = "(+"+f(gain)+"/sec)"
	}
    return rate
}

function formatTime(ex,acc=2,type="s") {
    ex = E(ex)
    if (ex.gte(86400)) return format(ex.div(86400).floor(),0,12,"sc")+":"+formatTime(ex.mod(86400),acc,'d')
    if (ex.gte(3600)||type=="d") return (ex.div(3600).gte(10)||type!="d"?"":"0")+format(ex.div(3600).floor(),0,12,"scientific")+":"+formatTime(ex.mod(3600),acc,'h')
    if (ex.gte(60)||type=="h") return (ex.div(60).gte(10)||type!="h"?"":"0")+format(ex.div(60).floor(),0,12,"scientific")+":"+formatTime(ex.mod(60),acc,'m')
    return (ex.gte(10)||type!="m" ?"":"0")+format(ex,acc,12,"scientific")
}

function formatReduction(ex) { ex = E(ex); return format(E(1).sub(ex).mul(100))+"%" }

function formatPercent(ex) { ex = E(ex); return format(ex.mul(100))+"%" }

function formatMult(ex,acc=4) { ex = E(ex); return ex.gte(1)?"×"+ex.format(acc):"/"+ex.pow(-1).format(acc)}

function capitalFirst(str) {
	if (str=="" || str==" ") return str
	return str
		.split(" ")
		.map(x => x[0].toUpperCase() + x.slice(1))
		.join(" ");
}
function PassiveNumGain() {
    //if (tmp.PassiveNumberGain == true) {
        player.number = player.number.add(tmp.numberGain.mul(tmp.gs))
        player.misc.totalNumber = player.misc.totalNumber.add(tmp.numberGain.mul(tmp.gs))
    //}
}
setInterval(PassiveNumGain, 1000)