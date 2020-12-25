export type IMatrix4 = readonly [
    readonly [number, number, number, number],
    readonly [number, number, number, number],
    readonly [number, number, number, number],
    readonly [number, number, number, number],
];

export namespace Matrix4 {

    export const IDENTITY: IMatrix4 = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
    ];

    function asMatrix(a: number[][]): IMatrix4 {
        return [
            [a[0][0], a[0][1], a[0][2], a[0][3]],
            [a[1][0], a[1][1], a[1][2], a[1][3]],
            [a[2][0], a[2][1], a[2][2], a[2][3]],
            [a[3][0], a[3][1], a[3][2], a[3][3]],
        ];
    }

    export function multiply(a: IMatrix4, b: IMatrix4): IMatrix4 {
        const result: number[][] = [];
        for (let i = 0; i < 4; i++) {
            result.push([]);
            for (let j = 0; j < 4; j++) {
                let sum = 0;
                for (let k = 0; k < 4; k++) {
                    sum += a[i][k] * b[k][j];
                }
                result[i].push(sum);
            }
        }
        return asMatrix(result);
    }

    export function invert(m: IMatrix4): IMatrix4 {
        const a2323 = m[2][2] * m[3][3] - m[2][3] * m[3][2];
        const a1323 = m[2][1] * m[3][3] - m[2][3] * m[3][1];
        const a1223 = m[2][1] * m[3][2] - m[2][2] * m[3][1];
        const a0323 = m[2][0] * m[3][3] - m[2][3] * m[3][0];
        const a0223 = m[2][0] * m[3][2] - m[2][2] * m[3][0];
        const a0123 = m[2][0] * m[3][1] - m[2][1] * m[3][0];
        const a2313 = m[1][2] * m[3][3] - m[1][3] * m[3][2];
        const a1313 = m[1][1] * m[3][3] - m[1][3] * m[3][1];
        const a1213 = m[1][1] * m[3][2] - m[1][2] * m[3][1];
        const a2312 = m[1][2] * m[2][3] - m[1][3] * m[2][2];
        const a1312 = m[1][1] * m[2][3] - m[1][3] * m[2][1];
        const a1212 = m[1][1] * m[2][2] - m[1][2] * m[2][1];
        const a0313 = m[1][0] * m[3][3] - m[1][3] * m[3][0];
        const a0213 = m[1][0] * m[3][2] - m[1][2] * m[3][0];
        const a0312 = m[1][0] * m[2][3] - m[1][3] * m[2][0];
        const a0212 = m[1][0] * m[2][2] - m[1][2] * m[2][0];
        const a0113 = m[1][0] * m[3][1] - m[1][1] * m[3][0];
        const a0112 = m[1][0] * m[2][1] - m[1][1] * m[2][0];
        let det = m[0][0] * (m[1][1] * a2323 - m[1][2] * a1323 + m[1][3] * a1223)
            - m[0][1] * (m[1][0] * a2323 - m[1][2] * a0323 + m[1][3] * a0223)
            + m[0][2] * (m[1][0] * a1323 - m[1][1] * a0323 + m[1][3] * a0123)
            - m[0][3] * (m[1][0] * a1223 - m[1][1] * a0223 + m[1][2] * a0123);
        det = 1 / det;
        return [[
            det * (m[1][1] * a2323 - m[1][2] * a1323 + m[1][3] * a1223),
            det * -(m[0][1] * a2323 - m[0][2] * a1323 + m[0][3] * a1223),
            det * (m[0][1] * a2313 - m[0][2] * a1313 + m[0][3] * a1213),
            det * -(m[0][1] * a2312 - m[0][2] * a1312 + m[0][3] * a1212)
        ], [
            det * -(m[1][0] * a2323 - m[1][2] * a0323 + m[1][3] * a0223),
            det * (m[0][0] * a2323 - m[0][2] * a0323 + m[0][3] * a0223),
            det * -(m[0][0] * a2313 - m[0][2] * a0313 + m[0][3] * a0213),
            det * (m[0][0] * a2312 - m[0][2] * a0312 + m[0][3] * a0212),
        ], [
            det * (m[1][0] * a1323 - m[1][1] * a0323 + m[1][3] * a0123),
            det * -(m[0][0] * a1323 - m[0][1] * a0323 + m[0][3] * a0123),
            det * (m[0][0] * a1313 - m[0][1] * a0313 + m[0][3] * a0113),
            det * -(m[0][0] * a1312 - m[0][1] * a0312 + m[0][3] * a0112),
        ], [
            det * -(m[1][0] * a1223 - m[1][1] * a0223 + m[1][2] * a0123),
            det * (m[0][0] * a1223 - m[0][1] * a0223 + m[0][2] * a0123),
            det * -(m[0][0] * a1213 - m[0][1] * a0213 + m[0][2] * a0113),
            det * (m[0][0] * a1212 - m[0][1] * a0212 + m[0][2] * a0112)
        ]];
    }
}
