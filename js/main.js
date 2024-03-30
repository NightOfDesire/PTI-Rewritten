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

            return x
        }
    }
}
