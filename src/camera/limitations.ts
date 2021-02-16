export interface ILimitations {
    readonly far: number;
    readonly epsilon: number;
    readonly maxIterations: number;
    readonly descentFactor: number;
}

export namespace Limitations {

    export const DEFAULT_EPSILON = 0.00001;
    export const DEFAULT_FAR = 100;
    export const DEFAULT_MAX_ITERATIONS = 100000;
    export const DEFAULT_DESCENT_FACTOR = 4;

    export const DEFAULT: ILimitations = {
        epsilon: DEFAULT_EPSILON,
        far: DEFAULT_FAR,
        maxIterations: DEFAULT_MAX_ITERATIONS,
        descentFactor: DEFAULT_DESCENT_FACTOR,
    };
}
