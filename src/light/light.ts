import {IColor, IVector3} from '../utils';

export interface ILight {

    /*  readonly color: IColor;

      readonly position: IVector3;

      readonly radius: number; */

    getIllumination(point: IVector3, normal: IVector3): IColor;
}
