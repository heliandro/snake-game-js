import Apple from "./Apple";
import { PaintBrush } from "./utils/utils";

export default class Items {

    private apples: Apple[] = [];
    private appleQtd: number = 3;

    private paintBrush: PaintBrush;

    constructor(context: CanvasRenderingContext2D) {
        this.paintBrush = new PaintBrush(context);
        this.createItems(this.appleQtd);
    }

    createItems(quantity: number): Apple[] {
        let i = 0;
        while (i < quantity) {
            let apple = new Apple();

            if (i > 0 && this.isAppleColidedWithAnother(apple)) {
                continue;
            }

            i++;
            this.apples.push(apple);
        }

        return this.apples;
    }

    draw() {
        this.apples.forEach(apple => {
            this.paintBrush.drawPixel(apple.getData().fillOptions, apple.getData().color);
        })
    }

    isAppleColidedWithAnother(colidedApple: Apple) {
        return this.apples.some(apple => apple.equals(colidedApple));
    }

    removeItem(colidedApple: Apple) {
        this.apples = this.apples.filter(apple => !apple.equals(colidedApple));
    }

    getApples(): Apple[] {
        return this.apples;
    }

    createNewApplesWithSnakeEatAll() {
        if (this.apples.length === 0) {
            this.createItems(this.appleQtd);
        }
    }
}