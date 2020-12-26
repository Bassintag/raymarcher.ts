import {IDeserializer, IIntersectibleDeserializer, IMaterialDeserializer} from '../deserializer';
import {Vector3} from '../../utils/vector';
import {Cube, IIntersectible} from '../../scene/intersectible';
import {IVector3Data, Vector3Deserializer} from '../vector3-deserializer';
import {ColorMaterial} from '../../material';
import {Color} from '../../utils';
import {IMaterialData} from '../material/material-deserializer';

export interface ICubeData {
    size?: IVector3Data;
    material?: IMaterialData;
}

export class CubeDeserializer implements IIntersectibleDeserializer {
    private readonly vector3Deserializer: IDeserializer<Vector3>;

    constructor(
        private readonly materialDeserializer: IMaterialDeserializer,
    ) {
        this.vector3Deserializer = new Vector3Deserializer();
    }

    deserialize(data: ICubeData): IIntersectible {
        return new Cube(this.materialDeserializer.deserialize(data.material), this.vector3Deserializer.deserialize(data.size || {}));
    }
}
