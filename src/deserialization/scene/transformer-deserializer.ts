import {IVector3, Maths, Transform, Vector3} from '../../utils';
import {IDeserializer, IIntersectibleDeserializer} from '../deserializer';
import {IIntersectible, Transformer} from '../../scene/intersectible';
import {IVector3Data, Vector3Deserializer} from '../vector3-deserializer';

export interface ITransformerData {

    child: any;

    position?: IVector3Data;
    rotation?: IVector3Data;
    scale?: IVector3Data;
}

export class TransformerDeserializer implements IIntersectibleDeserializer {

    private readonly vector3Deserializer: IDeserializer<IVector3>;

    constructor(
        private readonly sceneDeserializer: IIntersectibleDeserializer,
    ) {
        this.vector3Deserializer = new Vector3Deserializer();
    }

    deserialize(data: ITransformerData): IIntersectible {
        const transform = new Transform(
            this.vector3Deserializer.deserialize(data.position || {x: 0, y: 0, z: 0}),
            Vector3.scale(
                this.vector3Deserializer.deserialize(data.rotation || {x: 0, y: 0, z: 0}),
                Maths.DEG2RAD,
            ),
            this.vector3Deserializer.deserialize(data.scale || {x: 1, y: 1, z: 1}),
        );
        return new Transformer(
            this.sceneDeserializer.deserialize(data.child),
            transform
        );
    }
}
