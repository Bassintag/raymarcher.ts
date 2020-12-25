import {IVector3, Vector3} from './vector';
import {IMatrix4, Matrix4} from './matrix/matrix4';

export interface ITransform {
    readonly position: IVector3;
    readonly rotation: IVector3;
    readonly scale: IVector3;

    readonly matrix: IMatrix4;
    readonly invertMatrix: IMatrix4;
}

export class Transform implements ITransform {
    readonly position: IVector3;
    readonly rotation: IVector3;
    readonly scale: IVector3;

    readonly matrix: IMatrix4;
    readonly invertMatrix: IMatrix4;

    constructor(
        position: IVector3 = Vector3.ZERO,
        rotation: IVector3 = Vector3.ZERO,
        scale: IVector3 = Vector3.ONE,
    ) {
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
        this.matrix = [
            [scale.x, 0, 0, position.x],
            [0, scale.y, 0, position.y],
            [0, 0, scale.z, position.z],
            [0, 0, 0, 1],
        ];
        this.invertMatrix = Matrix4.invert(this.matrix);
    }
}
