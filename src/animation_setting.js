
 const ANIMATION_SETTINGS = {
    idle: {
        row: 0,
        count: 3
    },
    walk: {
        row: 1,
        count: 7
    },
    jump: {
        row: 2,
        count: 7
    },
    spin: {
        row: 3,
        count: 9
    },
    dead: {
        row: 4,
        count: 8
    },
    power_shot: {
        row: 5,
        count: 6
    },
    fast_shot: {
        row: 6,
        count: 5
    },
    flying_kick: {
        row: 7,
        count: 7
    },
    shoryuken: {
        row: 8,
        count: 12
    },
    one_two_combo: {
        row: 9,
        count: 9
    },
    low_kick: {
        row: 10,
        count: 5,
    },
    mid_kick: {
        row: 10,
        count: 5,
        startAt: 6 // same line like low kick, start at tile 6
    },
    high_kick: {
        row: 11,
        count: 5
    },
    axe_kick: {
        row: 12,
        count: 7
    },
    two_side_attack: {
        row: 13,
        count: 7
    },
    round_kick: {
        row: 14,
        count: 7
    },
    uppercut: {
        row: 15,
        count: 5
    }
}

module.exports = ANIMATION_SETTINGS