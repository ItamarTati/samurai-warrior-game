import {houseImg, houseReady} from "./images.js";
import {context} from "./canvas.js";

class House {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = houseImg.width;
        this.height = houseImg.height;
    }

    draw() {
        if (houseReady) {
            context.drawImage(houseImg, this.x, this.y);
        }
    }
}

export default House;