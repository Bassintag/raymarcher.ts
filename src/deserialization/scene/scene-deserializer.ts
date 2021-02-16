import {CubeDeserializer} from './cube-deserializer';
import {SphereDeserializer} from './sphere-deserializer';
import {TransformerDeserializer} from './transformer-deserializer';
import {CombineDeserializer} from './combine-deserializer';
import {IntersectDeserializer} from './intersect-deserializer';
import {SubstractDeserializer} from './substract-deserializer';
import {SmoothCombineDeserializer} from './smooth-combine-deserializer';
import {IIntersectibleDeserializer, IMaterialDeserializer} from '../deserializer';
import {IIntersectible, Torus} from '../../scene/intersectible';
import {RepeatDeserializer} from './repeat-deserializer';
import {OnionDeserializer} from './onion-deserializer';
import {MaterialDeserializer} from '../material/material-deserializer';
import {PlaneDeserializer} from './plane-deserializer';
import {RecursiveTetrahedronDeserializer} from './recursive-tetrahedron-deserializer';
import {MandelbulbDeserializer} from './mandelbulb-deserializer';
import {TwistDeserializer} from './twist-deserializer';
import {TorusDeserializer} from './torus-deserializer';

export interface ISceneData {
    type: string;
}

export class SceneDeserializer implements IIntersectibleDeserializer {

    private readonly deserializers: { readonly [key: string]: IIntersectibleDeserializer };

    constructor(
        materialDeserializer: IMaterialDeserializer = new MaterialDeserializer(),
        deserializers?: { readonly [key: string]: IIntersectibleDeserializer }
    ) {
        if (deserializers == null) {
            deserializers = {
                'combine': new CombineDeserializer(this),
                'cube': new CubeDeserializer(materialDeserializer),
                'intersect': new IntersectDeserializer(this),
                'mandel': new MandelbulbDeserializer(materialDeserializer),
                'tetrahedron': new RecursiveTetrahedronDeserializer(materialDeserializer),
                'onion': new OnionDeserializer(this),
                'plane': new PlaneDeserializer(materialDeserializer),
                'repeat': new RepeatDeserializer(this),
                'sphere': new SphereDeserializer(materialDeserializer),
                'smooth-combine': new SmoothCombineDeserializer(this),
                'substract': new SubstractDeserializer(this),
                'torus': new TorusDeserializer(materialDeserializer),
                'transform': new TransformerDeserializer(this),
                'twist': new TwistDeserializer(this),
            };
        }
        this.deserializers = deserializers;
    }

    deserialize(data: ISceneData): IIntersectible {
        const deserializer = this.deserializers[data.type];
        if (deserializer == null) {
            throw new Error('Invalid Object Type ' + data.type);
        }
        return deserializer.deserialize(data);
    }
}
