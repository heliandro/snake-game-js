import Apple from "../Apple";
import Items from "../Items";
import Snake from "../Snake";
import { CanvasDimension } from "../config";
import { Axis } from "../models/Axis";

export default class Collision {

    static checkSnakeCollisionInTheWall(character: Snake): Axis {
         let head = character.getHead();

        if (head.x < 0) {
            head.x = CanvasDimension.width;
        } else if (head.x >= CanvasDimension.width) {
            head.x = 0;
        } else if (head.y < 0) {
            head.y = CanvasDimension.height;
        } else if (head.y >= CanvasDimension.height) {
            head.y = 0;
        }

        return head;
    }

    static checkSnakeCollisionInTheItems(character: Snake, items: Items): Apple | null {
        let head = character.getHead();
        let apples = items.getApples();

        for (let apple of apples) {
            let appleX = apple.getData().fillOptions.x;
            let appleY = apple.getData().fillOptions.y;
        
            if (head.x === appleX && head.y === appleY) {
                return apple;
            }
        }
        return null;
    }
}