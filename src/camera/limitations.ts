export interface ILimitations {
    far: number;
    epsilon: number;
    maxIterations: number;
}

export namespace Limitations {

    export const DEFAULT_EPSILON = 0.000001;
    export const DEFAULT_FAR = 5;
    export const DEFAULT_MAX_ITERATIONS = 1000;

    export const DEFAULT: ILimitations = {
        epsilon: DEFAULT_EPSILON,
        far: DEFAULT_FAR,
        maxIterations: DEFAULT_MAX_ITERATIONS,
    };
}
