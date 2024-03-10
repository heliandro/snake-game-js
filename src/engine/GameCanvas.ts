import { ScreenDimension } from './models/ScreenDimension';

export default class GameCanvas {

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D | null;
    private screenDimension: ScreenDimension;

    constructor(screenDimension: ScreenDimension) {
        this.screenDimension = screenDimension;
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = this.screenDimension.width;
        this.canvas.height = this.screenDimension.height;
        document.body.appendChild(this.canvas);
    }

    public getCanvas(): HTMLCanvasElement {
        return this.canvas;
    }

    public getContext(): CanvasRenderingContext2D {
        if (!this.context)
            throw new Error('');
        return this.context;
    }
}