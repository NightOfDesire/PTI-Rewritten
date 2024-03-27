var diff = 0;
var date = Date.now();
var player;

function loop() {
    diff = Date.now()-date;
    //ssf[1]()
    updateHTML()
    updateTemp()
    calc(diff/1000);
    date = Date.now();
    player.offline.current = date
}

function turnOffline() {
    player.offline.active = !player.offline.active
}
