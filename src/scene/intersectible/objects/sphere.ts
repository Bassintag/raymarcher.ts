import {IVector3, Vector3} from '../../../utils/vector';
import {SceneObject} from './scene-object';
import {IMaterial} from '../../../material';

export class Sphere extends SceneObject {

    private readonly radius: number;

    constructor(material: IMaterial, radius: number = .5) {
        super(material);
        this.radius = radius;
    }

    getDistance(position: IVector3): number {
        return Vector3.norm(position) - this.radius;
    }
}
