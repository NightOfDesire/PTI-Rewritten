const CONFIRM_FUNCTIONS = {
    prestige() {
        if (tmp.prestige.can) {
            PRESTIGE.reset()
        }
    }
}
const CONFIRM_MESSAGES = {
    prestige: "Are you sure you want to restart for Pres Pts?"
}
function newConfirm(type) {
    createConfirm(CONFIRM_MESSAGES[type], CONFIRM_FUNCTIONS[type])
}