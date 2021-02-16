import {IDeserializer} from '../deserializer';
import {IMaterial} from '../../material';

export class MaterialRegisty implements IDeserializer<IMaterial> {

    constructor(
        private readonly materials: { [key: string]: IMaterial },
        private readonly fallback?: IDeserializer<IMaterial>,
    ) {
    }

    deserialize(data: any): IMaterial {
        if (typeof data === 'string') {
            const material = this.materials[data];
            if (material == null) {
                throw new Error('Invalid material ID');
            }
            return material;
        } else if (this.fallback) {
            return this.fallback.deserialize(data);
        }
        throw new Error('Invalid data');
    }
}
