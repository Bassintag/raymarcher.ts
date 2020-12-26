import {IMaterialDeserializer} from '../deserializer';
import {IMaterial} from '../../material';
import {NormalMaterial} from '../../material/normal-material';

export interface INormalMaterialData {
}

export class NormalMaterialDeserializer implements IMaterialDeserializer {

    constructor() {
    }

    deserialize(data: INormalMaterialData): IMaterial {
        return new NormalMaterial();
    }
}
