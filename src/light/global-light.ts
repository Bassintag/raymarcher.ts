import {ILight} from './light';
import {IColor, IVector3} from '../utils';

export class GlobalLight implements ILight {

    constructor(
        private readonly color: IColor
    ) {
    }

    getIllumination(point: IVector3): IColor {
        return this.color;
    }
}
