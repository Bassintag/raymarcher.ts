import {IDeserializer, IMaterialDeserializer} from '../deserializer';
import {ColorMaterial, IMaterial} from '../../material';
import {ColorDeserializer, IColorData} from '../color-deserializer';
import {IColor} from '../../utils';

export interface IColorMaterialData {
    color: IColorData;
    smoothness: number;
    roughness: number;
}

export class ColorMaterialDeserializer implements IMaterialDeserializer {

    private readonly colorDeserializer: IDeserializer<IColor>;

    constructor() {
        this.colorDeserializer = new ColorDeserializer();
    }

    deserialize(data: IColorMaterialData): IMaterial {
        return new ColorMaterial(
            this.colorDeserializer.deserialize(data.color || []),
            data.smoothness || 0,
            data.roughness || 0,
        );
    }
}
