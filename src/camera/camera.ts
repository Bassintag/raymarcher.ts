import {IVector3, Vector3} from '../utils/vector/vector3';
import {IVector2, Vector2} from '../utils/vector/vector2';
import {ILimitations, Limitations} from './limitations';
import {IRay, Ray} from './ray';

export interface ICamera {

    readonly position: IVector3;

    readonly target: IVector3;

    readonly up: IVector3;

    readonly right: IVector3;

    readonly direction: IVector3;

    readonly resolution: IVector2;

    readonly aspectRatio: number;

    readonly limitations: ILimitations;

    ray(position: Vector2): IRay;
}

export interface ICameraOptions {
    readonly position?: IVector3;
    readonly target?: IVector3;
    readonly upDirection?: IVector3;
    readonly limitations?: ILimitations;
    readonly resolution: IVector2;
}

export class Camera implements ICamera {

    readonly position: IVector3;
    readonly target: IVector3;
    readonly right: IVector3;
    readonly up: IVector3;
    readonly direction: IVector3;
    readonly resolution: IVector2;
    readonly aspectRatio: number;
    readonly limitations: ILimitations;

    constructor({
                    position = Vector3.ONE,
                    target = Vector3.ZERO,
                    upDirection = Vector3.UP,
                    limitations = Limitations.DEFAULT,
                    resolution,
                }: ICameraOptions) {
        this.position = position;
        this.target = target;
        this.direction = Vector3.normalize(Vector3.substract(this.target, this.position));
        this.right = Vector3.normalize(Vector3.cross(upDirection, position));
        this.up = Vector3.cross(this.direction, this.right);
        this.resolution = resolution;
        this.aspectRatio = resolution.x / resolution.y;
        this.limitations = limitations;
    }

    screenPosition(position: IVector2): IVector2 {
        return {
            x: (position.x / this.resolution.x * 2 - 1) * this.aspectRatio,
            y: position.y / this.resolution.y * 2 - 1,
        };
    }

    rayDirection(screenPosition: IVector2): IVector3 {
        // right * screenPosition.x + up * screenPosition.y + direction
        return Vector3.normalize(
            Vector3.add(
                Vector3.add(
                    Vector3.scale(this.right, screenPosition.x),
                    Vector3.scale(this.up, screenPosition.y)
                ),
                this.direction,
            )
        );
    }

    ray(position: IVector2): IRay {
        const screenPosition = this.screenPosition(position);
        const direction = this.rayDirection(screenPosition);
        return new Ray({
            direction,
            origin: this.position,
            limitations: this.limitations,
        });
    }

}
