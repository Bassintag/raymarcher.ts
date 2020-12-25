import {IVector3, Vector3} from '../utils/vector';
import {ILimitations} from './limitations';
import {IIntersectible} from '../scene/intersectible';


export interface IRayHit {
    readonly hit: boolean;
    readonly totalDistance: number;
    readonly distance: number;
    readonly position: IVector3;
    readonly occlusion: number;
}

export interface IRay {

    readonly origin: IVector3;
    readonly direction: IVector3;
    readonly limitations: ILimitations;

    march(intersectible: IIntersectible): IRayHit;
}

export interface IRayOptions {
    readonly origin: IVector3;

    readonly direction: IVector3;

    readonly limitations: ILimitations;

    readonly occlusionFactor?: number;
}

export class Ray implements IRay {
    readonly direction: IVector3;
    readonly origin: IVector3;
    readonly limitations: ILimitations;
    readonly occlusionFactor: number;

    constructor({
                    origin,
                    direction,
                    limitations,
                    occlusionFactor = 16,
                }: IRayOptions) {
        this.origin = origin;
        this.direction = direction;
        this.limitations = limitations;
        this.occlusionFactor = occlusionFactor;
    }

    march(intersectible: IIntersectible): IRayHit {
        let position = this.origin;
        let distance = this.limitations.epsilon;
        let totalDistance = 0;
        let occlusion = 1;
        let hit = false;
        for (let i = 0; i < this.limitations.maxIterations; i += 1) {
            distance = intersectible.distance(position);
            if (distance < this.limitations.epsilon) {
                hit = true;
                break;
            }
            totalDistance += distance;
            if (totalDistance >= this.limitations.far) {
                totalDistance = this.limitations.far;
                break;
            }
            occlusion = Math.min(occlusion, distance * this.occlusionFactor / totalDistance);
            position = Vector3.add(position, Vector3.scale(this.direction, distance));
        }
        return {
            hit,
            distance,
            position,
            totalDistance,
            occlusion,
        };
    }
}
