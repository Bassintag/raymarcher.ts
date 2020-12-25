export interface IVector2 {
    x: number;
    y: number;
}

export class Vector2 implements IVector2 {
    readonly x: number;
    readonly y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }
}

export namespace Vector2 {


    export function norm(v: IVector2): number {
        return Math.sqrt(v.x * v.x + v.y * v.y);
    }

    export function normalize(v: IVector2): IVector2 {
        const length = Vector2.norm(v);
        return new Vector2(
            v.x / length,
            v.y / length,
        );
    }
}
