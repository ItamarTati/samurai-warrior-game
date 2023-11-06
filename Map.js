import { context } from "./canvas.js";
import {backgroundImg, backgroundReady} from "./images.js";

class Map {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    draw(offsetX, offsetY) {
        if (backgroundReady) {
            context.drawImage(backgroundImg, 0, 0, this.width, this.height, -offsetX, -offsetY, this.width, this.height);
        }
    }

    isWithinBoundaries(x, y) {
        return x >= 0 && x <= this.width && y >= 0 && y <= this.height;
    }
}

export default Map;