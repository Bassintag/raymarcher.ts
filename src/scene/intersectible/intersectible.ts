import {IVector3} from '../../utils/vector';

export interface IIntersectible {

    distance(position: IVector3): number;
}
