import { ScreenDimension } from "./models/ScreenDimension";

export class ScreenPosition {

    private screenDimension: ScreenDimension;

    constructor(screenDimension: ScreenDimension) {
        this.screenDimension = screenDimension;
    }

    public getX(pos: number): number {
        return this.screenDimension.width / 2 + pos;
    }

    public getY(pos: number) {
        return this.screenDimension.height / 2 + pos
    }
}