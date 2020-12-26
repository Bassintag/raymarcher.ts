import {IMaterial, IMaterialOutput} from './material';
import {Color, IColor, IVector3, Maths, Vector3} from '../utils';

export class CheckerboardMaterial implements IMaterial {

    constructor(
        private readonly a: IColor = Color.WHITE,
        private readonly b: IColor = Color.BLACK,
        private readonly size: IVector3 = Vector3.ONE,
    ) {
    }

    render(position: IVector3): IMaterialOutput {
        const xFact = this.size.x == 0 ? 0 : 1 / this.size.x;
        const yFact = this.size.y == 0 ? 0 : 1 / this.size.y;
        const zFact = this.size.z == 0 ? 0 : 1 / this.size.z;
        const sum = Math.floor(position.x * xFact)
            + Math.floor(position.y * yFact)
            + Math.floor(position.z * zFact);
        if (Maths.mod(sum, 2) == 0) {
            return {color: this.a, smoothness: 0};
        } else {
            return {color: this.b, smoothness: 0};
        }
    }
}
