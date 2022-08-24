
const fs = require('fs');
const path = require('path');

const SETTINGS = require('./../src/animation_setting');
const TARGET_PATH = path.resolve(__dirname, '..', 'src', 'assets', 'fighter.json');

const TILE_SIZE = 64;

const json = {
    frames: {},
    meta: {
        version: "1.0",
        image: "fighter.png",
        format: "RGBA8888",
        size: { "w": 1024, "h": 1024 },
        scale: "1"
    }
}

for (let key in SETTINGS) {
    for (let frame = 0; frame <= SETTINGS[key].count; frame++) {
        const _frame = (SETTINGS[key].startAt || 0) + frame
        json.frames[`${key}-${frame}.png`] = {
            frame: { x: TILE_SIZE * _frame, y: TILE_SIZE * SETTINGS[key].row, w: TILE_SIZE, h: TILE_SIZE },
            rotated: false,
            trimmed: false,
            // spriteSourceSize: { x: TILE_SIZE * _frame, y: TILE_SIZE * SETTINGS[key].row, w: TILE_SIZE, h: TILE_SIZE },
            // sourceSize: { w: TILE_SIZE, h: TILE_SIZE }
        }
    }
}

fs.writeFileSync(TARGET_PATH, JSON.stringify(json));