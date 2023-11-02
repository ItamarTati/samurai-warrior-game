import { gameLoop } from './gameLogic.js';

let lastUpdateTime = 0;
const frameInterval = 1000 / 15;
let isGameRunning = false;

const startMenu = document.getElementById("start-menu");
const gameOverMenu = document.getElementById("game-over");
const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
const scoreElement = document.getElementById("score");

function showStartMenu() {
    startMenu.style.display = "block";
    gameOverMenu.style.display = "none";
}

function showGame() {
    startMenu.style.display = "none";
    gameOverMenu.style.display = "none";
}

function showGameOver(score) {
    startMenu.style.display = "none";
    gameOverMenu.style.display = "block";
    scoreElement.textContent = score;
}

startButton.addEventListener("click", () => {
    isGameRunning = true;
    showGame();
    Update();
});

restartButton.addEventListener("click", () => {
    isGameRunning = true;
    showGame();
    gameLoop();
});

function Update() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - lastUpdateTime;

    if (isGameRunning) {
        if (elapsedTime >= frameInterval) {
            lastUpdateTime = currentTime;
            gameLoop();
        }
        requestAnimationFrame(Update);
    }
}

showStartMenu();
