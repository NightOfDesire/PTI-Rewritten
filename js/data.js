function E(x){return new Decimal(x)};
const EINF = Decimal.dInf
const FPS = 20

function uni(x) { return E(1.5e56).mul(x) }
function mlt(x) { return uni("ee9").pow(x) }

Decimal.prototype.modular=Decimal.prototype.mod=function (other){
    other=E(other);
    if (other.eq(0)) return E(0);
    if (this.sign*other.sign==-1) return this.abs().mod(other.abs()).neg();
    if (this.sign==-1) return this.abs().mod(other.abs());
    return this.sub(this.div(other).floor().mul(other));
};
Decimal.prototype.format = function (acc=4, max=12) { return format(this.clone(), acc, max) }
Decimal.prototype.formatGain = function (gain, mass=false) { return formatGain(this.clone(), gain, mass) }
Decimal.prototype.softcap = function (start, power, mode, dis=false) {
    var x = this.clone()
    if (!dis&&x.gte(start)) {
        if ([0, "pow"].includes(mode)) x = x.div(start).max(1).pow(power).mul(start)
        if ([1, "mul"].includes(mode)) x = x.sub(start).div(power).add(start)
        if ([2, "exp"].includes(mode)) x = expMult(x.div(start), power).mul(start)
        if ([3, "log"].includes(mode)) x = x.div(start).log(power).add(1).mul(start)
        if ([4, "div"].includes(mode)) x = x.div(start).div(power).add(1).mul(start)
    }
    return x
}

Decimal.prototype.scale = function (s, p, mode, rev=false) {
    s = E(s)
    p = E(p)
    var x = this.clone()
    if (x.gte(s)) {
        if ([0, "pow"].includes(mode)) x = rev ? x.div(s).root(p).mul(s) : x.div(s).pow(p).mul(s)
        if ([1, "exp"].includes(mode)) x = rev ? x.div(s).max(1).log(p).add(s) : Decimal.pow(p,x.sub(s)).mul(s)
        if ([2, "dil"].includes(mode)) {
            let s10 = s.log10()
            x = rev ? Decimal.pow(10,x.log10().div(s10).root(p).mul(s10)) : Decimal.pow(10,x.log10().div(s10).pow(p).mul(s10))
        }
        if ([3, "alt_exp"].includes(mode)) x = rev ? x.div(s).max(1).log(p).add(1).mul(s) : Decimal.pow(p,x.div(s).sub(1)).mul(s)
    }
    return x
}




function calc(dt) {
    let gs = tmp.gs.mul(dt)
    if (!tmp.pass) tmp.pass = 0
   

    if (tmp.pass<=0) {
        player.essence = player.essence.add(tmp.essenceGain.mul(gs))
        if (tmp.pres.auto) player.pres.pts = player.pres.pts.add(tmp.pres.gain.mul(gs))
        player.abyss.essence = player.abyss.essence.add(tmp.vessgain.mul(gs))
    }

    tmp.pass = Math.max(0,tmp.pass-1)

    player.time += dt
    player.sn.time = player.sn.time.add(E(1).mul(dt))
}

function getPlayerData() {
    let s = {
        essence: E(0),
        rankstab: "main",
        rankrewardstab: "rank",
        ranks: {
            rank: E(0),
            tier: E(0),
            asc: E(0),
        },
        autoranks: {
            rank: false,
            tier: false,
            asc: false
        },
        pres: {
            pts: E(0),
            unl: false
        },
        eclipse: {
            active: false,
            score: E(0),
            shards: E(0),
            unl: false
        },
        abyss: {
            active: false,
            unl: false,
            essence: E(0),
            oddities: E(0),
            power: E(0),
            score: E(0)
        },
        sn: {
            unl: false,
            stars: E(0),
            amt: E(0),
            time: E(0),
        },
        inf: {},
        options: {
            font: 'Verdana',
            notation: 'standard',
            massDis: 0,
            nav_hide: [],
            sci_start: E(12),
            notation_count: 0,
            savenotif: true
        },
       
        offline: {
            active: true,
            current: Date.now(),
            time: 0,
        },
        misc: {
            hEss: E(0),
            hPres: E(0),
            hrank: E(0),
            htier: E(0),
            hasc: E(0)
        },
       
        time: 0,
        chals: {
            active: 0,
            chosen: 0,
            unl: false,
            comps: {}
        },
        tab : "MainTab",
        tabterm: {
            open: false
        },
        buyables: {},
    }
   
    return s
}

