import {IIntersectibleDeserializer, IMaterialDeserializer} from '../deserializer';
import {IIntersectible, Sphere} from '../../scene/intersectible';
import {ColorMaterial} from '../../material';
import {Color} from '../../utils';
import {IMaterialData} from '../material/material-deserializer';

export interface ISphereData {
    radius?: number;

    material?: IMaterialData;
}

export class SphereDeserializer implements IIntersectibleDeserializer {
    constructor(
        private readonly materialDeserializer: IMaterialDeserializer,
    ) {
    }

    deserialize(data: ISphereData): IIntersectible {
        return new Sphere(this.materialDeserializer.deserialize(data.material), data.radius || 1);
    }
}
