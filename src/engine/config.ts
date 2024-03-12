import { ScreenDimension } from './models/ScreenDimension';

const CanvasWidth = 40;
const CanvasHeight = 30;
export const CanvasGridSize: number = 20;
export const CanvasDimension: ScreenDimension = new ScreenDimension(CanvasWidth * CanvasGridSize, CanvasHeight * CanvasGridSize);