function wipe(reload=false) {
    if (reload) {
        wipe()
        save()
        location.reload()
    }
    else player = getPlayerData()
}

function loadPlayer(load) {
    const DATA = getPlayerData()
    player = deepNaN(load, DATA)
    player = deepUndefinedAndDecimal(player, DATA)
   
}

function clonePlayer(obj,data) {
    let unique = {}

    for (let k in obj) {
        if (data[k] == null || data[k] == undefined) continue
        unique[k] = Object.getPrototypeOf(data[k]).constructor.name == "Decimal"
        ? E(obj[k])
        : typeof obj[k] == 'object'
        ? clonePlayer(obj[k],data[k])
        : obj[k]
    }

    return unique
}

function deepNaN(obj, data) {
    for (let k in obj) {
        if (typeof obj[k] == 'string') {
            if (data[k] == null || data[k] == undefined ? false : Object.getPrototypeOf(data[k]).constructor.name == "Decimal") if (isNaN(E(obj[k]).mag)) obj[k] = data[k]
        } else {
            if (typeof obj[k] != 'object' && isNaN(obj[k])) obj[k] = data[k]
            if (typeof obj[k] == 'object' && data[k] && obj[k] != null) obj[k] = deepNaN(obj[k], data[k])
        }
    }
    return obj
}

function deepUndefinedAndDecimal(obj, data) {
    if (obj == null) return data
    for (let k in data) {
        if (obj[k] === null) continue
        if (obj[k] === undefined) obj[k] = data[k]
        else {
            if (Object.getPrototypeOf(data[k]).constructor.name == "Decimal") obj[k] = E(obj[k])
            else if (typeof obj[k] == 'object') deepUndefinedAndDecimal(obj[k], data[k])
        }
    }
    return obj
}



function save(){
    let str = btoa(JSON.stringify(player))
    if (findNaN(str, true)) return
    if (localStorage.getItem("testSave") == '') wipe()
    localStorage.setItem("testSave",str)
    tmp.prevSave = localStorage.getItem("testSave")
    if (player.options.savenotif) addNotify('Game saved.', 3)
   
}

function exporty() {
    let str = btoa(JSON.stringify(player))
    if (findNaN(str, true)) {
        addNotify("Error Exporting, because it got NaNed")
        return
    }
    save();
    let file = new Blob([str], {type: "text/plain"})
    window.URL = window.URL || window.webkitURL;
    let a = document.createElement("a")
    a.href = window.URL.createObjectURL(file)
    a.download = "Incremental Mass Rewritten Save - "+new Date().toGMTString()+".txt"
    a.click()
}

function export_copy() {
    let str = btoa(JSON.stringify(player))
    if (findNaN(str, true)) {
        addNotify("Error Exporting, because it got NaNed")
        return
    }

    let copyText = document.getElementById('copy')
    copyText.value = str
    copyText.style.visibility = "visible"
    copyText.select();
    document.execCommand("copy");
    copyText.style.visibility = "hidden"
    addNotify("Copied to Clipboard")
}

function importy() {
    createPrompt("Paste in your save WARNING: WILL OVERWRITE YOUR CURRENT SAVE",'import',loadgame=>{
        let st = ""
        if (loadgame.length <= 100) st = convertStringIntoAGY(loadgame)
        //if (ssf[2](loadgame)) return
        if (st == 'OJY$VFe*b') {
            addNotify('monke<br><img style="width: 100%; height: 100%" src="https://i.kym-cdn.com/photos/images/original/001/132/314/cbc.jpg">')
            return
        }
        else if (st == 'p4H)pb{v2y5?g!') {
            addNotify('2+2=5<br><img src="https://cdn2.penguin.com.au/authors/400/106175au.jpg">')
            return
        }
        else if (st == 'L5{W*oI.NhA-lE)C1#e') {
            addNotify('<img src="https://steamuserimages-a.akamaihd.net/ugc/83721257582613769/22687C6536A50ADB3489A721A264E0EF506A89B3/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false">',6)
            return
        }
        else if (st == 'a+F4gro<?/Sd') {
            addNotify('YOU ARE CURSED FOREVER!!!')
            player.options.font = 'Wingding'
            return
        }
        if (loadgame != null) {
            let keep = player
            try {
                setTimeout(()=>{
                    if (findNaN(loadgame, true)) {
                        addNotify("Error Importing, because it got NaNed")
                        return
                    }
                    load(loadgame)
                    save()
                    resetTemp()
                    loadGame(false)
                    location.reload()
                }, 200)
            } catch (error) {
                addNotify("Error Importing")
                player = keep
            }
        }
    })
}

