import Snake, { SnakePart } from "../Snake";
import { Direction } from "../enums/Direction";
import AxisUtils from "../utils/AxisUtils";

export default class Movement {

    static updateCharacterMovement(character: Snake): Snake {
        let newDirection = character.getNewDirection();
   
        switch (newDirection) {
            case Direction.Up:
                Movement.checkCharacterMovementAndChangeToUp(character);
                break;
            case Direction.Down:
                Movement.checkCharacterMovementAndChangeToDown(character);
                break;
            case Direction.Left:
                Movement.checkCharacterMovementAndChangeToLeft(character);
                break;
            case Direction.Right:
                Movement.checkCharacterMovementAndChangeToRight(character);
                break;
        }
        return character;
    }

    private static updateCharacterBody(updatedHead: SnakePart, character: Snake) {
        let parts = character.getParts();
        parts.unshift(updatedHead);
        parts.pop();
        character.updateParts(parts)
    }

    private static checkCharacterMovementAndChangeToUp(character: Snake) {
        let head = character.getHead();
        if (character.getCurrentDirection() === Direction.Down) {
            head = AxisUtils.updateAxisToDown(head);
            character.changeDirection(Direction.Down);
        } else {
            head = AxisUtils.updateAxisToUp(head);
            character.setCurrentDirection(Direction.Up);
        }
        Movement.updateCharacterBody(head, character);
    }

    private static checkCharacterMovementAndChangeToDown(character: Snake) {
        let head = character.getHead();
        if (character.getCurrentDirection() === Direction.Up) {
            head = AxisUtils.updateAxisToUp(head);
            character.changeDirection(Direction.Up);
        } else {
            head = AxisUtils.updateAxisToDown(head);
            character.setCurrentDirection(Direction.Down);
        }
        Movement.updateCharacterBody(head, character);
    }

    private static checkCharacterMovementAndChangeToLeft(character: Snake) {
        let head = character.getHead();
        if (character.getCurrentDirection() === Direction.Right) {
            head = AxisUtils.updateAxisToRight(head);
            character.changeDirection(Direction.Right);
        } else {
            head = AxisUtils.updateAxisToLeft(head);
            character.setCurrentDirection(Direction.Left);
        }
        Movement.updateCharacterBody(head, character);
    }

    private static checkCharacterMovementAndChangeToRight(character: Snake) {
        let head = character.getHead();
        if (character.getCurrentDirection() === Direction.Left) {
            head = AxisUtils.updateAxisToLeft(head);
            character.changeDirection(Direction.Left);
        } else {
            head = AxisUtils.updateAxisToRight(head);
            character.setCurrentDirection(Direction.Right);
        }
        Movement.updateCharacterBody(head, character);
    }
}