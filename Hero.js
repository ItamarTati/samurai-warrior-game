import {context, screenCenterX, screenCenterY} from "./canvas.js";
import {keyPresses} from "./userInput.js";
import {heroImg} from "./images.js";

class Hero {
    constructor(gameX, gameY, speed, maxHealth) {
        this.gameX = 500;
        this.gameY = 500;
        this.speed = speed;
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.walkCycle = [0, 1, 2, 3];
        this.walkIndex = 0;
        this.width = 64;
        this.height = 64;
        this.SCALE = 1;
        this.SCALED_WIDTH = this.SCALE * this.width;
        this.SCALED_HEIGHT = this.SCALE * this.height;
        this.hasMoved = false;
        this.DOWN = 0;
        this.UP = 3;
        this.LEFT = 1;
        this.RIGHT = 2;
        this.currentDirection = this.DOWN;
    }


    moveHero() {
        this.handleMovement();
        this.animateHeroSprite();
        this.drawHealthBar();
    }

    handleMovement() {
        if (this.isMovingUp()) {
            this.moveUp();
        } else if (this.isMovingDown()) {
            this.moveDown();
        } else if (this.isMovingLeft()) {
            this.moveLeft();
        } else if (this.isMovingRight()) {
            this.moveRight();
        }
    }

    isMovingUp() {
        return keyPresses['ArrowUp'] || keyPresses['w'];
    }

    isMovingDown() {
        return keyPresses['ArrowDown'] || keyPresses['s'];
    }

    isMovingLeft() {
        return keyPresses['ArrowLeft'] || keyPresses['a'];
    }

    isMovingRight() {
        return keyPresses['ArrowRight'] || keyPresses['d'];
    }

    moveUp() {
        this.currentDirection = this.UP;
        if (this.canMoveUp()) {
            this.gameY -= this.speed;
        }
        this.hasMoved = true;
    }

    moveDown() {
        this.currentDirection = this.DOWN;
        if (this.canMoveDown()) {
            this.gameY += this.speed;
        }
        this.hasMoved = true;
    }

    moveLeft() {
        this.currentDirection = this.LEFT;
        if (this.canMoveLeft()) {
            this.gameX -= this.speed;
        }
        this.hasMoved = true;
    }

    moveRight() {
        this.currentDirection = this.RIGHT;
        if (this.canMoveRight()) {
            this.gameX += this.speed;
        }
        this.hasMoved = true;
    }

    canMoveUp() {
        return true
    }

    canMoveDown() {
        return true
    }

    canMoveLeft() {
        return true
    }

    canMoveRight() {
        return true
    }

    animateHeroSprite() {
        if (this.hasMoved) {
            this.walkIndex++;
            this.hasMoved = false;
            if (this.walkIndex >= this.walkCycle.length) {
                this.walkIndex = 0;
            }
        }
        this.drawHeroFrame(this.walkCycle[this.walkIndex], this.currentDirection, screenCenterX, screenCenterY);
    }

    drawHeroFrame(frameX, frameY, canvasX, canvasY) {
        context.drawImage(
            heroImg,
            frameX * this.width,
            frameY * this.height,
            this.width,
            this.height,
            canvasX,
            canvasY,
            this.SCALED_WIDTH,
            this.SCALED_HEIGHT
        );
    }

    updateIsCollidingWithHouse(colliding) {
        this.isCollidingWithHouse = colliding
    }


    drawHealthBar() {
        const barWidth = (this.health / this.maxHealth) * 100;

        const barHeight = 10;
        const barX = screenCenterX - 50 + (this.SCALED_WIDTH / 2);
        const barY = screenCenterY + this.SCALED_HEIGHT + 5;

        context.fillStyle = 'red';
        context.fillRect(barX, barY, 100, barHeight);

        context.fillStyle = 'blue';
        context.fillRect(barX, barY, barWidth, barHeight);
    }

    updateHealth(newHealth) {
        this.health = Math.max(0, this.health - newHealth);
    }
}

export default Hero;