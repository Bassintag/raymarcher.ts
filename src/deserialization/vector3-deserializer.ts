import {IDeserializer} from './deserializer';
import {IVector3, Vector3} from '../utils/vector';

export interface IVector3Data {
    x?: number;
    y?: number;
    z?: number;
}

export class Vector3Deserializer implements IDeserializer<IVector3> {

    deserialize(data: IVector3Data): IVector3 {
        return new Vector3(
            data.x || 1,
            data.y || 1,
            data.z || 1,
        );
    }
}
