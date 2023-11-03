import {canvas, context} from "./canvas.js";
import {backgroundImg, backgroundReady} from "./images.js";

class Map {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    draw() {
        if (backgroundReady) {
            context.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
        }
    }

    isWithinBoundaries(x, y) {
        return x >= 0 && x <= this.width && y >= 0 && y <= this.height;
    }
}

export default Map;