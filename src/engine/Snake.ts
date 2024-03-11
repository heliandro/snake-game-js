import { CanvasDimension, CanvasGridSize } from "./config";
import { Color } from "./enums/Color";
import { Direction } from "./enums/Direction";
import { FillOptions, PaintBrush, ScreenPosition } from "./utils";

interface SnakePart {
    x: number
    y: number
}

export default class Snake {

    private snake: { x: number, y: number }[] = [];
    private snakeSize: number = 3;
    private direction: Direction = Direction.Left;
    private firstPosition = true;
    private snakeSpeed = 300; // millisseconds

    private paintBrush: PaintBrush;

    constructor(readonly context: CanvasRenderingContext2D) {
        this.paintBrush = new PaintBrush(this.context);
    }

    public init() {
        this.initializeSnake();
        this.draw();
        this.drawAndMove();
    }

    private initializeSnake() {
        for (let i = 0; i < this.snakeSize; i++) {
            this.snake.push({ x: i * CanvasGridSize, y: CanvasGridSize });
        }
    }

    private draw() {

        for (let i = 0; i < this.snake.length; i++) {
            let fillOptions: FillOptions = {
                x: ScreenPosition.getX(this.snake[i].x, this.firstPosition),
                y: ScreenPosition.getY(this.snake[i].y, this.firstPosition),
                width: CanvasGridSize,
                height: CanvasGridSize
            }
            
            this.snake[i].x = fillOptions.x;
            this.snake[i].y = fillOptions.y;

            if (i > 0) {
                this.paintBrush.drawPixel(fillOptions, Color.green);
            } else {
                this.paintBrush.drawPixel(fillOptions, Color.yellow);
            }
        }
    }

    public getSnakeSpeed(): number {
        return this.snakeSpeed;
    }

    public getHead(): { x: number, y: number } {
        return { ...this.snake[0] };
    }

    public eat() {
        const snakeTail = { ...this.snake[this.snake.length - 1] };
        this.snake.push({ x: snakeTail.x * CanvasGridSize, y: CanvasGridSize });
    }

    public changeDirection(direction: Direction) {
        this.direction = direction;
    }

    public drawAndMove() {
        this.firstPosition = false;

        let extractedHead = this.getHead();

        switch (this.direction) {
            case Direction.Up:
                extractedHead.y -= 1 * CanvasGridSize;
                break;
            case Direction.Down:
                extractedHead.y += 1 * CanvasGridSize;
                break;
            case Direction.Left:
                extractedHead.x -= 1 * CanvasGridSize;
                break;
            case Direction.Right:
                extractedHead.x += 1 * CanvasGridSize;
                break;
        }

        this.snake.unshift(extractedHead);
        this.snake.pop();

        this.checkWallColission();

        this.draw();
    }

    public checkWallColission() {
         let head = this.snake[0];

        if (head.x < 0) {
            head.x = CanvasDimension.width - CanvasGridSize;
        } else if (head.x >= CanvasDimension.width) {
            head.x = CanvasGridSize;
        } else if (head.y < 0) {
            head.y = CanvasDimension.height - CanvasGridSize;
        } else if (head.y >= CanvasDimension.height) {
            head.y = CanvasGridSize;
        }
    }

    public increaseSnakeSpeed() {
        if (this.snakeSpeed <= 10) 
            return;
        this.snakeSpeed -= 30;
    }
}