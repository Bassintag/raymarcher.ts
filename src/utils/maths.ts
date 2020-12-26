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
}
