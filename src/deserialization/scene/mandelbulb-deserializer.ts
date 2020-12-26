import {IIntersectibleDeserializer, IMaterialDeserializer} from '../deserializer';
import {IIntersectible} from '../../scene/intersectible';
import {IMaterialData} from '../material/material-deserializer';
import {Mandelbulb} from '../../scene/intersectible/objects/mandelbulb';

export interface IMandelbulbData {
    material?: IMaterialData;
}

export class MandelbulbDeserializer implements IIntersectibleDeserializer {
    constructor(
        private readonly materialDeserializer: IMaterialDeserializer,
    ) {
    }

    deserialize(data: IMandelbulbData): IIntersectible {
        return new Mandelbulb(this.materialDeserializer.deserialize(data.material));
    }
}
