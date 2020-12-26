import {Maths} from './maths';

export const COLOR_SIZE = 4;

export type IColor = readonly [number, number, number, number];

export namespace Color {
    export const BLACK: IColor = [0, 0, 0, 1];
    export const WHITE: IColor = [1, 1, 1, 1];
    export const RED: IColor = [1, 0, 0, 1];
    export const GREEN: IColor = [0, 1, 0, 1];
    export const BLUE: IColor = [0, 0, 1, 1];
    export const YELLOW: IColor = [1, 1, 0, 1];
    export const CYAN: IColor = [0, 1, 1, 1];
    export const MAGENTA: IColor = [1, 0, 1, 1];

    export function scale(color: IColor, amount: number): IColor {
        return [
            color[0] * amount,
            color[1] * amount,
            color[2] * amount,
            color[3],
        ];
    }

    export function additiveBlend(colors: IColor[]): IColor {
        const mixed = colors.reduce((prev, c) => [
            prev[0] + c[0] * c[3],
            prev[1] + c[1] * c[3],
            prev[2] + c[2] * c[3],
            1
        ], Color.BLACK);
        return [
            Math.min(1, mixed[0]),
            Math.min(1, mixed[1]),
            Math.min(1, mixed[2]),
            1,
        ];
    }

    export function minBlend(colors: IColor[]): IColor {
        return colors.reduce((prev, c) => [
            prev[0] * c[0] * c[3],
            prev[1] * c[1] * c[3],
            prev[2] * c[2] * c[3],
            1
        ], Color.WHITE);
    }

    export function lerp(a: IColor, b: IColor, h: number): IColor {
        return [
            Maths.lerp(a[0], b[0], h),
            Maths.lerp(a[1], b[1], h),
            Maths.lerp(a[2], b[2], h),
            Maths.lerp(a[3], b[3], h),
        ];
    }
}
