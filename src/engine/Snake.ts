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
    private newDirection: Direction = Direction.Left;
    private currentDirection: Direction = Direction.Left;
    private firstPosition = true;
    private snakeSpeed = 300;
    private paintBrush: PaintBrush;

    constructor(readonly context: CanvasRenderingContext2D) {
        this.paintBrush = new PaintBrush(this.context);
    }

    public init() {
        this.initializeSnake();
        this.draw();
        this.firstPosition = false;
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
        this.newDirection = direction;
    }

    public drawAndMove() {
        let extractedHead = this.getHead();

        switch (this.newDirection) {
            case Direction.Up:
                extractedHead = this.checkAndMoveToUp(extractedHead);
                break;
            case Direction.Down:
                extractedHead = this.checkAndMoveToDown(extractedHead);
                break;
            case Direction.Left:
                extractedHead = this.checkAndMoveToLeft(extractedHead);
                break;
            case Direction.Right:
                extractedHead = this.checkAndMoveToRight(extractedHead);
                break;
        }

        this.snake.unshift(extractedHead);
        this.snake.pop();
        this.checkWallColission();
        this.draw();
    }

    private checkAndMoveToUp(extractedHead: SnakePart) {
        if (this.currentDirection === Direction.Down) {
            extractedHead.y += 1 * CanvasGridSize;
            this.newDirection = Direction.Down;
        } else {
            extractedHead.y -= 1 * CanvasGridSize;
            this.currentDirection = Direction.Up
        }
        return extractedHead;
    }

    private checkAndMoveToDown(extractedHead: SnakePart) {
        if (this.currentDirection === Direction.Up) {
            extractedHead.y -= 1 * CanvasGridSize;
            this.newDirection = Direction.Up;
        } else {
            extractedHead.y += 1 * CanvasGridSize;
            this.currentDirection = Direction.Down
        }
        return extractedHead;
    }

    private checkAndMoveToLeft(extractedHead: SnakePart) {
        if (this.currentDirection === Direction.Right) {
            extractedHead.x += 1 * CanvasGridSize;
            this.newDirection = Direction.Right;
        } else {
            extractedHead.x -= 1 * CanvasGridSize;
            this.currentDirection = Direction.Left
        }
        return extractedHead;
    }

    private checkAndMoveToRight(extractedHead: SnakePart) {
        if (this.currentDirection === Direction.Left) {
            extractedHead.x -= 1 * CanvasGridSize;
            this.newDirection = Direction.Left;
        } else {
            extractedHead.x += 1 * CanvasGridSize;
            this.currentDirection = Direction.Right
        }
        return extractedHead;
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
        if (this.snakeSpeed <= 25)
            return;
        this.snakeSpeed -= 25;
    }
}