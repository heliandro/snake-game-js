import Snake from "../Snake";
import { CanvasGridSize } from "../config";
import { Color } from "../enums/Color";
import { FillOptions, PaintBrush, ScreenPosition } from "../utils/utils";

export default class DrawObjecs {

    constructor(readonly paintBrush: PaintBrush) {}

    public character(character: Snake) {
        let parts = character.getParts();
        let firstPosition = character.isFirstPosition();

        for (let i = 0; i < parts.length; i++) {
            let fillOptions: FillOptions = {
                x: ScreenPosition.getX(parts[i].x, firstPosition),
                y: ScreenPosition.getY(parts[i].y, firstPosition),
                width: CanvasGridSize,
                height: CanvasGridSize
            }
            
            parts[i].x = fillOptions.x;
            parts[i].y = fillOptions.y;

            if (i > 0) {
                this.paintBrush.drawPixel(fillOptions, Color.green);
            } else {
                this.paintBrush.drawPixel(fillOptions, Color.yellow);
            }
        }
        character.updateParts(parts);
    }
}