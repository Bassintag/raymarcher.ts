import {IVector3, Vector2} from '../../../utils/vector';
import {SceneObject} from './scene-object';
import {IMaterial} from '../../../material';

export class Torus extends SceneObject {

    private readonly radius: number;
    private readonly width: number;

    constructor(
        material: IMaterial,
        radius: number = .5,
        width: number = .2,
    ) {
        super(material);
        this.radius = radius;
        this.width = width;
    }

    getDistance(position: IVector3): number {
        const q = {
            x: Vector2.norm({x: position.x, y: position.z}) - this.radius,
            y: position.y,
        };
        return Vector2.norm(q) - this.width;
    }
}
