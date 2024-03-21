function setupModsHTML() {
    let table = tmp.el.mods_table
    
}

function updateModsHTML() {

}

const MODS = {
    active(mod) {
        return player.MODIFIERS.chosen == mod
    },
    enter(mod) {
        player.MODIFIERS.chosen = mod
    },
    getModData(mod) {

    }
}