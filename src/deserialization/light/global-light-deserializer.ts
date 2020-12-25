import {IDeserializer, ILightDeserializer} from '../deserializer';
import {ILight} from '../../light';
import {IColor} from '../../utils';
import {ColorDeserializer, IColorData} from '../color-deserializer';
import {GlobalLight} from '../../light/global-light';

export interface IGlobalLightData {

    color?: IColorData;
}

export class GlobalLightDeserializer implements ILightDeserializer {

    private readonly colorDeserializer: IDeserializer<IColor>;

    constructor() {
        this.colorDeserializer = new ColorDeserializer();
    }


    deserialize(data: IGlobalLightData): ILight {
        return new GlobalLight(
            this.colorDeserializer.deserialize(data.color),
        );
    }
}
