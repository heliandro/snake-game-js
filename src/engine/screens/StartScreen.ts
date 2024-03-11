import { Strings } from '../Strings';
import { Color } from '../enums/Color';
import { TextType } from '../enums/TextType';

import { PaintBrush } from '../utils';

export default class StartScreen {
    
    private PaintBrush: PaintBrush;

    constructor(readonly canvasContext: CanvasRenderingContext2D) {
        this.PaintBrush = new PaintBrush(this.canvasContext);
    }

    show() {
        this.PaintBrush.fillBackground(Color.black);
        this.PaintBrush.drawText(Strings.title, Color.white, TextType.title, { x: -100, y: -50 });
        this.PaintBrush.drawText(Strings.subTitle, Color.white, TextType.subTitle, { x: -190, y: 50 });
    }
}