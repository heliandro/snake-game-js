import { Direction } from "../enums/Direction";

export default class Controls {

    static getKeyPressed(event: KeyboardEvent): Direction | string {
        switch (event.key) {
            case 'ArrowUp':
                return Direction.Up;
            case 'ArrowDown':
                return Direction.Down;
            case 'ArrowLeft':
                return Direction.Left;
            case 'ArrowRight':
                return Direction.Right;
            case 'Enter':
                return '';
            case ' ':
                return 'Space'
            default:
                return '';
        }
    }
}