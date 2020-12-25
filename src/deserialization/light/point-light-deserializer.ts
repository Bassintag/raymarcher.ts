import {IDeserializer, ILightDeserializer} from '../deserializer';
import {ILight, PointLight} from '../../light';
import {IVector3Data, Vector3Deserializer} from '../vector3-deserializer';
import {IVector3} from '../../utils/vector';
import {IIntersectible} from '../../scene/intersectible';
import {IColor} from '../../utils';
import {ColorDeserializer, IColorData} from '../color-deserializer';
import {ILimitations, Limitations} from '../../camera';

export interface IPointLightData {

    color?: IColorData;

    position?: IVector3Data;

    radius?: number;
}

export class PointLightDeserializer implements ILightDeserializer {

    private readonly vector3Deserializer: IDeserializer<IVector3>;
    private readonly colorDeserializer: IDeserializer<IColor>;

    constructor(
        private readonly scene: IIntersectible,
        private readonly limitations: ILimitations = Limitations.DEFAULT,
    ) {
        this.vector3Deserializer = new Vector3Deserializer();
        this.colorDeserializer = new ColorDeserializer();
    }


    deserialize(data: IPointLightData): ILight {
        return new PointLight(
            this.scene,
            this.limitations,
            this.vector3Deserializer.deserialize(data.position || {}),
            this.colorDeserializer.deserialize(data.color || []),
            data.radius || 1,
        );
    }
}
