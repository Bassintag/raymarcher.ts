const WIDTH = 1920;
const HEIGHT = 1080;

/*const sceneData = {
    type: 'smooth-combine',
    amount: .65,
    left: {
        type: 'transform',
        child: {
            type: 'intersect',
            children: [{
                type: 'sphere',
                radius: 0.65,
                material: {
                    type: 'normal',
                    color: [1, 1, 1, 1],
                },
            }, {
                type: 'cube',
                size: {x: .5, y: .5, z: .5},
                material: {
                    type: 'normal',
                    color: [1, 1, 1, 1],
                },
            }]
        }
    },
    right: {
        type: 'transform',
        position: {x: 1, y: -.2, z: -1},
        child: {
            type: 'substract',
            left: {
                type: 'cube',
                size: {x: 2, y: .1, z: 2},
                material: {
                    type: 'normal',
                    size: {x: .1, y: .1, z: .1},
                    left: [1, 1, 1, 1],
                    right: [0, 0, 0, 1],
                },
            },
            right: {
                type: 'sphere',
                radius: .5,
                material: {
                    type: 'normal',
                },
            },
        },
    },
};*/
/*
const sceneData = {
    type: 'smooth-combine',
    amount: 1.2,
    left: {
        type: 'plane',
        material: {
            type: 'checkerboard',
            left: [0, 0, 0, 1],
            right: [1, 1, 1, 1],
        }
    },
    right: {
        type: 'transform',
        position: {x: 0, y: 0, z: 1},
        child: {
            type: 'repeat',
            period: {x: 4, y: 4, z: 4},
            child: {
                type: 'sphere',
                radius: 1,
                size: {x: .5, y: .5, z: .5},
                material: {
                    type: 'color',
                    color: [1, 1, 1, 1],
                    smoothness: .95,
                    roughness: .005,
                }
            }
        },
    },
};
*/

const resolution = {
    x: WIDTH,
    y: HEIGHT,
};

const sceneData = {
    scene: {
        type: 'sphere',
        size: {x: .5, y: .5, z: .5},
        radius: .5,
        width: .2,
        material: 'mirror',
    },
    lights: [{
        type: 'point',
        position: {x: 1, y: 1, z: 0},
        radius: 100,
        color: [1, 1, 1, 1]
    }],
    materials: {
        'normal': {
            type: 'normal',
        },
        'mirror': {
            type: 'color',
            color: [1, 0, 0, 1],
            smoothness: 0,
            roughness: 0.0,
        },
        'checkerboard': {
            type: 'checkerboard',
            left: [0, 0, 0, 1],
            right: [1, 1, 1, 1],
        },
    },
    resolution,
    limitations: {
        epsilon: 0.0001,
        far: 3,
        maxIterations: 10000,
        descentFactor: 1,
    },
    camera: {
        position: {x: 1, y: 0, z: 1},
        target: {x: 0, y: 0, z: 0},
    },
};

function subDivide(rect, recursions = 4) {
    if (recursions <= 0) {
        return [rect];
    }
    const horizontal = rect.w < rect.h;
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

const canvas = document.getElementById('render');
canvas.width = WIDTH;
canvas.height = HEIGHT;

const context = canvas.getContext('2d');

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

shuffleArray(rects);

for (const rect of rects) {
    const worker = new Worker('worker.js');
    worker.onmessage = (e) => {
        if (e.data.done) {
            worker.terminate();
        }
        const imageData = context.getImageData(rect.x, rect.y, rect.w, rect.h);
        for (let x = 0; x < rect.w; x += 1) {
            const row = e.data.data[x];
            if (row) {
                for (let y = 0; y < rect.h; y += 1) {
                    const color = row[y];
                    const index = (x + y * imageData.width) * 4;
                    for (let i = 0; i < color.length; i += 1) {
                        imageData.data[index + i] = Math.floor(color[i] * 255);
                    }
                }
            }
        }
        context.putImageData(imageData, rect.x, rect.y, 0, 0, rect.w, rect.h);
    }
    worker.postMessage({
        part: rect,
        sceneData,
    });
}
