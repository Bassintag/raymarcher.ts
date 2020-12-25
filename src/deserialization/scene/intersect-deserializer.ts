import {IIntersectibleDeserializer} from '../deserializer';
import {IIntersectible, Intersect} from '../../scene/intersectible';

export interface IIntersectData {

    children: any[];
}

export class IntersectDeserializer implements IIntersectibleDeserializer {

    constructor(
        private readonly sceneDeserializer: IIntersectibleDeserializer,
    ) {
    }

    deserialize(data: IIntersectData): IIntersectible {
        return new Intersect(
            ...data.children.map((c) => this.sceneDeserializer.deserialize(c)),
        );
    }
}
