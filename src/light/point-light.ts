import {IVector3, Vector3} from '../utils/vector';
import {Color, IColor} from '../utils';
import {ILight} from './light';
import {IIntersectible} from '../scene/intersectible';
import {ILimitations, IRayHit, Limitations, Ray} from '../camera';

export class PointLight implements ILight {

    private readonly epsilonYXX: IVector3;
    private readonly epsilonXYX: IVector3;
    private readonly epsilonXXY: IVector3;

    constructor(
        private readonly scene: IIntersectible,
        private readonly limitations: ILimitations = Limitations.DEFAULT,
        private readonly position: IVector3 = Vector3.ZERO,
        private readonly color: IColor = Color.WHITE,
        private readonly radius: number = 3,
    ) {
        this.epsilonYXX = {x: this.limitations.epsilon * 4, y: 0, z: 0};
        this.epsilonXYX = {x: 0, y: this.limitations.epsilon * 4, z: 0};
        this.epsilonXXY = {x: 0, y: 0, z: this.limitations.epsilon * 4};
    }

    private calculateNormal(position: IVector3): IVector3 {
        return Vector3.normalize(new Vector3(
            this.scene.distance(Vector3.add(position, this.epsilonYXX)) - this.scene.distance(Vector3.substract(position, this.epsilonYXX)),
            this.scene.distance(Vector3.add(position, this.epsilonXYX)) - this.scene.distance(Vector3.substract(position, this.epsilonXYX)),
            this.scene.distance(Vector3.add(position, this.epsilonXXY)) - this.scene.distance(Vector3.substract(position, this.epsilonXXY)),
        ));
    }

    private raymarch(position: IVector3, target: IVector3): IRayHit {
        const direction = Vector3.normalize(Vector3.substract(target, position));
        const ray = new Ray({
            origin: Vector3.add(position, Vector3.scale(direction, this.limitations.epsilon * 8)),
            direction,
            limitations: {
                epsilon: this.limitations.epsilon,
                maxIterations: this.limitations.maxIterations,
                far: Vector3.distance(position, target),
            },
        });
        return ray.march(this.scene);
    }

    getIllumination(position: IVector3): IColor {
        const distance = Vector3.distance(position, this.position);
        const distanceFactor = Math.max(0, (this.radius - distance) / this.radius);
        if (distanceFactor > 0) {
            const normal = this.calculateNormal(position);
            const diffuse = Math.max(0, Vector3.dot(
                Vector3.normalize(Vector3.substract(this.position, position)),
                normal
            ));
            if (diffuse > 0) {
                const shadowHit = this.raymarch(position, this.position);
                if (!shadowHit.hit) {
                    const specular = Math.pow(diffuse, 32);
                    const intensity = (diffuse + specular)
                        * Math.min(shadowHit.occlusion * 16, 1)
                        * distanceFactor;
                    return Color.scale(this.color, intensity);
                }
            }
        }
        return null;
    }
}
