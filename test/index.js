const WIDTH = 1920 / 4;
const HEIGHT = 1080 / 4;

const sceneData = {
    type: 'smooth-combine',
    amount: .7,
    left: {
        type: 'intersect',
        children: [{
            type: 'sphere',
            radius: 0.65,
        }, {
            type: 'cube',
            size: {x: .5, y: .5, z: .5},
        }]
    },
    right: {
        type: 'transform',
        position: {x: 0, y: 0 - .2, z: -1},
        child: {
            type: 'substract',
            left: {
                type: 'cube',
                size: {x: 2, y: .1, z: 2},
            },
            right: {
                type: 'sphere',
                radius: .5,
            },
        },
    },
};

const lightsData = [{
    type: 'point',
    position: {
        x: .2,
        y: 1.5,
        z: 1,
    },
    color: raymarcher.Color.CYAN,
    radius: 2,
}, {
    type: 'point',
    position: {
        x: 1,
        y: 1.5,
        z: .5,
    },
    scale: {
        x: 1,
        y: 1,
        z: 1,
    },
    color: raymarcher.Color.YELLOW,
    radius: 2,
}, {
    type: 'global',
    color: [1, 1, 1, 0.05]
}];

const resolution = {
    x: WIDTH,
    y: HEIGHT,
};

function subDivide(rect, recursions = 4) {
    if (recursions <= 0) {
        return [rect];
    }
    const horizontal = rect.w < rect.h
    if (horizontal) {
        const hh = Math.floor(rect.h / 2);
        return [
            ...subDivide({x: rect.x, y: rect.y, w: rect.w, h: hh}, recursions - 1),
            ...subDivide({x: rect.x, y: rect.y + hh, w: rect.w, h: rect.h - hh}, recursions - 1),
        ];
    } else {
        const hw = Math.floor(rect.w / 2);
        return [
            ...subDivide({x: rect.x, y: rect.y, w: hw, h: rect.h}, recursions - 1),
            ...subDivide({x: rect.x + hw, y: rect.y, w: rect.w - hw, h: rect.h}, recursions - 1),
        ];
    }
}

const rects = subDivide({
    x: 0,
    y: 0,
    w: resolution.x,
    h: resolution.y,
}, 5);

console.log(rects);

const canvas = document.getElementById('render');
canvas.width = WIDTH;
canvas.height = HEIGHT;

const context = canvas.getContext('2d');

for (const rect of rects) {
    const worker = new Worker('worker.js?adzdk');
    worker.onmessage = (e) => {
        worker.terminate();
        const imageData = context.getImageData(rect.x, rect.y, rect.w, rect.h);
        for (let x = 0; x < rect.w; x += 1) {
            for (let y = 0; y < rect.h; y += 1) {
                const color = e.data[x][y];
                const index = (x + y * imageData.width) * 4;
                for (let i = 0; i < color.length; i += 1) {
                    imageData.data[index + i] = Math.floor(color[i] * 255);
                }
            }
        }
        context.putImageData(imageData, rect.x, rect.y, 0, 0, rect.w, rect.h);
    }
    worker.postMessage({
        resolution,
        scene: sceneData,
        lights: lightsData,
        part: rect,
    });
}
