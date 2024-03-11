import { ScreenDimension } from './models/ScreenDimension';

const CanvasWidth = 80;
const CanvasHeight = 60;
export const CanvasGridSize: number = 10;
export const CanvasDimension: ScreenDimension = new ScreenDimension(CanvasWidth * CanvasGridSize, CanvasHeight * CanvasGridSize);
