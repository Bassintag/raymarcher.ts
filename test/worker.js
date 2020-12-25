importScripts('../dist/index.js');

onmessage = (m) => {
    const resolution = m.data.resolution;
    const sceneData = m.data.scene;
    const lightsData = m.data.lights;
    const part = m.data.part;
    const scene = new raymarcher.SceneDeserializer().deserialize(sceneData);
    const lights = new raymarcher.LightsDeserializer(scene).deserialize(lightsData);
    const marcher = new raymarcher.Raymarcher({
        resolution,
        scene,
        lights,
    });
    const x1 = part.x + part.w;
    const y1 = part.y + part.h;
    let response = [];
    for (let x = part.x; x < x1; x += 1) {
        const row = [];
        for (let y = part.y; y < y1; y += 1) {
            row.push(marcher.renderPixel(x, y));
        }
        response.push(row);
    }
    postMessage(response);
};
