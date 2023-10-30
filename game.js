let canvas = document.createElement("canvas");
let context = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 600;

document.body.appendChild(canvas);

let backgroundReady = false;
let backgroundImg = new Image();

backgroundImg.src = "field.png";

backgroundImg.onload = function () {
    backgroundReady = true;
};

let enemyReady = false;
let enemyImg = new Image();

enemyImg.src = "enemy-sprite-sheet.png"

enemyImg.onload = function () {
    enemyReady = true;
};

let enemy = {
    speed: 15,
    x: 500,
    y: 300,
    health: 200
};


let heroReady = false;
let heroImg = new Image();

heroImg.src = "hero-sprite-sheet.png"

heroImg.onload = function () {
    heroReady = true;
};

let hero = {
    speed: 15,
    x: 500,
    y: 300,
    health: 2000
};

let houseReady = false;
let houseImg = new Image();

houseImg.src = "house.png";

houseImg.onload = function () {
    houseReady = true;
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
let SCALE = 1;
let SCALED_WIDTH = SCALE * width;
let SCALED_HEIGHT = SCALE * height;
let hasMoved = false;
const DOWN = 0;
const UP = 3;
const LEFT = 1;
const RIGHT = 2;
let currentDirection = DOWN;

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

function animateHeroSprite() {
    if (hasMoved) {
        walkIndex++;
        hasMoved = false;
        if (walkIndex >= walkCycle.length) {
            walkIndex = 0;
        }
    }
    drawFrame(walkCycle[walkIndex], currentDirection, hero.x, hero.y);
}

function moveHero() {
    handleMovement();
    animateHeroSprite();
}

function handleMovement() {
    if (isMovingUp()) {
        moveUp();
    } else if (isMovingDown()) {
        moveDown();
    } else if (isMovingLeft()) {
        moveLeft();
    } else if (isMovingRight()) {
        moveRight();
    }
}

function isMovingUp() {
    return keyPresses['ArrowUp'] || keyPresses['w'];
}

function isMovingDown() {
    return keyPresses['ArrowDown'] || keyPresses['s'];
}

function isMovingLeft() {
    return keyPresses['ArrowLeft'] || keyPresses['a'];
}

function isMovingRight() {
    return keyPresses['ArrowRight'] || keyPresses['d'];
}

function moveUp() {
    currentDirection = UP;
    if (canMoveUp()) {
        hero.y -= hero.speed;
    }
    hasMoved = true;
}

function moveDown() {
    currentDirection = DOWN;
    if (canMoveDown()) {
        hero.y += hero.speed;
    }
    hasMoved = true;
}

function moveLeft() {
    currentDirection = LEFT;
    if (canMoveLeft()) {
        hero.x -= hero.speed;
    }
    hasMoved = true;
}

function moveRight() {
    currentDirection = RIGHT;
    if (canMoveRight()) {
        hero.x += hero.speed;
    }
    hasMoved = true;
}

function canMoveUp() {
    return isNotLeavingTheMapGoingUp() && !isCollidingWithHouse();
}

function canMoveDown() {
    return isNotLeavingTheMapGoingDown();
}

function canMoveLeft() {
    return isNotLeavingTheMapGoingLeft() && !isCollidingWithHouse();
}

function canMoveRight() {
    return isNotLeavingTheMapGoingRight();
}

function isNotLeavingTheMapGoingUp() {
    return hero.y - hero.speed >= 0;
}

function isNotLeavingTheMapGoingDown() {
    return hero.y + SCALED_HEIGHT + hero.speed <= canvas.height;
}

function isNotLeavingTheMapGoingLeft() {
    return hero.x - hero.speed >= 0;
}

function isNotLeavingTheMapGoingRight() {
    return hero.x + SCALED_WIDTH + hero.speed <= canvas.width;
}

function isCollidingWithHouse() {
    const heroLeft = hero.x;
    const heroRight = hero.x + SCALED_WIDTH;
    const heroTop = hero.y;
    const heroBottom = hero.y + SCALED_HEIGHT;

    const houseLeft = 0;
    const houseRight = houseImg.width - 60;
    const houseTop = 0;
    const houseBottom = houseImg.height - 60;

    return heroLeft < houseRight &&
        heroRight > houseLeft &&
        heroTop < houseBottom &&
        heroBottom > houseTop;
}

function loadImage() {
    if (backgroundReady) {
        context.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
    }
    if (houseReady) {
        context.drawImage(houseImg, 0, 0)
    }
    if (enemyReady) {
        context.drawImage(enemyImg, 800, 400)
    }
}

let lastUpdateTime = 0;
const frameInterval = 1000 / 15;

function gameLoop() {
    loadImage();
    moveHero();
}
function Update() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - lastUpdateTime;

    if (elapsedTime >= frameInterval) {
        lastUpdateTime = currentTime;
        gameLoop();
    }

    requestAnimationFrame(Update);
}


Update();