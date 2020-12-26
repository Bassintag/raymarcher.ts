import {IMaterialDeserializer} from '../deserializer';
import {ColorMaterial, IMaterial} from '../../material';
import {ColorMaterialDeserializer} from './color-material-deserializer';
import {Color} from '../../utils';
import {CheckerboardMaterialDeserializer} from './checkerboard-material-deserializer';
import {NormalMaterialDeserializer} from './normal-material-deserializer';

export interface IMaterialData {
    type: string;
}

export class MaterialDeserializer implements IMaterialDeserializer {

    private readonly deserializers: { readonly [key: string]: IMaterialDeserializer };

    constructor(
        deserializers?: { readonly [key: string]: IMaterialDeserializer }
    ) {
        if (deserializers == null) {
            deserializers = {
                'checkerboard': new CheckerboardMaterialDeserializer(),
                'color': new ColorMaterialDeserializer(),
                'normal': new NormalMaterialDeserializer(),
            };
        }
        this.deserializers = deserializers;
    }

    deserialize(data: IMaterialData): IMaterial {
        if (data == null) {
            return new ColorMaterial(Color.WHITE);
        }
        const deserializer = this.deserializers[data.type];
        if (deserializer == null) {
            throw new Error('Invalid Object Type ' + data.type);
        }
        return deserializer.deserialize(data);
    }

}
