import {IDeserializer, IIntersectibleDeserializer} from '../deserializer';
import {IIntersectible} from '../../scene/intersectible';
import {IVector3Data, Vector3Deserializer} from '../vector3-deserializer';
import {IVector3} from '../../utils/vector';
import {Repeat} from '../../scene/intersectible/combiners';

export interface IRepeatData {

    child: any;
    period?: IVector3Data;
}

export class RepeatDeserializer implements IIntersectibleDeserializer {

    private readonly vector3Deserializer: IDeserializer<IVector3>;

    constructor(
        private readonly sceneDeserializer: IIntersectibleDeserializer,
    ) {
        this.vector3Deserializer = new Vector3Deserializer();
    }

    deserialize(data: IRepeatData): IIntersectible {
        return new Repeat(
            this.sceneDeserializer.deserialize(data.child),
            this.vector3Deserializer.deserialize(data.period || {}),
        );
    }
}
