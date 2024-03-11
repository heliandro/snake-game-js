import GameCanvas from "./GameCanvas"
import GameUI from "./GameUI";
import Items from "./Items";
import Snake from "./Snake";
import { Color } from "./enums/Color";
import { Direction } from "./enums/Direction";
import StartScreen from "./screens/StartScreen";
import { PaintBrush } from "./utils";

export default class Engine {

    private gameCanvas: GameCanvas;
    private paintBrush: PaintBrush;
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

        // screens
        this.startScreen = new StartScreen(context);

        // init snake
        this.snake = new Snake(context);

        // init items
        this.gameItems = new Items(context);

        // game ui
        this.gameUI = new GameUI();
        this.gameUI.updateUI(this.applesEaten, this.snake.getSnakeSpeed());
    }

    init() {
        this.startScreen.show();
        document.addEventListener('keydown', this.startGameEvent.bind(this));
    }

    startGameEvent(event: KeyboardEvent): void {
        if (event.key === 'Enter' && !this.isGameStarted) {
            this.snake.init();
            this.gameUI.showUI();
            document.addEventListener('keydown', this.initControls.bind(this));
            this.startAnimationFrame();
            this.isGameStarted = true;
        }
    }

    clearScreen() {
        this.gameCanvas.clear();
        this.paintBrush.fillBackground(Color.black);
    }

    initControls(event: KeyboardEvent) {
        switch (event.key) {
            case 'ArrowUp':
                this.snake.changeDirection(Direction.Up);
                break;
            case 'ArrowDown':
                this.snake.changeDirection(Direction.Down);
                break;
            case 'ArrowLeft':
                this.snake.changeDirection(Direction.Left);
                break;
            case 'ArrowRight':
                this.snake.changeDirection(Direction.Right);
                break;
            case 'Enter':
                break;
            case ' ':
                this.isGameRunning = !this.isGameRunning;
                if (this.isGameRunning === false)
                    clearInterval(this.gameAnimationIntervalRef);
                else
                    this.startAnimationFrame();
                break;
        }
    }

    public startAnimationFrame() {

        this.gameAnimationIntervalRef = setInterval(() => {
            this.paintBrush.clearScreen();
            this.gameItems.draw();
            this.snake.drawAndMove();

            this.checkSnakeAndAppleColission();
            if (this.gameItems.getApples().length === 0) {
                this.snake.increaseSnakeSpeed();
                this.gameItems.createNewApplesWithSnakeEatAll();
                clearInterval(this.gameAnimationIntervalRef);
                this.startAnimationFrame();
            }

            this.gameUI.updateUI(this.applesEaten, this.snake.getSnakeSpeed());
        }, this.snake.getSnakeSpeed());
    }

    public checkSnakeAndAppleColission() {
        let head = this.snake.getHead();
        let apples = this.gameItems.getApples();

        for (let apple of apples) {
            let appleX = apple.getData().fillOptions.x;
            let appleY = apple.getData().fillOptions.y;
        
            if (head.x === appleX && head.y === appleY) {
                this.gameItems.removeItem(apple);
                this.snake.eat();
                this.applesEaten++;
            }
        }
    }
}