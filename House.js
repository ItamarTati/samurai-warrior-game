import {houseImg} from "./images.js";

class House {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = houseImg.width - 60;
        this.height = houseImg.height - 60;
    }
}

export default House;