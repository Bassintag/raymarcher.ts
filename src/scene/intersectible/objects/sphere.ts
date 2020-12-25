import {IIntersectible} from '../intersectible';
import {IVector3, Vector3} from '../../../utils/vector';

export class Sphere implements IIntersectible {

    private readonly radius: number;

    constructor(radius: number) {
        this.radius = radius;
    }

    distance(position: IVector3): number {
        return Vector3.norm(position) - this.radius;
    }
}
