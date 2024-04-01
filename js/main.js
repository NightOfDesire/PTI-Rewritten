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