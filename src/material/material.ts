import {Color, IColor} from '../utils';

export interface IMaterial {

    readonly color: IColor;
}

export class Material implements IMaterial {

    readonly color: IColor;

    constructor(
        color: IColor = Color.WHITE,
    ) {
        this.color = color;
    }
}
