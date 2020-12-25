import {COLOR_SIZE, IColor} from './index';

export interface IImageBuffer {

    readonly width: number;

    readonly height: number;

    set(x: number, y: number, color: IColor): void;

    get(x: number, y: number): IColor;
}

export interface IImageBufferOptions {
    width: number;

    height: number;
}

export class ImageBuffer implements IImageBuffer {

    readonly width: number;

    readonly height: number;

    private readonly buffer: number[];

    constructor(options: IImageBufferOptions) {
        const size = options.width * options.height * COLOR_SIZE;
        this.buffer = new Array<number>(size);
        for (let i = 0; i < size; i += 1) {
            this.buffer[i] = 0;
        }
        this.width = options.width;
        this.height = options.height;
    }

    private index(x: number, y: number): number {
        return (y * this.width + x) * COLOR_SIZE;
    }

    get(x: number, y: number): IColor {
        const index = this.index(x, y);
        return (this.buffer.slice(index, index + COLOR_SIZE) as unknown as IColor);
    }

    set(x: number, y: number, color: IColor) {
        const index = this.index(x, y);
        for (let i = 0; i < COLOR_SIZE; i += 1) {
            this.buffer[index + i] = color[i];
        }
    }

}
