import {IMaterial, IMaterialOutput} from './material';
import {IColor, IVector3} from '../utils';

export class ColorMaterial implements IMaterial {

    constructor(
        private readonly color: IColor,
        private readonly smoothness: number = 0,
        private readonly roughness: number = 0,
    ) {
    }

    render(position: IVector3): IMaterialOutput {
        return {
            color: this.color,
            smoothness: this.smoothness,
            roughness: this.roughness,
        };
    }
}
