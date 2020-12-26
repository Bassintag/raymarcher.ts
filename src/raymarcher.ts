import {IIntersectible} from './scene/intersectible';
import {IVector2, IVector3, Vector3} from './utils/vector';
import {Color, IColor, IImageBuffer, ImageBuffer, Maths} from './utils';
import {Camera, ICamera, ILimitations, IRay, Limitations, Ray} from './camera';
import {ILight} from './light';
import {GlobalLight} from './light/global-light';

export interface IRaymarcherOptions {
    epsilon?: number;
    maxIterations?: number;
    far?: number;
    resolution: IVector2;
    cameraPosition?: IVector3;
    cameraTarget?: IVector3;
    scene: IIntersectible;
    lights?: ILight[];
    clear?: IColor;
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
    private readonly clear: IColor;

    private readonly epsilonYXX: IVector3;
    private readonly epsilonXYX: IVector3;
    private readonly epsilonXXY: IVector3;

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
            position: options.cameraPosition,
            resolution: options.resolution,
            target: options.cameraTarget,
        });
        this.lights = options.lights || [new GlobalLight([1, 1, 1, 1])];
        this.clear = options.clear || Color.BLACK;
        this.epsilonYXX = {x: this.limitations.epsilon * 2, y: 0, z: 0};
        this.epsilonXYX = {x: 0, y: this.limitations.epsilon * 2, z: 0};
        this.epsilonXXY = {x: 0, y: 0, z: this.limitations.epsilon * 2};
    }

    private calculateNormal(position: IVector3, distance: number): IVector3 {
        return Vector3.normalize(Vector3.substract1({
            x: this.scene.distance(Vector3.add(position, this.epsilonYXX)).distance,
            y: this.scene.distance(Vector3.add(position, this.epsilonXYX)).distance,
            z: this.scene.distance(Vector3.add(position, this.epsilonXXY)).distance,
        }, distance));
    }

    renderRay(ray: IRay, maxRecursions: number = 3): IColor {
        const hitData = ray.march(this.scene);
        if (hitData.hit) {
            const components: IColor[] = [];
            let normal = this.calculateNormal(hitData.position, hitData.intersection.distance);
            const surface = hitData.intersection.material.render(hitData.position, normal);
            if (surface.roughness) {
                const randomOffset = {
                    x: Maths.randomRange(-surface.roughness, surface.roughness),
                    y: Maths.randomRange(-surface.roughness, surface.roughness),
                    z: Maths.randomRange(-surface.roughness, surface.roughness),
                };
                normal = Vector3.normalize(Vector3.add(normal, randomOffset));
            }
            for (const light of this.lights) {
                const component = light.getIllumination(hitData.position, normal);
                if (component) {
                    components.push(component);
                }
            }
            let finalColor = Color.minBlend([surface.color, Color.additiveBlend(components)]);
            if (surface.smoothness && maxRecursions > 0) {
                const reflectionRay = new Ray({
                    origin: Vector3.add(hitData.position, Vector3.scale(normal, this.limitations.epsilon * 2)),
                    direction: Vector3.substract(
                        ray.direction,
                        Vector3.scale(normal, 2 * Vector3.dot(ray.direction, normal))
                    ),
                    limitations: ray.limitations,
                });
                const reflectionColor = this.renderRay(reflectionRay, maxRecursions - 1);
                finalColor = Color.lerp(
                    finalColor, Color.minBlend([finalColor, reflectionColor]), surface.smoothness,
                );
            }
            return finalColor;
        } else {
            return this.clear;
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
