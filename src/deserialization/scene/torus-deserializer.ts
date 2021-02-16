import {IIntersectibleDeserializer, IMaterialDeserializer} from '../deserializer';
import {IIntersectible, Torus} from '../../scene/intersectible';
import {ColorMaterial} from '../../material';
import {Color} from '../../utils';
import {IMaterialData} from '../material/material-deserializer';

export interface ITorusData {
    radius?: number;
    width?: number;

    material?: IMaterialData;
}

export class TorusDeserializer implements IIntersectibleDeserializer {
    constructor(
        private readonly materialDeserializer: IMaterialDeserializer,
    ) {
    }

    deserialize(data: ITorusData): IIntersectible {
        return new Torus(this.materialDeserializer.deserialize(data.material), data.radius, data.width);
    }
}
