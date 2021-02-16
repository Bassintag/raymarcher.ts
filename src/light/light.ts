import {IColor, IVector3} from '../utils';

export interface IIllumination {
    diffuse: IColor;
    specular: IColor;
}

export interface ILight {

    /*  readonly color: IColor;

      readonly position: IVector3;

      readonly radius: number; */

    getIllumination(point: IVector3, normal: IVector3, view: IVector3): IIllumination;
}
