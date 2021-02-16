import {IVector3, Vector3} from '../../../utils/vector';
import {IMaterial} from '../../../material';
import {SceneObject} from './scene-object';

export class Cube extends SceneObject {

    private readonly size: Vector3;

    constructor(material: IMaterial, size: IVector3 = Vector3.ONE) {
        super(material);
        this.size = size;
    }

    getDistance(position: IVector3): number {
        const q = Vector3.substract(
            Vector3.abs(position),
            this.size,
        );
        return Vector3.norm(
            Vector3.max1(q, 0),
        ) + Math.min(Math.max(q.x, Math.max(q.y, q.z)), 0);
    }
}
