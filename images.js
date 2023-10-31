import { canvas, context } from "./canvas.js";

export let backgroundReady = false;
export let backgroundImg = new Image();

backgroundImg.src = "field.png";

backgroundImg.onload = function () {
    backgroundReady = true;
};

export let houseReady = false;
export let houseImg = new Image();

houseImg.src = "house.png";

houseImg.onload = function () {
    houseReady = true;
};

export let enemyReady = false;
export let enemyImg = new Image();

enemyImg.src = "enemy-sprite-sheet.png"

enemyImg.onload = function () {
    enemyReady = true;
};

export let heroReady = false;
export let heroImg = new Image();

heroImg.src = "hero-sprite-sheet.png";

heroImg.onload = function () {
    heroReady = true;
};

export function loadImages() {
    if (backgroundReady) {
        context.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
    }

    if (houseReady) {
        context.drawImage(houseImg, 0, 0);
    }
}