import {IIntersectible} from '../intersectible';
import {IVector3, Vector3} from '../../../utils/vector';

export class Cube implements IIntersectible {

    private readonly size: Vector3;

    constructor(size: IVector3 = Vector3.ONE) {
        this.size = size;
    }

    distance(position: IVector3): number {
        return Vector3.norm(
            Vector3.max1(
                Vector3.substract(
                    Vector3.abs(position),
                    this.size,
                ),
                0,
            )
        );
    }
}
