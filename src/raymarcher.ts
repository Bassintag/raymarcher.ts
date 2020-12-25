import {IIntersectible} from './scene/intersectible';
import {IVector2} from './utils/vector';
import {Color, IColor, IImageBuffer, ImageBuffer} from './utils';
import {Camera, ICamera, ILimitations, IRay, Limitations} from './camera';
import {ILight, PointLight} from './light';
import {GlobalLight} from './light/global-light';

export interface IRaymarcherOptions {
    epsilon?: number;
    maxIterations?: number;
    far?: number;
    resolution: IVector2;
    scene: IIntersectible;
    lights?: ILight[];
}

export interface IRaymarcher {

    renderRay(ray: IRay): IColor;

    renderPixel(x: number, y: number): IColor;

    render(): IImageBuffer;
}

export class Raymarcher implements IRaymarcher {

    private readonly camera: ICamera;
    private readonly scene: IIntersectible;
    private readonly lights: ILight[];
    private readonly limitations: ILimitations;

    constructor(
        private readonly options: IRaymarcherOptions
    ) {
        this.limitations = {
            epsilon: options.epsilon || Limitations.DEFAULT_EPSILON,
            far: options.far || Limitations.DEFAULT_FAR,
            maxIterations: options.maxIterations || Limitations.DEFAULT_MAX_ITERATIONS,
        };
        this.scene = options.scene;
        this.camera = new Camera({
            resolution: options.resolution,
        });
        this.lights = options.lights || [new GlobalLight([1, 1, 1, 1])];
    }

    renderRay(ray: IRay): IColor {
        const hitData = ray.march(this.scene);
        if (hitData.hit) {
            const components: IColor[] = [];
            for (const light of this.lights) {
                const component = light.getIllumination(hitData.position);
                if (component) {
                    components.push(component);
                }
            }
            return Color.mix(components);
        } else {
            return Color.BLACK;
        }
    }

    renderPixel(x: number, y: number): IColor {
        const ray = this.camera.ray({x, y});
        return this.renderRay(ray);
    }

    render(): IImageBuffer {
        const buffer = new ImageBuffer({
            width: this.options.resolution.x,
            height: this.options.resolution.y,
        });
        for (let x = 0; x < buffer.width; x += 1) {
            for (let y = 0; y < buffer.height; y += 1) {
                buffer.set(x, y, this.renderPixel(x, y));
            }
        }
        return buffer;
    }
}
