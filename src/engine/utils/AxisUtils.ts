import { CanvasGridSize } from "../config";
import { Axis } from "../models/Axis";

export default class AxisUtils {

    static updateAxisToUp(axis: Axis): Axis {
        axis.y -= 1 * CanvasGridSize;
        return axis;
    }

    static updateAxisToDown(axis: Axis): Axis {
        axis.y += 1 * CanvasGridSize;
        return axis;
    }

    static updateAxisToLeft(axis: Axis): Axis {
        axis.x -= 1 * CanvasGridSize;
        return axis;
    }

    static updateAxisToRight(axis: Axis): Axis {
        axis.x += 1 * CanvasGridSize;
        return axis;
    }
}