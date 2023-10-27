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

heroImg.src = "hero.png"

heroImg.onload = function () {
    heroReady = true;
};

let hero = {
    speed: 3,
    x: 0,
    y: 0
};


let keyPresses = {};

// Use the 'keydown' event to detect key presses and store them in keyPresses
document.addEventListener('keydown', keyDownListener, false);
function keyDownListener(event) {
    keyPresses[event.key] = true;
}

// Use the 'keyup' event to detect key releases
document.addEventListener('keyup', keyUpListener, false);
function keyUpListener(event) {
    keyPresses[event.key] = false;
}

function moveChar(deltaX, deltaY, direction) {
    if (hero.x + deltaX > 0) {
        hero.x += deltaX + hero.speed;
    }
    if (hero.y + deltaY > 0) {
        hero.y += deltaY + hero.speed;
    }
    currentDirection = direction;
}
function moveHero() {
    if (keyPresses['ArrowUp'] || keyPresses['w']) {
        // Move the hero up
        hero.y -= hero.speed;
    }
    if (keyPresses['ArrowDown'] || keyPresses['s']) {
        // Move the hero down
        hero.y += hero.speed;
    }
    if (keyPresses['ArrowLeft'] || keyPresses['a']) {
        // Move the hero left
        hero.x -= hero.speed;
    }
    if (keyPresses['ArrowRight'] || keyPresses['d']) {
        // Move the hero right
        hero.x += hero.speed;
    }
}


function loadImage() {
    if (backgroundReady) {
        context.drawImage(backgroundImg, 0, 0);
    }
    if (heroReady) {
        context.drawImage(heroImg, hero.x, hero.y);
    }
}
function gameLoop() {
    loadImage();
    moveHero();
    requestAnimationFrame(gameLoop);
}

gameLoop();