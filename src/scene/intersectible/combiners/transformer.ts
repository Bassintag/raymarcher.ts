import {IIntersectible, IIntersection} from '../intersectible';
import {IVector3, Vector3} from '../../../utils/vector';
import {IMatrix4, Matrix4} from '../../../utils/matrix/matrix4';
import {ITransform, Transform} from '../../../utils';

export class Transformer implements IIntersectible {
    private readonly intersectible: IIntersectible;
    private readonly transform: ITransform;

    constructor(
        intersectibles: IIntersectible,
        transform: ITransform = new Transform(),
    ) {
        this.intersectible = intersectibles;
        this.transform = transform;
    }

    distance(position: IVector3): IIntersection {
        return this.intersectible.distance(Vector3.transform(position, this.transform.invertMatrix));
    }
}
