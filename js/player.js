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
    let constname = (typeof player[data] == "object" ? (Object.getPrototypeOf(player[data]).constructor.name) : null)
    if (typeof player[data] == "object" && constname == "Decimal") {
        player[data] = E(0)
    } else if (typeof player[data] == "object" && constname != "Decimal") {
        for (let x in player[data]) {
            if (typeof x == "object" && Object.getPrototypeOf(x).constructor.name == "Decimal") {
                player[data][x] = E(0)
            } else if (typeof x == "object" && Object.getPrototypeOf(x).constructor.name != "Decimal") {
                for (let y in x) {
                    if (typeof y == "object" && Object.getPrototypeOf(y).constructor.name == "Decimal") {
                        player[data][x][y] = E(0)
                    } else if (typeof y == "number") {
                        player[data][x][y] = 0
                    } else if (typeof y == "boolean") {
                        player[data][x][y] = false
                    } else {
                        player[data][x][y] = ""
                    }
                }
            } else if (typeof x == "boolean") {
                player[data][x] = false
            } else if (typeof x == "number") {
                player[data][x] = 0
            } else {
                player[data][x] = ""
            } 
        }
    } else if (typeof player[data] == "number") {
        player[data] = 0
    } else if (typeof player[data] == "boolean") {
        player[data] = false
    } else {
        player[data] = ""
    }
}