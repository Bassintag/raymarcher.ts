import {IMaterial, IMaterialOutput} from './material';
import {Color, IColor, IVector3, Maths} from '../utils';

export class LerpMaterial implements IMaterial {

    constructor(
        private readonly a: IMaterial,
        private readonly b: IMaterial,
        private readonly h: number,
    ) {
    }

    render(position: IVector3, normal: IVector3): IMaterialOutput {
        const a = this.a.render(position, normal);
        const b = this.b.render(position, normal);
        return {
            color: Color.lerp(a.color, b.color, this.h),
            smoothness: Maths.lerp(a.smoothness, b.smoothness, this.h),
            roughness: Maths.lerp(a.roughness, b.roughness, this.h),
        };
    }
}
