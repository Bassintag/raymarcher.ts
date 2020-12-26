import {IIntersectible, IIntersection} from '../intersectible';
import {IVector3} from '../../../utils/vector';
import {Maths} from '../../../utils';
import {LerpMaterial} from '../../../material/lerp-material';

export class SmoothCombine implements IIntersectible {
    constructor(
        private readonly a: IIntersectible,
        private readonly b: IIntersectible,
        private readonly k: number = 0.1,
    ) {
    }

    distance(position: IVector3): IIntersection {
        const a = this.a.distance(position);
        const b = this.b.distance(position);
        const h = Math.min(Math.max(0.5 + 0.5 * (b.distance - a.distance) / this.k, 0), 1);
        return {
            distance: Maths.lerp(b.distance, a.distance, h) - this.k * h * (1 - h),
            material: new LerpMaterial(b.material, a.material, h),
        };
    }
}
