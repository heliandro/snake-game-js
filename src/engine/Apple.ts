import { CanvasDimension, CanvasGridSize } from "./config";
import { Color } from "./enums/Color";
import { FillOptions } from "./utils/utils";

export default class Apple {

    private x: number;
    private y: number;
    private width: number;
    private height: number;

    constructor() {
        this.x = Math.floor(Math.random() * ((CanvasDimension.width) / CanvasGridSize)) * CanvasGridSize;
        this.y = Math.floor(Math.random() * ((CanvasDimension.height) / CanvasGridSize)) * CanvasGridSize;
        this.width = CanvasGridSize;
        this.height = CanvasGridSize;
    }

    public getData(): { fillOptions: FillOptions, color: Color } {
        return {
            fillOptions: {
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height
            },
            color: Color.red
        }
    }

    public equals(item: Apple) {
        return this.x === item.getData().fillOptions.x && this.y === item.getData().fillOptions.y;
    }
}