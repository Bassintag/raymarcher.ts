import {IDeserializer, IIntersectibleDeserializer} from '../deserializer';
import {Vector3} from '../../utils/vector';
import {Cube, IIntersectible} from '../../scene/intersectible';
import {IVector3Data, Vector3Deserializer} from '../vector3-deserializer';

export interface ICubeData {
    size?: IVector3Data;
}

export class CubeDeserializer implements IIntersectibleDeserializer {
    private readonly vector3Deserializer: IDeserializer<Vector3>;

    constructor() {
        this.vector3Deserializer = new Vector3Deserializer();
    }

    deserialize(data: ICubeData): IIntersectible {
        return new Cube(this.vector3Deserializer.deserialize(data.size || {}));
    }
}
