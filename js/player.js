function getPlayerData() {
    let s = {
        pts: E(0),
        options: {
            font: 'Verdana',
            nota: "st",
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
        time: 0,
        
        devoptions: {
            speed: E(1)
        },
        build: {},
        bestPts: E(0),
    }

    for (let x in BUILDING_DATA) s.build[x] = {
        amt: E(0),
        auto: false
    }
    
    return s
}