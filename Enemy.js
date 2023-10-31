import {enemyImg} from "./images.js";
import {context} from "./canvas.js";

class Enemy {
    constructor(x, y, speed, health) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.health = health;
        this.enemyWalkCycle = [0, 1, 2, 3, 4, 5, 6, 7];
        this.enemyWalkIndex = 0;
        this.enemyWidth = 60;
        this.enemyHeight = 60;
        this.ENEMY_SCALE = 1;
        this.ENEMY_SCALED_WIDTH = this.ENEMY_SCALE * this.enemyWidth;
        this.ENEMY_SCALED_HEIGHT = this.ENEMY_SCALE * this.enemyHeight;
        this.enemyHasMoved = false;
        this.ENEMY_DOWN = 0;
        this.ENEMY_UP = 3;
        this.ENEMY_LEFT = 1;
        this.ENEMY_RIGHT = 2;
        this.enemyCurrentDirection = this.ENEMY_DOWN;
    }

    moveTowardsPlayer(playerX, playerY) {
        const deltaX = playerX - this.x;
        const deltaY = playerY - this.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        const directionX = deltaX / distance;
        const directionY = deltaY / distance;

        this.x += directionX * this.speed;
        this.y += directionY * this.speed;

        if (Math.abs(directionX) > Math.abs(directionY)) {
            if (directionX > 0) {
                this.enemyCurrentDirection = this.ENEMY_RIGHT;
            } else {
                this.enemyCurrentDirection = this.ENEMY_LEFT;
            }
        } else {
            if (directionY > 0) {
                this.enemyCurrentDirection = this.ENEMY_DOWN;
            } else {
                this.enemyCurrentDirection = this.ENEMY_UP;
            }
        }

        this.enemyHasMoved = true;
        this.draw();
    }

    draw() {
        this.animateEnemySprite();
    }
    animateEnemySprite() {
        if (this.enemyHasMoved) {
            this.enemyWalkIndex++;
            this.enemyHasMoved = false;
            if (this.enemyWalkIndex >= this.enemyWalkCycle.length) {
                this.enemyWalkIndex = 0;
            }
        }
        this.drawEnemyFrame(this.enemyWalkCycle[this.enemyWalkIndex], this.enemyCurrentDirection, this.x, this.y);
    }

    drawEnemyFrame(frameX, frameY, canvasX, canvasY) {
        context.drawImage(
            enemyImg,
            frameX * this.enemyWidth,
            frameY * this.enemyHeight,
            this.enemyWidth,
            this.enemyHeight,
            canvasX,
            canvasY,
            this.ENEMY_SCALED_WIDTH,
            this.ENEMY_SCALED_HEIGHT
        );
    }
}
export default Enemy;