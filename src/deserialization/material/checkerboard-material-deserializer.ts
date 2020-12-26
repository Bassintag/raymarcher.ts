import {IDeserializer, IMaterialDeserializer} from '../deserializer';
import {ColorMaterial, IMaterial} from '../../material';
import {ColorDeserializer, IColorData} from '../color-deserializer';
import {IColor, IVector3} from '../../utils';
import {CheckerboardMaterial} from '../../material/checkerboard-material';
import {IVector3Data, Vector3Deserializer} from '../vector3-deserializer';

export interface ICheckerboardMaterialData {
    left?: IColorData;
    right?: IColorData;
    size?: IVector3Data;
}

export class CheckerboardMaterialDeserializer implements IMaterialDeserializer {

    private readonly colorDeserializer: IDeserializer<IColor>;
    private readonly vector3Deserializer: IDeserializer<IVector3>;

    constructor() {
        this.colorDeserializer = new ColorDeserializer();
        this.vector3Deserializer = new Vector3Deserializer();
    }

    deserialize(data: ICheckerboardMaterialData): IMaterial {
        return new CheckerboardMaterial(
            this.colorDeserializer.deserialize(data.left || []),
            this.colorDeserializer.deserialize(data.right || []),
            this.vector3Deserializer.deserialize(data.size || {}),
        );
    }
}
