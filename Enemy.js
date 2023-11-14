import {enemyImg} from "./images.js";
import {context, screenCenterX, screenCenterY} from "./canvas.js";

class Enemy {
    constructor(gameX, gameY, speed, health) {
        this.gameX = 200
        this.gameY = 200
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
        const deltaX = playerX - this.gameX;
        const deltaY = playerY - this.gameY;
        const distance = Math.hypot(deltaX, deltaY);
        const directionX = deltaX / distance;
        const directionY = deltaY / distance;

        this.gameX += directionX * this.speed;
        this.gameY += directionY * this.speed;

        this.updateEnemyDirection(directionX, directionY);

        this.enemyHasMoved = true;
        this.draw((screenCenterX + this.gameX) - playerX,
            (screenCenterY + this.gameY) - playerY)
    }

    updateEnemyDirection(directionX, directionY) {
        if (Math.abs(directionX) > Math.abs(directionY)) {
            this.enemyCurrentDirection = directionX > 0 ? this.ENEMY_RIGHT : this.ENEMY_LEFT;
        } else {
            this.enemyCurrentDirection = directionY > 0 ? this.ENEMY_DOWN : this.ENEMY_UP;
        }
    }


    draw(enemyPositionRelativeToPlayerScreenX, enemyPositionRelativeToPlayerScreenY) {
        this.animateEnemySprite(enemyPositionRelativeToPlayerScreenX, enemyPositionRelativeToPlayerScreenY);
    }
    animateEnemySprite(enemyPositionRelativeToPlayerScreenX, enemyPositionRelativeToPlayerScreenY) {
        if (this.enemyHasMoved) {
            this.enemyWalkIndex++;
            this.enemyHasMoved = false;
            if (this.enemyWalkIndex >= this.enemyWalkCycle.length) {
                this.enemyWalkIndex = 0;
            }
        }
        this.drawEnemyFrame(this.enemyWalkCycle[this.enemyWalkIndex], this.enemyCurrentDirection, enemyPositionRelativeToPlayerScreenX, enemyPositionRelativeToPlayerScreenY);
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