import {IIntersectibleDeserializer} from '../deserializer';
import {IIntersectible, Sphere} from '../../scene/intersectible';

export interface ISphereData {
    radius?: number;
}

export class SphereDeserializer implements IIntersectibleDeserializer {
    deserialize(data: ISphereData): IIntersectible {
        return new Sphere(data.radius || 1);
    }
}
