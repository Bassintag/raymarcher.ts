import {IIntersectible} from '../scene/intersectible';
import {ILight} from '../light';
import {IMaterial} from '../material';

export interface IDeserializer<T> {

    deserialize(data: any): T;
}

export interface IIntersectibleDeserializer extends IDeserializer<IIntersectible> {

}

export interface ILightDeserializer extends IDeserializer<ILight> {

}

export interface IMaterialDeserializer extends IDeserializer<IMaterial> {

}
