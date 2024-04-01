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

            return x
        }
    },
    pres: {
        PPtEffect() {
            let eff = player.prestige.pts.pow(1.25).div(2).add(1)

            return eff
        }
    }
}




const POPUP_GROUPS = {
    help: {
        html: `
        1 minute = 60 seconds<br>
        1 hour = 60 minutes<br>
        1 day = 24hrs<br>
        1 yr = 365d<br>
        1 Stellar Year = ${format(1e6)} yr<br>
        1 Eon = ${format(1e9)} yr<br>
        1 Eclipsal = ${format("ee3")} yr (logarithmic)<br>
        `
    }
}