function load(x){
    if(typeof x == "string" & x != ''){
        loadPlayer(JSON.parse(atob(x)))
    } else {
        wipe()
    }
}



function loadGame(start=true, gotNaN=false) {
    if (!gotNaN) tmp.prevSave = localStorage.getItem("testSave")
    wipe()
    load(tmp.prevSave)
    
    if (start) {
        updateTemp()
        setupHTML()

        setInterval(save,15000)


        updateHTML()

       

       
        }
       
        let t = (Date.now() - player.offline.current)/1000
        if (player.offline.active && t > 60) simulateTime(t)

       
        document.onmousemove = e => {
            tmp.cx = e.clientX
            tmp.cy = e.clientY
        }
       
        setInterval(loop, 1000/FPS)
       

        setTimeout(()=>{
            tmp.start = true
        },2000)

       
}

function checkNaN() {

    let naned = findNaN(player)

    if (naned) {
        console.log(naned)

       

        resetTemp()

        tmp.start = true

        loadGame(false, true)

        for (let x = 0; x < 5; x++) updateTemp()
    }
}

function isNaNed(val) {
    return typeof val == "number" ? isNaN(val) : Object.getPrototypeOf(val).constructor.name == "Decimal" ? isNaN(val.mag) : false
}

function findNaN(obj, str=false, data=getPlayerData(), node='player') {
    if (str ? typeof obj == "string" : false) obj = JSON.parse(atob(obj))
    for (let k in obj) {
        if (typeof obj[k] == "number") if (isNaNed(obj[k])) return node+'.'+k
        if (str) {
            if (typeof obj[k] == "string") if (data[k] == null || data[k] == undefined ? false : Object.getPrototypeOf(data[k]).constructor.name == "Decimal") if (isNaN(E(obj[k]).mag)) return node+'.'+k
        } else {
            if (obj[k] == null || obj[k] == undefined ? false : Object.getPrototypeOf(obj[k]).constructor.name == "Decimal") if (isNaN(E(obj[k]).mag)) return node+'.'+k
        }
        if (typeof obj[k] == "object") {
            let node2 = findNaN(obj[k], str, data[k], (node?node+'.':'')+k)
            if (node2) return node2
        }
    }

    return false
}

Decimal.prototype.addTP = function (val) {
    var e = this.clone()

    return Decimal.tetrate(10, e.slog(10).add(val))
}



function simulateTime(sec) {
    let ticks = sec * FPS

    let bonusDiff = 0

    let player_before = clonePlayer(player,getPlayerData());

    if (ticks > 1000) {
        bonusDiff = (ticks - 1000) / FPS / 1000
        ticks = 1000
    }
    for (let i=0; i<ticks; i++) {
        updateTemp()
        calc(1/FPS+bonusDiff)
    }

    let h = `You were gone offline for <b>${formatTime(sec)}</b>.<br>`

    let s = {
        essence: player.essence.max(1).div(player_before.essence.max(1)).log10(),
       
    }

    let s2 = {
        essence: player.essence.max(1).log10().max(1).div(player_before.essence.max(1).log10().max(1)).log10(),
        prespts: player.pres.pts.max(1).log10().max(1).div(player_before.pres.pts.max(1).log10().max(1)).log10()
    }

   

    if (s2.essence.gte(10)) h += `<br>Your Essence's exponent<sup>2</sup> is increased by <b>${s2.essence.format(2)}</b>.`
    else if (s.essence.gte(10)) h += `<br>Your Essence's exponent is increased by <b>${s.essence.format(2)}</b>.`

   

    createPopup(h,'offline')
}




