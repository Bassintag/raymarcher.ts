import {IIntersectible, IIntersection} from '../intersectible';
import {IVector3, Vector3} from '../../../utils/vector';

export class Repeat implements IIntersectible {

    private readonly halfPeriod: IVector3;

    constructor(
        private readonly i: IIntersectible,
        private readonly period: IVector3 = Vector3.ONE,
    ) {
        this.halfPeriod = Vector3.scale(this.period, .5);
    }

    // vec3 q = mod(p+0.5*c,c)-0.5*c;
    // return primitive( q );
    distance(position: IVector3): IIntersection {
        return this.i.distance(Vector3.substract(
            Vector3.modulo(
                Vector3.add(
                    Vector3.abs(position),
                    this.halfPeriod,
                ),
                this.period,
            ),
            this.halfPeriod,
        ));
    }
}
