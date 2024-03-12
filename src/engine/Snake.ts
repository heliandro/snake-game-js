import { CanvasGridSize } from "./config";
import { Direction } from './enums/Direction';
import { Axis } from "./models/Axis";

export interface SnakePart extends Axis {

}

export default class Snake {

    private snake: SnakePart[] = [];
    private snakeSize: number = 3;
    private newDirection: Direction = Direction.Left;
    private currentDirection: Direction = Direction.Left;
    private firstPosition = true;
    private snakeSpeed = 300;

    constructor(readonly context: CanvasRenderingContext2D) {
        this.initializeSnake();
    }

    private initializeSnake() {
        for (let i = 0; i < this.snakeSize; i++) {
            this.snake.push({ x: i * CanvasGridSize, y: CanvasGridSize });
        }
    }

    public getParts(): SnakePart[] {
        return [...this.snake];
    }

    public updateParts(snakeParts: SnakePart[]) {
        this.snake = snakeParts;
    }

    public getHead(): { x: number, y: number } {
        return { ...this.snake[0] };
    }

    public getSnakeSpeed(): number {
        return this.snakeSpeed;
    }

    public isFirstPosition(): boolean {
        return this.firstPosition;
    }

    public toggleFirstPosition() {
        this.firstPosition = !this.firstPosition;
    }

    public eat() {
        const snakeTail = { ...this.snake[this.snake.length - 1] };
        this.snake.push({ x: snakeTail.x * CanvasGridSize, y: CanvasGridSize });
    }

    public getNewDirection(): Direction {
        return this.newDirection;
    }

    public changeDirection(direction: Direction) {
        this.newDirection = direction;
    }

    public getCurrentDirection(): Direction {
        return this.currentDirection;
    }

    public setCurrentDirection(direction: Direction) {
        this.currentDirection = direction;
    }

    public increaseSnakeSpeed() {
        if (this.snakeSpeed <= 25)
            return;
        this.snakeSpeed -= 25;
    }
}