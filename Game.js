import Hero from './Hero.js';
import Enemy from './Enemy.js';
import { houseImg } from './images.js';
import Map from "./Map.js";
import {canvas, context} from "./canvas.js";
import House from "./House.js";

const heroSpeed = 15;
const maxHealth = 2000;
const mapWidth = 828;
const mapHeight = 508;



export default class Game {
    constructor() {
        this.hero = new Hero(300, 300, heroSpeed, maxHealth);
        this.enemy = new Enemy(800, 400, 2, 200);
        this.map = new Map(mapWidth, mapHeight);
        this.house = new House(0, 0);
        this.offsetX = 0
        this.offsetY = 0
    }

    isCollidingWithHouse() {
        const heroLeft = this.hero.x;
        const heroRight = this.hero.x + this.hero.SCALED_WIDTH;
        const heroTop = this.hero.y;
        const heroBottom = this.hero.y + this.hero.SCALED_HEIGHT;

        const houseLeft = 0;
        const houseRight = houseImg.width - 40;
        const houseTop = 0;
        const houseBottom = houseImg.height - 40;

        return heroLeft < houseRight &&
            heroRight > houseLeft &&
            heroTop < houseBottom &&
            heroBottom > houseTop;
    }

    isCollidingWithEnemy() {
        const heroHitBoxLeft = this.hero.x + this.hero.SCALED_WIDTH * 0.25;
        const heroHitBoxRight = this.hero.x + this.hero.SCALED_WIDTH * 0.75;
        const heroHitBoxTop = this.hero.y + this.hero.SCALED_HEIGHT * 0.25;
        const heroHitBoxBottom = this.hero.y + this.hero.SCALED_HEIGHT * 0.75;

        const enemyHitBoxLeft = this.enemy.x + this.enemy.ENEMY_SCALED_WIDTH * 0.25;
        const enemyHitBoxRight = this.enemy.x + this.enemy.ENEMY_SCALED_WIDTH * 0.75;
        const enemyHitBoxTop = this.enemy.y + this.enemy.ENEMY_SCALED_HEIGHT * 0.25;
        const enemyHitBoxBottom = this.enemy.y + this.enemy.ENEMY_SCALED_HEIGHT * 0.75;

        return (
            heroHitBoxLeft < enemyHitBoxRight &&
            heroHitBoxRight > enemyHitBoxLeft &&
            heroHitBoxTop < enemyHitBoxBottom &&
            heroHitBoxBottom > enemyHitBoxTop
        );
    }

    drawGameOver() {
        context.fillStyle = "black";
        context.font = "40px Arial";
        context.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);
    }

    moveHero(offsetX, offsetY) {
        this.loadMap(offsetX, offsetY);
        this.hero.moveHero();

    }

    moveEnemyTowardsPlayer() {
        this.enemy.moveTowardsPlayer(this.hero.x, this.hero.y);
    }

    loadMap(offsetX, offsetY) {
        const mapX = -offsetX;
        const mapY = -offsetY;
        this.map.draw(mapX, mapY);
    }

    placeHouse(offsetX, offsetY) {
        this.house.draw(offsetX, offsetY);
    }

    gameLoop() {

        if (this.hero.x < 0) {
            this.hero.x = this.map.width - this.hero.SCALED_WIDTH;
        } else if (this.hero.x > this.map.width - this.hero.SCALED_WIDTH) {
            this.hero.x = 0;
        }

        if (this.hero.y < 0) {
            this.hero.y = this.map.height - this.hero.SCALED_HEIGHT;
        } else if (this.hero.y > this.map.height - this.hero.SCALED_HEIGHT) {
            this.hero.y = 0;
        }

        this.offsetX = (canvas.width / 2) - ((this.hero.gameX - this.hero.SCALED_WIDTH) / 2);
        this.offsetY = (canvas.height / 2) - ((this.hero.gameY - this.hero.SCALED_HEIGHT) / 2);

        this.moveHero(this.offsetX, this.offsetY);
        this.moveEnemyTowardsPlayer();
        this.placeHouse(this.offsetX, this.offsetY);

        if (this.isCollidingWithHouse()) {
            this.hero.updateIsCollidingWithHouse(true);
        } else {
            this.hero.updateIsCollidingWithHouse(false);
        }

        if (this.isCollidingWithEnemy()) {
            this.hero.updateHealth(10);
        }

        if (this.hero.health <= 0) {
            this.drawGameOver();
        }
    }


    startGame() {
        this.hero = new Hero(200, 200, heroSpeed, maxHealth);
        this.enemy = new Enemy(800, 400, 2, 200);
        this.map = new Map(mapWidth, mapHeight);
        this.house = new House(0, 0);
    }
    resetGame() {
        this.hero = new Hero(200, 200, heroSpeed, maxHealth);
        this.enemy = new Enemy(800, 400, 2, 200);
        this.map = new Map(mapWidth, mapHeight);
        this.house = new House(0, 0);
    }
}