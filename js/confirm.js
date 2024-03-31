const CONFIRM_FUNCTIONS = {
    prestige() {
            if (tmp.prestige.can) {
                player.prestige.pts = player.prestige.pts.add(tmp.prestige.gain)
                PRESTIGE.reset()
            }
        }
}
const CONFIRM_MESSAGES = {
    prestige: "Are you sure you want to restart for Pres Pts?"
}
function newConfirm(type) {
    if (player.confirms[type] == true) {
    createConfirm(CONFIRM_MESSAGES[type], type, CONFIRM_FUNCTIONS[type])
    } else {
        CONFIRM_FUNCTIONS[type]()
    }
}