import {IIntersectibleDeserializer, IMaterialDeserializer} from '../deserializer';
import {IIntersectible, RecursiveTetrahedron, Plane} from '../../scene/intersectible';
import {IMaterialData} from '../material/material-deserializer';

export interface IRecursiveTetrahedronData {
    material?: IMaterialData;
}

export class RecursiveTetrahedronDeserializer implements IIntersectibleDeserializer {
    constructor(
        private readonly materialDeserializer: IMaterialDeserializer,
    ) {
    }

    deserialize(data: IRecursiveTetrahedronData): IIntersectible {
        return new RecursiveTetrahedron(this.materialDeserializer.deserialize(data.material));
    }
}
