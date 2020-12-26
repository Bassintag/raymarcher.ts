importScripts('../dist/index.js');


onmessage = (m) => {
    const part = m.data.part;
    const marcher = new raymarcher.RaymarcherDeserializer().deserialize(m.data.sceneData);
    const x1 = part.x + part.w;
    const y1 = part.y + part.h;
    let response = {
        data: [],
        done: false,
    };

    for (let x = part.x; x < x1; x += 1) {
        const row = [];
        for (let y = part.y; y < y1; y += 1) {
            row.push(marcher.renderPixel(x, y));
        }
        response.data.push(row);
        if (x % 8 === 0) {
            postMessage(response);
        }
    }
    response.done = true;
    postMessage(response);
};
