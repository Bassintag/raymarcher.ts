import {IIntersectibleDeserializer} from '../deserializer';
import {Combine, IIntersectible} from '../../scene/intersectible';

export interface ICombineData {

    children: any[];
}

export class CombineDeserializer implements IIntersectibleDeserializer {

    constructor(
        private readonly sceneDeserializer: IIntersectibleDeserializer,
    ) {
    }

    deserialize(data: ICombineData): IIntersectible {
        return new Combine(
            ...data.children.map((c) => this.sceneDeserializer.deserialize(c)),
        );
    }
}
