import GameCanvas from "./GameCanvas"
import { ScreenDimension } from "./models/ScreenDimension";
import StartScreen from "./screens/StartScreen";

export default class Engine {

    private gameCanvas: GameCanvas;
    private screenDimension: ScreenDimension;
    
    private startScreen: StartScreen;

    constructor() {
        this.screenDimension = new ScreenDimension(800, 600);
        this.gameCanvas = new GameCanvas(this.screenDimension);

        // screens
        this.startScreen = new StartScreen(this.gameCanvas.getContext(), this.screenDimension);
    }

    init() {
        this.startScreen.show();
    }

    clearScreen() {
        this.gameCanvas.getContext().clearRect(0, 0, this.screenDimension.width, this.screenDimension.height)
    }
}