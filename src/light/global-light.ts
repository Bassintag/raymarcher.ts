import {IIllumination, ILight} from './light';
import {Color, IColor} from '../utils';

export class GlobalLight implements ILight {

    private readonly illumination: IIllumination;

    constructor(
        private readonly color: IColor
    ) {
        this.illumination = {
            diffuse: color,
            specular: Color.BLACK,
        };
    }

    getIllumination(): IIllumination {
        return this.illumination;
    }
}
