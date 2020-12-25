import {IIntersectible} from '../intersectible';
import {IVector3} from '../../../utils/vector';

export class Substract implements IIntersectible {
    constructor(
        private readonly a: IIntersectible,
        private readonly b: IIntersectible,
    ) {
    }

    distance(position: IVector3): number {
        return Math.max(
            this.a.distance(position),
            -this.b.distance(position),
        );
    }
}
