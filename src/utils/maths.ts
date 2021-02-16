export namespace Maths {
    export function lerp(a: number, b: number, k: number) {
        return a + (b - a) * k;
    }

    export function mod(n: number, m: number) {
        if (m === 0) {
            return 0;
        }
        return ((n % m) + m) % m;
    }

    export function randomRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    export function clamp(n: number, min: number, max: number){
        return Math.min(max, Math.max(min, n));
    }

    export const PI = 3.14159265359;
    export const DEG2RAD = PI / 180;
    export const RAD2DEG = 180 / PI;
}
