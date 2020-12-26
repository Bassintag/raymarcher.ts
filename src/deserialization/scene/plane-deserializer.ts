import {IIntersectibleDeserializer, IMaterialDeserializer} from '../deserializer';
import {IIntersectible, Plane} from '../../scene/intersectible';
import {IMaterialData} from '../material/material-deserializer';

export interface IPlaneData {
    material?: IMaterialData;
}

export class PlaneDeserializer implements IIntersectibleDeserializer {
    constructor(
        private readonly materialDeserializer: IMaterialDeserializer,
    ) {
    }

    deserialize(data: IPlaneData): IIntersectible {
        return new Plane(this.materialDeserializer.deserialize(data.material));
    }
}
