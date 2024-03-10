import { CanvasDimension } from "./config";
import { Colors } from "./enums/Colors";
import { TextType } from "./enums/TextType";
import { Position } from "./models/Position";

export class ScreenPosition {

    public static getX(pos: number, centerAlign: boolean = true): number {
        if (!centerAlign)
            return pos;
        return CanvasDimension.width / 2 + pos;
    }

    public static getY(pos: number, centerAlign: boolean = true) {
        if (!centerAlign)
            return pos;
        return CanvasDimension.height / 2 + pos
    }
}

export class FillOptions {
    x: number;
    y: number;
    width: number;
    height: number;

    constructor(x: number = 0, y: number = 0, width: number = CanvasDimension.width, height: number = CanvasDimension.height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}


export class PaintBrush {

    constructor(readonly context: CanvasRenderingContext2D) {}

    public fillBackground(color: Colors, fillOptions?: FillOptions) {
        this.context.fillStyle = color;
        const options = fillOptions || new FillOptions();
        this.context.fillRect(options.x, options.y, options.width, options.height);
    }

    public drawText(message: string, color: Colors, type: TextType, position: Position) {
        this.context.fillStyle = color;
        this.context.font = type;
        this.context.fillText(message, ScreenPosition.getX(position.x), ScreenPosition.getY(position.y));
    }
}