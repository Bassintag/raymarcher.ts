import {IDeserializer} from './deserializer';
import {IColor} from '../utils';

export type IColorData = [number, number, number, number];

export class ColorDeserializer implements IDeserializer<IColor> {

    deserialize(data: IColorData): IColor {
        const [r, g, b, a] = data;
        return [
            r == null ? 1 : r,
            g == null ? 1 : g,
            b == null ? 1 : b,
            a == null ? 1 : a,
        ];
    }
}
