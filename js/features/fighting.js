function getFightingSave() {
    const s = {
        stage: E(0),
        bestStage: E(0),
        souls: E(0),
        fight_mult: E(0),
        hp: FIGHTING.max_health,
        dmg: FIGHTING.offense
        


    }

    return s
}

const FIGHTING = {
    get offense() {
        let x = E(1)

        return x
    },
    get max_health() {
        let x = E(100)

        return x
    },
    get regen() {
        let r = E(1)
        .mul(E(2.25).pow(player.fighting.stage))
        return r.floor()
    },
    enemy: {
        get max_hp() {
            let stage = player.fighting.stage
            let x = E(100).mul(Decimal.pow(8.5, stage.scale(50, 1.35, 0)))
        },
        get offense() {
            let stage = player.fighting.stage
            let x = E(5).mul(Decimal.pow(2.5, stage.scale(65, 1.3, 0)))
        },
        calc_soul_gain(s) {
            let x = Decimal.pow(1.4, s).mul(s.add(1))
            
            return x.floor()
        },
        get soul_gain() { return this.calc_soul_gain(player.fighting.stage) }
    },


}
var enemy_health = EINF
var attack_time = E(0)


function calcFighting(dt) {
    if (!hasElement(7)) return;

    const tmf = tmp.fighting

    player.fighting.hp = player.fighting.hp.add(tmf.regen.mul(dt))

    enemy_health = enemy_health.min(tmf.enemy_max_health)
    
    let at = FIGHTING.offense
    if (player.fighting.hp.gte(FIGHTING.enemy.offense)) at = attack_time.add(tmf.attack_speed*dt)
    attack_time = at
    if (at.gte(1)) {
        let w = at.floor()
        player.fighting.hp = player.fighting.hp.sub(FIGHTING.enemy.offense).max(0)
        enemy_health = enemy_health.sub(tmf.offense.mul(w)).max(0)
        if (enemy_health.lte(0)) {
            let s = player.fighting.stage.add(1)
            player.fighting.stage = s
            player.fighting.soul = player.fighting.soul.add(FIGHTING.enemy.calc_soul_gain(s.sub(1)))
            setupFighting()
        }
        if (player.fighting.hp.lt(1)) {
            setupFighting()
            player.fighting.hp = player.fighting.hp.max(FIGHTING.max_health)
        }
        attack_time = at.sub(w)
    }

    player.fighting.bestStage = player.fighting.bestStage.max(player.fighting.stage)
}

function setupFighting() {
    updateFightingTemp()
    enemy_health = tmp.sol.enemy_max_health
}

function updateFightingTemp() {
    if (!tmp.fighting) tmp.fighting = {}
    const tmf = tmp.fighting


    tmf.enemy_max_health = FIGHTING.enemy.max_health
    tmf.soul_gain = FIGHTING.enemy.soul_gain
    tmf.offense = FIGHTING.offense
    tmf.regen = FIGHTING.regen
}