import {IVector3, Vector3} from '../../../utils/vector';
import {IMaterial} from '../../../material';
import {SceneObject} from './scene-object';

export class RecursiveTetrahedron extends SceneObject {

    constructor(
        material: IMaterial,
        private readonly degree: number = 32,
        private readonly scale: number = 2,
    ) {
        super(material);
    }

    getDistance(z: IVector3): number {
        let n = 0;
        while (n < this.degree) {
            if (z.x + z.y < 0) z = {x: -z.y, y: -z.x, z: z.z}; // fold 1
            if (z.x + z.z < 0) z = {x: -z.z, y: z.y, z: -z.x}; // fold 2
            if (z.y + z.z < 0) z = {x: z.x, y: -z.z, z: -z.y}; // fold 3
            z = Vector3.substract(Vector3.scale(z, this.scale), Vector3.scale(Vector3.ONE, (this.scale - 1.0)));
            n++;
        }
        return Vector3.norm(z) * Math.pow(this.scale, -n);
    }
}
