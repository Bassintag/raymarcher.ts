import {IVector3, Vector3} from '../../../utils/vector';
import {SceneObject} from './scene-object';
import {IMaterial} from '../../../material';

export class Plane extends SceneObject {

    constructor(material: IMaterial) {
        super(material);
    }

    getDistance(position: IVector3): number {
        return Vector3.dot(position, Vector3.UP);
    }
}
