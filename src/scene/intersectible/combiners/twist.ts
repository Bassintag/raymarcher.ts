import {IIntersectible, IIntersection} from '../intersectible';
import {IVector3, Vector3} from '../../../utils/vector';
import {Matrix4} from '../../../utils/matrix/matrix4';

export class Twist implements IIntersectible {

    constructor(
        private readonly child: IIntersectible,
        private readonly amount: number = 1,
    ) {
    }

    distance(position: IVector3): IIntersection {
        const angle = position.z * this.amount;
        const mat = Matrix4.rotationZ(angle);
        const transformed = Vector3.transform(position, mat);
        return this.child.distance(transformed);
    }
}
