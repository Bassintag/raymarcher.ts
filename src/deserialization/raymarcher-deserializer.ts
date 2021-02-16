import {IDeserializer} from './deserializer';
import {IRaymarcher, Raymarcher} from '../raymarcher';
import {ISceneData, SceneDeserializer} from './scene';
import {ILightData, LightsDeserializer} from './light';
import {IVector2, IVector3} from '../utils/vector';
import {IColor} from '../utils';
import {ILimitations, Limitations} from '../camera';
import {IMaterialData, MaterialDeserializer} from './material/material-deserializer';
import {MaterialRegisty} from './material/material-registy';
import {IMaterial} from '../material';
import DEFAULT_MAX_ITERATIONS = Limitations.DEFAULT_MAX_ITERATIONS;
import DEFAULT_DESCENT_FACTOR = Limitations.DEFAULT_DESCENT_FACTOR;
import DEFAULT_FAR = Limitations.DEFAULT_FAR;
import DEFAULT_EPSILON = Limitations.DEFAULT_EPSILON;

export interface ICameraData {

    readonly position: IVector3;

    readonly target: IVector3;
}

export interface IRaymarcherData {

    readonly resolution: IVector2;

    readonly clear?: IColor;

    readonly scene: ISceneData;

    readonly lights: ILightData[];

    readonly camera: ICameraData;

    readonly limitations?: ILimitations;

    readonly materials?: { [key: string]: IMaterialData };
}

export interface IRaymarcherDeserializer extends IDeserializer<IRaymarcher> {

}

export class RaymarcherDeserializer implements IRaymarcherDeserializer {

    constructor() {
    }

    deserialize(data: IRaymarcherData): IRaymarcher {
        const materialDeserializer = new MaterialDeserializer();
        const materials: { [key: string]: IMaterial } = {};
        const materialData = data.materials || {};
        for (const key of Object.keys(materialData)) {
            materials[key] = materialDeserializer.deserialize(materialData[key]);
        }
        const materialRegistry = new MaterialRegisty(materials, materialDeserializer);
        const sceneDeserializer = new SceneDeserializer(materialRegistry);
        const scene = sceneDeserializer.deserialize(data.scene);
        const limitations = {
            maxIterations: data.limitations?.maxIterations || DEFAULT_MAX_ITERATIONS,
            descentFactor: data.limitations?.descentFactor || DEFAULT_DESCENT_FACTOR,
            far: data.limitations?.far || DEFAULT_FAR,
            epsilon: data.limitations?.epsilon || DEFAULT_EPSILON,
        };
        const lightsDeserializer = new LightsDeserializer(scene, limitations);
        const lights = lightsDeserializer.deserialize(data.lights);
        return new Raymarcher({
            resolution: data.resolution,
            clear: data.clear,
            scene,
            lights,
            cameraPosition: data.camera.position,
            cameraTarget: data.camera.target,
            ...limitations,
        });
    }
}
