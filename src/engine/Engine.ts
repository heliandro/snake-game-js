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

    private applesEaten: number = 0;

    private gameUI: GameUI;

    private gameAnimationIntervalRef: any;
    private isGameRunning = true;

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
        this.gameUI.updateUI(this.applesEaten, 0, this.snake.getSnakeSpeed());
    }

    init() {
        this.startScreen.show();
        document.addEventListener('keydown', (event) => this.startGameEvent(event));
    }

    startGameEvent(event: KeyboardEvent): void {
        if (event.key.includes('Enter')) {
            console.log('key down: ' + event.key);
            this.snake.init();
            document.addEventListener('keydown', (event) => this.initControls(event));
            this.startAnimationFrame();
        }
    }

    clearScreen() {
        this.gameCanvas.clear();
        this.paintBrush.fillBackground(Color.black);
    }

    initControls(event: KeyboardEvent) {
        document.removeEventListener('keydown', (event) => this.startGameEvent(event));

        console.log(event.key)
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
            case ' ':
                this.isGameRunning = !this.isGameRunning;
                if (this.isGameRunning === false)
                    clearInterval(this.gameAnimationIntervalRef);
                else
                    this.startAnimationFrame();
        }
    }

    public startAnimationFrame() {
        // this.paintBrush.clearScreen();

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

            this.gameUI.updateUI(this.applesEaten, 0, this.snake.getSnakeSpeed());
        }, this.snake.getSnakeSpeed());
    }

    public checkSnakeAndAppleColission() {
        let head = this.snake.getHead();
        let apples = this.gameItems.getApples();

        for (let apple of apples) {
            let appleX = apple.getData().fillOptions.x;
            let appleY = apple.getData().fillOptions.y;
        
            if (head.x === appleX && head.y === appleY) {
                console.log('houve colisao!');
                this.gameItems.removeItem(apple);
                this.snake.eat();
                this.applesEaten++;
            }
        }
    }
}