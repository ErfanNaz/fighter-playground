
const fs = require('fs');
const path = require('path');

const settings = {
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
    }
}

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

for (let key in settings) {
    for (let frame = 0; frame <= settings[key].count; frame++) {
        json.frames[`${key}-${frame}.png`] = {
            frame: { x: 64 * frame, y: 64 * settings[key].row, w: 64, h: 64 },
            rotated: false,
            trimmed: false,
            spriteSourceSize: { x: 64 * frame, y: 64 * settings[key].row, w: 64, h: 64 },
            sourceSize: { w: 64, h: 64 }
        }
    }
}

console.log()

const targetPath = path.resolve(__dirname, '..', 'src', 'assets', 'fighter.json');

// fs.writeJson(path.resolve(__dirname, 'src', 'assets', 'foobar.json'))
fs.writeFileSync(targetPath, JSON.stringify(json));