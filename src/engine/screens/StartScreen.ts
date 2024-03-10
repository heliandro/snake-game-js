import { ScreenDimension } from '../models/ScreenDimension';
import { ScreenPosition } from '../utils';

export default class StartScreen {

    private canvasContext: CanvasRenderingContext2D;
    private screenDimension: ScreenDimension;
    private screenPosition: ScreenPosition;

    constructor(canvasContext: CanvasRenderingContext2D, screenDimension: ScreenDimension) {
        this.canvasContext = canvasContext;
        this.screenDimension = screenDimension;
        this.screenPosition = new ScreenPosition(this.screenDimension);
    }

    show() {
        this.canvasContext.fillStyle = 'black';
        this.canvasContext.fillRect(0, 0, this.screenDimension.width, this.screenDimension.height);

        this.canvasContext.fillStyle = 'white';
        this.canvasContext.font = '30px Arial';
        this.canvasContext.fillText('Snake Game', this.screenPosition.getX(-100), this.screenPosition.getY(-50));
        this.canvasContext.font = '20px Arial';
        this.canvasContext.fillText('Pressione qualquer tecla para começar', this.screenPosition.getX(-190), this.screenPosition.getY(50));
    }


}