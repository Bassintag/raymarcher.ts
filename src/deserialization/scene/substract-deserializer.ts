import {IIntersectibleDeserializer} from '../deserializer';
import {IIntersectible, Substract} from '../../scene/intersectible';

export interface ISubstractData {

    left: any;
    right: any;
}

export class SubstractDeserializer implements IIntersectibleDeserializer {

    constructor(
        private readonly sceneDeserializer: IIntersectibleDeserializer,
    ) {
    }

    deserialize(data: ISubstractData): IIntersectible {
        return new Substract(
            this.sceneDeserializer.deserialize(data.left),
            this.sceneDeserializer.deserialize(data.right),
        );
    }
}
