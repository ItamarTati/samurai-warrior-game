import {context} from "./canvas.js";
import {backgroundImg, backgroundReady} from "./images.js";

class Map {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    draw(offsetX, offsetY) {
        if (backgroundReady) {
            const mapWidth = this.width;
            const mapHeight = this.height;

            const repeatX = 2
            const repeatY = 2

            const startX = -offsetX % mapWidth;
            const startY = -offsetY % mapHeight;

            for (let x = -1; x < repeatX; x++) {
                for (let y = -1; y < repeatY; y++) {
                    const drawX = startX + x * mapWidth;
                    const drawY = startY + y * mapHeight;
                    context.drawImage(backgroundImg, 0, 0, mapWidth, mapHeight, drawX, drawY, mapWidth, mapHeight);
                }
            }
        }
    }

    isWithinBoundaries(x, y) {
        return x >= 0 && x <= this.width && y >= 0 && y <= this.height;
    }
}

export default Map;