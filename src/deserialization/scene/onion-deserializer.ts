import {IIntersectibleDeserializer} from '../deserializer';
import {IIntersectible, Onion} from '../../scene/intersectible';

export interface IOnionData {

    child: any;

    radius?: number;
}

export class OnionDeserializer implements IIntersectibleDeserializer {

    constructor(
        private readonly sceneDeserializer: IIntersectibleDeserializer,
    ) {
    }

    deserialize({child, radius = 1}: IOnionData): IIntersectible {
        return new Onion(
            this.sceneDeserializer.deserialize(child),
            radius,
        );
    }
}
