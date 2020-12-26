import {IVector3} from '../../utils/vector';
import {IMaterial} from '../../material';

export interface IIntersection {
    distance: number;
    material: IMaterial;
}

export interface IIntersectible {

    distance(position: IVector3): IIntersection;
}

export namespace Intersection {

    export function min(...intersections: IIntersection[]): IIntersection {
        let min: number = null;
        let ret: IIntersection = null;
        for (const intersection of intersections) {
            if (min == null || intersection.distance < min) {
                min = intersection.distance;
                ret = intersection;
            }
        }
        return ret;
    }

    export function max(...intersections: IIntersection[]): IIntersection {
        let max: number = null;
        let ret: IIntersection = null;
        for (const intersection of intersections) {
            if (max == null || intersection.distance > max) {
                max = intersection.distance;
                ret = intersection;
            }
        }
        return ret;
    }
}
