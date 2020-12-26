import {IMaterial, IMaterialOutput} from './material';
import {Color, IColor, IVector3, Maths, Vector3} from '../utils';

export class NormalMaterial implements IMaterial {

    constructor() {
    }

    render(position: IVector3, normal: IVector3): IMaterialOutput {
        const n = Vector3.add1(Vector3.scale(normal, .5), .5);
        return {
            color: [
                n.x,
                n.y,
                n.z,
                1,
            ],
            smoothness: 0,
        };
    }
}
