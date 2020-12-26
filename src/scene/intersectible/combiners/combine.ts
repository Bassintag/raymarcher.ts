import {IIntersectible, IIntersection, Intersection} from '../intersectible';
import {IVector3} from '../../../utils/vector';

export class Combine implements IIntersectible {
    private readonly intersectibles: IIntersectible[];

    constructor(
        ...intersectibles: IIntersectible[]
    ) {
        this.intersectibles = intersectibles;
    }

    distance(position: IVector3): IIntersection {
        return Intersection.min(
            ...this.intersectibles.map((i) => i.distance(position))
        );
    }
}
