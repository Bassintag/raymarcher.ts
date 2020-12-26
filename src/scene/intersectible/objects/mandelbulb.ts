import {IVector3, Vector3} from '../../../utils/vector';
import {IMaterial} from '../../../material';
import {SceneObject} from './scene-object';

export class Mandelbulb extends SceneObject {

    constructor(
        material: IMaterial,
        private readonly degree: number = 8,
        private readonly iterations: number = 64,
    ) {
        super(material);
    }

    getDistance(position: IVector3): number {
        let z = position;
        let dr = 1.0;
        let r = 0.0;
        for (let i = 0; i < this.iterations; i++) {
            r = Vector3.norm(z);
            if (r > 2) break;
            let theta = Math.acos(z.z / r);
            let phi = Math.atan2(z.y, z.x);
            dr = Math.pow(r, this.degree - 1.0) * this.degree * dr + 1.0;
            let zr = Math.pow(r, this.degree);
            theta = theta * this.degree;
            phi = phi * this.degree;
            z = Vector3.scale(new Vector3(Math.sin(theta) * Math.cos(phi), Math.sin(phi) * Math.sin(theta), Math.cos(theta)), zr);
            z = Vector3.add(z, position);
        }
        return 0.5 * Math.log(r) * r / dr;
    }
}
