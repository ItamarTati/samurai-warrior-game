import Game from './Game.js';

let lastUpdateTime = 0;
let isGameRunning = false;

const startMenu = document.getElementById("start-menu");
const gameOverMenu = document.getElementById("game-over");
const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
const scoreElement = document.getElementById("score");

const game = new Game();

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
    game.resetGame();
    Update();
});

restartButton.addEventListener("click", () => {
    isGameRunning = true;
    showGame();
    game.resetGame();
    Update();
});

function Update() {
    const frameInterval = 1000 / 15;
    const currentTime = Date.now();
    const elapsedTime = currentTime - lastUpdateTime;

    if (isGameRunning) {
        if (elapsedTime >= frameInterval) {
            lastUpdateTime = currentTime;
            game.gameLoop();
        }
        requestAnimationFrame(Update);
    }
    if (game.hero.health === 0) {
        isGameRunning = false;
        showGameOver(200);
    }
}

showStartMenu();