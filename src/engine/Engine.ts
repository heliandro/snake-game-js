import GameCanvas from "./GameCanvas"
import StartScreen from "./screens/StartScreen";

export default class Engine {

    private gameCanvas: GameCanvas;
    
    private startScreen: StartScreen;

    constructor() {
        this.gameCanvas = new GameCanvas();
        const context = this.gameCanvas.getContext();

        // screens
        this.startScreen = new StartScreen(context);
    }

    init() {
        this.startScreen.show();
    }

    clearScreen() {
        this.gameCanvas.clear();
    }
}