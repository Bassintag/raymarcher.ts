import {IIntersectible, IIntersection} from '../intersectible';
import {IVector3} from '../../../utils/vector';

export class Onion implements IIntersectible {
    constructor(
        private readonly intersectible: IIntersectible,
        private readonly thickness: number,
    ) {
    }

    distance(position: IVector3): IIntersection {
        const intersection = this.intersectible.distance(position);
        return {distance: Math.abs(intersection.distance) - this.thickness, material: intersection.material};
    }
}
