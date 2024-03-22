let notations = ['standard','scientific','old_sc','eng','mixed_sc','omega','layer']
let fullNotas = {
    old_sc: 'Old Scientific',
    omega: 'Omega',
    eng: 'Engineering',
    layer: 'Prestige Layers',
    mixed_sc: 'Mixed Scientific'
}
function updateSettingsHTML() {
    tmp.el.ptime.setHTML(`Time played (total): ${formatTime(player.time)}`)
    tmp.el.settingsnota.setHTML(`Notation: ${fullNotas[player.options.notation]||player.options.notation}`)
}
function sci_start_setting() {
    createPrompt('Enter scientific start [INPUT GETS POWERED BY 10 ONCE YOU CONFIRM]',null,start=>{
        player.options.sci_start = E(start).pow(10)
    })
}

function notationClick() {
    let count = 0

    count++
    if (count >= notations.length) {
        count = 0
    }
    player.options.notation = notations[count]
}