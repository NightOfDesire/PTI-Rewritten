const notations = {
    list: ['standard','scientific','old_sc','eng','mixed_sc','omega','layer'],
}
let fullNotas = {
    old_sc: 'Old Scientific',
    omega: 'Omega',
    eng: 'Engineering',
    layer: 'Prestige Layers',
    mixed_sc: 'Mixed Scientific'
}
function updateSettingsHTML() {
    if (player.options.notation_count >= notations["list"].length) {
        player.options.notation_count = 0
    }
    tmp.el.ptime.setHTML(`Time played (total): ${formatTime(player.time)}`)
    tmp.el.settingsnota.setHTML(`Notation: ${fullNotas[player.options.notation] ? fullNotas[player.options.notation] : player.options.notation}`)
    tmp.el.savenotif.setHTML(player.options.savenotif ? 'Save notification enabled.' : `Save notification disabled.`)
}
function sci_start_setting() {
    createPrompt('Enter scientific start [INPUT GETS POWERED BY 10 ONCE YOU CONFIRM]',null,start=>{
        player.options.sci_start = E(start).pow(10)
    })
}

function notationClick() {
    player.options.notation_count++
}