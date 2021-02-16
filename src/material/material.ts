import {IColor, IVector3} from '../utils';

export interface IMaterialOutput {
    color: IColor;
    smoothness?: number;
    roughness?: number
    specularFactor?: number;
    specularSpread?: number;
}

export interface IMaterial {

    render(position: IVector3, normal: IVector3): IMaterialOutput;
}
