import {IIntersectibleDeserializer} from '../deserializer';
import {IIntersectible, Twist} from '../../scene/intersectible';

export interface ITwistData {

    child: any;

    amount?: number;
}

export class TwistDeserializer implements IIntersectibleDeserializer {

    constructor(
        private readonly sceneDeserializer: IIntersectibleDeserializer,
    ) {
    }

    deserialize({child, amount = 10}: ITwistData): IIntersectible {
        return new Twist(
            this.sceneDeserializer.deserialize(child),
            amount,
        );
    }
}
