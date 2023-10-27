let canvas = document.createElement("canvas");
let context = canvas.getContext("2d");

canvas.width = 480;
canvas.height = 320;

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


let keysDown = {};

addEventListener(
    "keydown",
    function (e) {
        keysDown[e.key] = true;
    },
    false
);

addEventListener(
    "keyup",
    function (e) {
        keysDown[e.key] = true;
    },
    false
)

function loadImage() {
    if(backgroundReady) {
        context.drawImage(backgroundImg, 0, 0);
    }
    if(heroReady) {
        context.drawImage(heroImg, 0, 0);
    }
}

function gameLoop() {
    loadImage();
    requestAnimationFrame(gameLoop);
}

gameLoop();