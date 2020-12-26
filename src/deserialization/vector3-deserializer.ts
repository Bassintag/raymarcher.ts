import {IDeserializer} from './deserializer';
import {IVector3, Vector3} from '../utils/vector';

export interface IVector3Data {
    x?: number;
    y?: number;
    z?: number;
}

export class Vector3Deserializer implements IDeserializer<IVector3> {

    deserialize({
                    x = 1,
                    y = 1,
                    z = 1,
                }: IVector3Data): IVector3 {
        return new Vector3(x, y, z);
    }
}
