import {gameLoop} from './gameLogic.js';

let lastUpdateTime = 0;
const frameInterval = 1000 / 15;
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