import { Strings } from '../Strings';
import { Colors } from '../enums/Colors';
import { TextType } from '../enums/TextType';

import { PaintBrush } from '../utils';

export default class StartScreen {
    
    private PaintBrush: PaintBrush;

    constructor(readonly canvasContext: CanvasRenderingContext2D) {
        this.PaintBrush = new PaintBrush(this.canvasContext);
    }

    show() {
        this.PaintBrush.fillBackground(Colors.black);
        this.PaintBrush.drawText(Strings.title, Colors.white, TextType.title, { x: -100, y: -50 });
        this.PaintBrush.drawText(Strings.subTitle, Colors.white, TextType.subTitle, { x: -190, y: 50 });
    }
}