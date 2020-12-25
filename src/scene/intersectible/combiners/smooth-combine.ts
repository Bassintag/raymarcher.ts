import {IIntersectible} from '../intersectible';
import {IVector3} from '../../../utils/vector';
import {lerp} from '../../../utils';

export class SmoothCombine implements IIntersectible {
    constructor(
        private readonly a: IIntersectible,
        private readonly b: IIntersectible,
        private readonly k: number = 0.1,
    ) {
    }

    distance(position: IVector3): number {
        const a = this.a.distance(position);
        const b = this.b.distance(position);
        const h = Math.min(Math.max(0.5 + 0.5 * (b - a) / this.k, 0), 1);
        return lerp(b, a, h) - this.k * h * (1 - h);
    }
}
