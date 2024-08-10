

function updateUnlocks() {
    player.void.unl = player.pts.gte(1e48)
    player.sn.unl = (player.void.essence.gte(1e15) && player.pts.gte(1e153))
}