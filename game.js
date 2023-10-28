let canvas = document.createElement("canvas");
let context = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 700;

document.body.appendChild(canvas);

let backgroundReady = false;
let backgroundImg = new Image();

backgroundImg.src = "market.png";

backgroundImg.onload = function () {
    backgroundReady = true;
};

let heroReady = false;
let heroImg = new Image();

heroImg.src = "hero-sprite-sheet.png"

heroImg.onload = function () {
    heroReady = true;
};

let hero = {
    speed: 3,
    x: 0,
    y: 0
};


let keyPresses = {};

document.addEventListener('keydown', keyDownListener, false);
function keyDownListener(event) {
    keyPresses[event.key] = true;
}

document.addEventListener('keyup', keyUpListener, false);
function keyUpListener(event) {
    keyPresses[event.key] = false;
}


let walkCycle = [0, 1, 2, 3];

let walkIndex = 0;

let width = 64;

let height = 64;

let SCALE = 2;

let SCALED_WIDTH = SCALE * width;

let SCALED_HEIGHT = SCALE * height;


function drawFrame(frameX, frameY, canvasX, canvasY) {
    context.drawImage(
        heroImg,
        frameX * width,
        frameY * height,
        width,
        height,
        canvasX,
        canvasY,
        SCALED_WIDTH,
        SCALED_HEIGHT
    );
}

let hasMoved = false;

const DOWN = 0;
const UP = 3;
const LEFT = 1;
const RIGHT = 2;
let currentDirection = DOWN;

function moveHero() {

    if (keyPresses['ArrowUp'] || keyPresses['w']) {
        hero.y -= hero.speed;
        hasMoved = true;
        currentDirection = UP;
    }
    if (keyPresses['ArrowDown'] || keyPresses['s']) {
        hero.y += hero.speed;
        hasMoved = true;
        currentDirection = DOWN;
    }
    if (keyPresses['ArrowLeft'] || keyPresses['a']) {
        hero.x -= hero.speed;
        hasMoved = true;
        currentDirection = LEFT;
    }
    if (keyPresses['ArrowRight'] || keyPresses['d']) {
        hero.x += hero.speed;
        hasMoved = true;
        currentDirection = RIGHT;
    }

    if(hasMoved) {
        walkIndex++
        if (walkIndex >= walkCycle.length) {
            walkIndex = 0;
        }
        hasMoved = false
    }
    drawFrame(walkCycle[walkIndex], currentDirection, hero.x, hero.y);
}


function loadImage() {
    if (backgroundReady) {
        context.drawImage(backgroundImg, 0, 0);
    }
}
function gameLoop() {
    loadImage();
    moveHero();
    requestAnimationFrame(gameLoop);
}

gameLoop();