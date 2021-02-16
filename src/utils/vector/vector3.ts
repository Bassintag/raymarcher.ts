import {IMatrix4} from '../matrix/matrix4';
import {Maths} from '../maths';

export interface IVector3 {

    readonly x: number;

    readonly y: number;

    readonly z: number;
}

export class Vector3 implements IVector3 {
    readonly x: number;
    readonly y: number;
    readonly z: number;

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

export namespace Vector3 {
    export const ZERO = new Vector3(0, 0, 0);
    export const ONE = new Vector3(1, 1, 1);

    export const LEFT = new Vector3(-1, 0, 0);
    export const RIGHT = new Vector3(1, 0, 0);
    export const FRONT = new Vector3(0, 1, 0);
    export const BACK = new Vector3(0, -1, 0);
    export const UP = new Vector3(0, 0, 1);
    export const DOWN = new Vector3(0, 0, -1);

    export function add(a: IVector3, b: IVector3): IVector3 {
        return new Vector3(
            a.x + b.x,
            a.y + b.y,
            a.z + b.z,
        );
    }

    export function add1(a: IVector3, b: number): IVector3 {
        return new Vector3(
            a.x + b,
            a.y + b,
            a.z + b,
        );
    }

    export function substract(a: IVector3, b: IVector3): IVector3 {
        return new Vector3(
            a.x - b.x,
            a.y - b.y,
            a.z - b.z,
        );
    }

    export function substract1(a: IVector3, n: number): IVector3 {
        return new Vector3(
            a.x - n,
            a.y - n,
            a.z - n,
        );
    }

    export function multiply(a: IVector3, b: IVector3): IVector3 {
        return new Vector3(
            a.x * b.x,
            a.y * b.y,
            a.z * b.z,
        );
    }

    export function divide(a: IVector3, b: IVector3): IVector3 {
        return new Vector3(
            a.x / b.x,
            a.y / b.y,
            a.z / b.z,
        );
    }

    export function modulo(a: IVector3, b: IVector3): IVector3 {
        return new Vector3(
            Maths.mod(a.x, b.x),
            Maths.mod(a.y, b.y),
            Maths.mod(a.z, b.z),
        );
    }


    export function absolute(v: IVector3): IVector3 {
        return new Vector3(
            Math.abs(v.x),
            Math.abs(v.y),
            Math.abs(v.z),
        );
    }

    export function scale(a: IVector3, amount: number): IVector3 {
        return new Vector3(
            a.x * amount,
            a.y * amount,
            a.z * amount,
        );
    }

    export function cross(a: IVector3, b: IVector3): IVector3 {
        return new Vector3(
            a.y * b.z - a.z * b.y,
            a.z * b.x - a.x * b.z,
            a.x * b.y - a.y * b.x,
        );
    }

    export function norm(v: IVector3): number {
        return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
    }

    export function normalize(v: IVector3): IVector3 {
        const l = Vector3.norm(v);
        return new Vector3(
            v.x / l,
            v.y / l,
            v.z / l,
        );
    }

    export function abs(v: IVector3): IVector3 {
        return new Vector3(
            Math.abs(v.x),
            Math.abs(v.y),
            Math.abs(v.z),
        );
    }

    export function min1(v: IVector3, n: number): IVector3 {
        return new Vector3(
            Math.min(v.x, n),
            Math.min(v.y, n),
            Math.min(v.z, n),
        );
    }

    export function max1(v: IVector3, n: number): IVector3 {
        return new Vector3(
            Math.max(v.x, n),
            Math.max(v.y, n),
            Math.max(v.z, n),
        );
    }

    export function invert(v: IVector3): IVector3 {
        return new Vector3(
            -v.x,
            -v.y,
            -v.z,
        );
    }

    export function dot(a: IVector3, b: IVector3): number {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }

    export function distance(a: IVector3, b: IVector3): number {
        return Math.sqrt(
            Math.pow(b.x - a.x, 2) +
            Math.pow(b.y - a.y, 2) +
            Math.pow(b.z - a.z, 2)
        );
    }

    export function transform(v: IVector3, m: IMatrix4): IVector3 {
        return new Vector3(
            v.x * m[0][0] + v.y * m[0][1] + v.z * m[0][2] + m[0][3],
            v.x * m[1][0] + v.y * m[1][1] + v.z * m[1][2] + m[1][3],
            v.x * m[2][0] + v.y * m[2][1] + v.z * m[2][2] + m[2][3]
        );
    }
}
