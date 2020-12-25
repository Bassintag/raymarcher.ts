import {IDeserializer, ILightDeserializer} from '../deserializer';
import {ILight} from '../../light';
import {ILimitations, Limitations} from '../../camera';
import {PointLightDeserializer} from './point-light-deserializer';
import {IIntersectible} from '../../scene/intersectible';
import {GlobalLightDeserializer} from './global-light-deserializer';

export interface ILightData {
    type: string;
}

export class LightsDeserializer implements IDeserializer<ILight[]> {

    private readonly deserializers: { readonly [key: string]: ILightDeserializer };

    constructor(
        private readonly scene: IIntersectible,
        private readonly limitations: ILimitations = Limitations.DEFAULT,
        deserializers: { readonly [key: string]: ILightDeserializer }
    ) {
        if (deserializers == null) {
            deserializers = {
                'point': new PointLightDeserializer(scene, limitations),
                'global': new GlobalLightDeserializer(),
            };
        }
        this.deserializers = deserializers;
    }

    deserialize(data: ILightData[]): ILight[] {
        return data.map((d) => {
            const deserializer = this.deserializers[d.type];
            if (deserializer == null) {
                throw new Error('Invalid Object Type ' + d.type);
            }
            return deserializer.deserialize(d);
        });
    }
}
