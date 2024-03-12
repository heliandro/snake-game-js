import GameCanvas from "./GameCanvas"
import GameUI from "./GameUI";
import Items from "./Items";
import Snake from "./Snake";
import Collision from "./core/Collision";
import Controls from "./core/Controls";
import DrawObjecs from "./core/DrawObject";
import Movement from "./core/Movement";
import { Direction } from "./enums/Direction";
import { Axis } from "./models/Axis";
import StartScreen from "./screens/StartScreen";
import { PaintBrush } from "./utils/utils";

export default class Engine {

    private gameCanvas: GameCanvas;
    private paintBrush: PaintBrush;
    private drawObjects: DrawObjecs;
    private startScreen: StartScreen;
    private snake: Snake;
    private gameItems: Items;
    private gameUI: GameUI;
    private applesEaten: number = 0;
    private gameAnimationIntervalRef: any;
    private isGameRunning = true;
    private isGameStarted = false;

    constructor() {
        this.gameCanvas = new GameCanvas();
        const context = this.gameCanvas.getContext();
        this.paintBrush = new PaintBrush(context);
        this.drawObjects = new DrawObjecs(this.paintBrush);
        this.startScreen = new StartScreen(context);
        this.snake = new Snake(context);
        this.gameItems = new Items(context);
        this.gameUI = new GameUI();
        this.gameUI.updateUI(this.applesEaten, this.snake.getSnakeSpeed());
    }

    init() {
        this.startScreen.show();
        document.addEventListener('keydown', this.startGameEvent.bind(this));
    }

    private pauseGame() {
        this.isGameRunning = !this.isGameRunning;
        if (this.isGameRunning === false)
            clearInterval(this.gameAnimationIntervalRef);
        else
            this.startGameLoop();
    }

    private initCharacter(character: Snake) {
        this.drawObjects.character(character);
        character.toggleFirstPosition();
        this.updateGameCharacterMovement(character);
    }

    private updateGameIfControlKeysIsPressed(character: Snake) {
        document.addEventListener('keydown', (event) => {
            let keyPressed = Controls.getKeyPressed(event);
            if (keyPressed.includes('Space')) {
                this.pauseGame();
            } else if (keyPressed) {
                character.changeDirection(keyPressed as Direction);
            }
        });
    }

    startGameEvent(event: KeyboardEvent): void {
        if (event.key === 'Enter' && !this.isGameStarted) {
            let character = this.snake;

            this.paintBrush.clearScreen();
            this.initCharacter(character);
            this.gameUI.showUI();
            this.updateGameIfControlKeysIsPressed(character);
            this.startGameLoop();
            this.isGameStarted = true;
        }
    }

    private teleportSnake(headAxis: Axis, character: Snake) {
        let parts = character.getParts();
        parts[0] = headAxis;
        character.updateParts(parts);
    }

    private updateGameIfSnakeCollidedWithWall(character: Snake) {
        let newHeadAxis: Axis = Collision.checkSnakeCollisionInTheWall(character);
        this.teleportSnake(newHeadAxis, character);
    }

    private updateGameIfSnakeCollidedWithApple(character: Snake, items: Items) {
        let appleCollided = Collision.checkSnakeCollisionInTheItems(character, items);
        if (appleCollided) {
            items.removeItem(appleCollided);
            character.eat();
            this.applesEaten++;
        }
    }

    private updateGameIfNoMoreApples(items: Items, character: Snake) {
        if (items.getApples().length === 0) {
            character.increaseSnakeSpeed();
            items.createNewApplesWithSnakeEatAll();
            clearInterval(this.gameAnimationIntervalRef);
            this.startGameLoop();
        }
    }

    private updateGameCharacterMovement(character: Snake) {
        character = Movement.updateCharacterMovement(character);
        this.drawObjects.character(character);
    }

    public startGameLoop() {
        let character = this.snake;
        let items = this.gameItems;
        this.gameAnimationIntervalRef = setInterval(() => {
            this.paintBrush.clearScreen();
            items.draw();
            this.updateGameCharacterMovement(character);
            this.updateGameIfSnakeCollidedWithWall(character);
            this.updateGameIfSnakeCollidedWithApple(character, items);
            this.updateGameIfNoMoreApples(items, character);
            this.gameUI.updateUI(this.applesEaten, character.getSnakeSpeed());
        }, character.getSnakeSpeed());
    }
}