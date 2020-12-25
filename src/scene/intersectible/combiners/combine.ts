import {IIntersectible} from '../intersectible';
import {IVector3} from '../../../utils/vector';

export class Combine implements IIntersectible {
    private readonly intersectibles: IIntersectible[];

    constructor(
        ...intersectibles: IIntersectible[]
    ) {
        this.intersectibles = intersectibles;
    }

    distance(position: IVector3): number {
        return Math.min(
            ...this.intersectibles.map((i) => i.distance(position))
        );
    }
}
