import {IDeserializer, IIntersectibleDeserializer} from './deserializer';
import {IRaymarcher, Raymarcher} from '../raymarcher';
import {ISceneData, SceneDeserializer} from './scene';
import {ILightData, LightsDeserializer} from './light';
import {IVector2, IVector3} from '../utils/vector';
import {IColor} from '../utils';
import {ILimitations} from '../camera';

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
}

export interface IRaymarcherDeserializer extends IDeserializer<IRaymarcher> {

}

export class RaymarcherDeserializer implements IRaymarcherDeserializer {

    private readonly sceneDeserializer: IIntersectibleDeserializer;

    constructor() {
        this.sceneDeserializer = new SceneDeserializer();
    }

    deserialize(data: IRaymarcherData): IRaymarcher {
        const scene = this.sceneDeserializer.deserialize(data.scene);
        const lightsDeserializer = new LightsDeserializer(scene);
        const lights = lightsDeserializer.deserialize(data.lights);
        return new Raymarcher({
            resolution: data.resolution,
            clear: data.clear,
            scene,
            lights,
            cameraPosition: data.camera.position,
            cameraTarget: data.camera.target,
            maxIterations: data.limitations?.maxIterations,
            far: data.limitations?.far,
            epsilon: data.limitations?.epsilon,
        });
    }
}
