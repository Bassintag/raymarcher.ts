import {IIntersectible, IIntersection, Intersection} from '../intersectible';
import {IVector3} from '../../../utils/vector';

export class Substract implements IIntersectible {
    constructor(
        private readonly a: IIntersectible,
        private readonly b: IIntersectible,
    ) {
    }

    distance(position: IVector3): IIntersection {
        const b = this.b.distance(position);
        return Intersection.max(
            this.a.distance(position),
            {distance: -b.distance, material: b.material},
        );
    }
}
