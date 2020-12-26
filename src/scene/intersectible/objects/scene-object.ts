import {IMaterial} from '../../../material';
import {IIntersectible, IIntersection} from '../intersectible';
import {IVector3} from '../../../utils/vector';

export abstract class SceneObject implements IIntersectible {

    protected constructor(
        private readonly material: IMaterial,
    ) {
    }

    protected abstract getDistance(position: IVector3): number;

    distance(position: IVector3): IIntersection {
        return {
            distance: this.getDistance(position),
            material: this.material,
        };
    }
}
