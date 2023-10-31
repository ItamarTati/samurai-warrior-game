import {canvas, context} from "./canvas.js";
import {keyPresses} from "./userInput.js";
import {heroImg, houseImg} from "./images.js";

class Hero {
    constructor(x, y, speed, health) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.health = health;
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
            this.y -= this.speed;
        }
        this.hasMoved = true;
    }

    moveDown() {
        this.currentDirection = this.DOWN;
        if (this.canMoveDown()) {
            this.y += this.speed;
        }
        this.hasMoved = true;
    }

    moveLeft() {
        this.currentDirection = this.LEFT;
        if (this.canMoveLeft()) {
            this.x -= this.speed;
        }
        this.hasMoved = true;
    }

    moveRight() {
        this.currentDirection = this.RIGHT;
        if (this.canMoveRight()) {
            this.x += this.speed;
        }
        this.hasMoved = true;
    }

    canMoveUp() {
        return this.isNotLeavingTheMapGoingUp() && !this.isCollidingWithHouse();
    }

    canMoveDown() {
        return this.isNotLeavingTheMapGoingDown();
    }

    canMoveLeft() {
        return this.isNotLeavingTheMapGoingLeft() && !this.isCollidingWithHouse();
    }

    canMoveRight() {
        return this.isNotLeavingTheMapGoingRight();
    }

    isNotLeavingTheMapGoingUp() {
        return this.y - this.speed >= 0;
    }

    isNotLeavingTheMapGoingDown() {
        return this.y + this.SCALED_HEIGHT + this.speed <= canvas.height;
    }

    isNotLeavingTheMapGoingLeft() {
        return this.x - this.speed >= 0;
    }

    isNotLeavingTheMapGoingRight() {
        return this.x + this.SCALED_WIDTH + this.speed <= canvas.width;
    }
    animateHeroSprite() {
        if (this.hasMoved) {
            this.walkIndex++;
            this.hasMoved = false;
            if (this.walkIndex >= this.walkCycle.length) {
                this.walkIndex = 0;
            }
        }
        this.drawHeroFrame(this.walkCycle[this.walkIndex], this.currentDirection, this.x, this.y);
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

    isCollidingWithHouse() {
        const heroLeft = this.x;
        const heroRight = this.x + this.SCALED_WIDTH;
        const heroTop = this.y;
        const heroBottom = this.y + this.SCALED_HEIGHT;

        const houseLeft = 0;
        const houseRight = houseImg.width - 60;
        const houseTop = 0;
        const houseBottom = houseImg.height - 60;

        return heroLeft < houseRight &&
            heroRight > houseLeft &&
            heroTop < houseBottom &&
            heroBottom > houseTop;
    }

}

export default Hero;