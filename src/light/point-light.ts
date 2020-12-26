import {IVector3, Vector3} from '../utils/vector';
import {Color, IColor} from '../utils';
import {ILight} from './light';
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
            origin: Vector3.add(position, Vector3.scale(normal, this.limitations.epsilon * 2)),
            direction,
            limitations: {
                epsilon: this.limitations.epsilon,
                maxIterations: this.limitations.maxIterations,
                far: Vector3.distance(position, target),
            },
        });
        return ray.march(this.scene);
    }

    getIllumination(position: IVector3, normal: IVector3): IColor {
        const distance = Vector3.distance(position, this.position);
        const distanceFactor = Math.max(0, (this.radius - distance) / this.radius);
        if (distanceFactor > 0) {
            const diffuse = Math.max(0, Vector3.dot(
                Vector3.normalize(Vector3.substract(this.position, position)),
                normal
            ));
            if (diffuse > 0) {
                const shadowHit = this.raymarch(position, this.position, normal);
                if (!shadowHit.hit) {
                    const specular = Math.pow(diffuse, 64);
                    const intensity = (diffuse + specular)
                        * Math.min(shadowHit.occlusion, 1)
                        * distanceFactor;
                    return Color.scale(this.color, intensity);
                }
            }
        }
        return null;
    }
}
