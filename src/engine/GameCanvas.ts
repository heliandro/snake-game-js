import { CanvasDimension } from './config';

export default class GameCanvas {

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D | null;

    constructor() {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = CanvasDimension.width;
        this.canvas.height = CanvasDimension.height;
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

    public clear() {
        this.getContext().clearRect(0, 0, CanvasDimension.width, CanvasDimension.height);
    }
}