import {IVector3, Vector3} from '../utils/vector';
import {Color, IColor} from '../utils';
import {IIllumination, ILight} from './light';
import {IIntersectible} from '../scene/intersectible';
import {ILimitations, IRayHit, Limitations, Ray} from '../camera';

export class PointLight implements ILight {

    constructor(
        private readonly scene: IIntersectible,
        private readonly limitations: ILimitations = Limitations.DEFAULT,
        private readonly position: IVector3 = Vector3.ZERO,
        private readonly color: IColor = Color.WHITE,
        private readonly radius: number = 3,
    ) {
    }

    private raymarch(position: IVector3, target: IVector3, normal: IVector3): IRayHit {
        const direction = Vector3.normalize(Vector3.substract(target, position));
        const ray = new Ray({
            origin: Vector3.add(position, Vector3.scale(normal, this.limitations.epsilon)),
            direction,
            limitations: {
                ...this.limitations,
                far: Vector3.distance(position, target),
            },
        });
        return ray.march(this.scene);
    }

    getIllumination(position: IVector3, normal: IVector3, view: IVector3): IIllumination {
        const distance = Vector3.distance(position, this.position);
        const distanceFactor = Math.max(0, (this.radius - distance) / this.radius);
        if (distanceFactor > 0) {
            const relative = Vector3.normalize(Vector3.substract(this.position, position));
            const diffuse = Math.max(0, Vector3.dot(
                relative,
                normal
            ));
            if (diffuse > 0) {
                const shadowHit = this.raymarch(position, this.position, normal);
                if (!shadowHit.hit) {
                    const r = Vector3.normalize(
                        Vector3.substract(
                            Vector3.scale(normal, 2 * (Vector3.dot(normal, relative))),
                            relative,
                        ),
                    );
                    const v = Vector3.normalize(Vector3.substract(view, position));
                    let specular = Vector3.dot(v, r);
                    const intensity = diffuse
                        * Math.min(shadowHit.occlusion, 1)
                        * distanceFactor;
                    return {
                        diffuse: Color.scale(this.color, intensity),
                        specular: Color.scale(this.color, specular),
                    };
                }
            }
        }
        return null;
    }
}
