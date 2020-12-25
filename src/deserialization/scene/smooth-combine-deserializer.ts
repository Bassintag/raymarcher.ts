import {IIntersectibleDeserializer} from '../deserializer';
import {IIntersectible} from '../../scene/intersectible';
import {SmoothCombine} from '../../scene/intersectible/combiners/smooth-combine';

export interface ISmoothCombineData {

    left: any;
    right: any;
    amount: number;
}

export class SmoothCombineDeserializer implements IIntersectibleDeserializer {

    constructor(
        private readonly sceneDeserializer: IIntersectibleDeserializer,
    ) {
    }

    deserialize(data: ISmoothCombineData): IIntersectible {
        return new SmoothCombine(
            this.sceneDeserializer.deserialize(data.left),
            this.sceneDeserializer.deserialize(data.right),
            data.amount,
        );
    }
}
