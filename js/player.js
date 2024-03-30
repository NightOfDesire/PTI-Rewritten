function getBaseData() {
    let s = {
        pts: E(0),
        prestige: {
            pts: E(0),
            unl: false
        },
        options: {
            font: 'Verdana',
            nota: "st",
            massDis: 0,
            nav_hide: [],
            sci_start: E(1e12),
            notation_count: 0,
            savenotif: true
        },
       
        offline: {
            active: true,
            current: Date.now(),
            time: 0,
        },
        time: 0,
        devoptions: {
            speed: E(1)
        },
        build: {},
        bestPts: E(0),
        tab: 0,
        stab: [],
        confirms: {
            prestige: true
        }
    }

    for (let x in BUILDING_DATA) s.build[x] = {
        amt: E(0),
        auto: false
    }
    
    return s
}

function reset(data) {
    let data2 = player[data]
    let constname = Object.getPrototypeOf(data2).constructor.name
    if (typeof data2 == "object" && constname == "Decimal") {
        data2 = E(0)
    } else if (typeof data2 == "object" && constname != "Decimal") {
        for (let x in data2) {
            if (typeof x == "object" && Object.getPrototypeOf(x).constructor.name == "Decimal") {
                x = E(0)
            } else if (typeof x == "boolean") {
                x = false
            } else if (typeof x == "number") {
                x = 0
            } else {
                x = ""
            }
        }
    } else if (typeof data2 == "number") {
        data2 = 0
    } else if (typeof data2 == "boolean") {
        data2 = false
    } else {
        data2 = ""
    }
}