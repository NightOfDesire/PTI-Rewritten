const SOFTCAPS = {
    points: {
        one() {
            let s = E(1e12)
            let p = E(0.667)
            return {start: s, power: p}
        }
    }
}

const SOFTCAP_TEXT = {
    pt_1: `Due to excessive points, starting at ${format(SOFTCAPS.points.one().start)}, points are softcapped!`
}

