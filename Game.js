import Hero from './Hero.js';
import Enemy from './Enemy.js';
import { houseImg } from './images.js';
import Map from "./Map.js";
import {canvas} from "./canvas.js";
import House from "./House.js";

const heroSpeed = 15;
const maxHealth = 2000;

export default class Game {
    constructor() {
        this.hero = new Hero(500, 300, heroSpeed, maxHealth);
        this.enemy = new Enemy(800, 400, 2, 200);
        this.map = new Map(canvas.width, canvas.height);
        this.house = new House(0, 0);
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

    moveHero() {
        this.hero.moveHero();
    }

    moveEnemyTowardsPlayer() {
        this.enemy.moveTowardsPlayer(this.hero.x, this.hero.y);
    }

    loadMap() {
        this.map.draw();
    }

    placeHouse() {
        this.house.draw();
    }

    gameLoop() {
        this.loadMap();
        this.moveHero();
        this.placeHouse();
        this.moveEnemyTowardsPlayer();
        if (this.isCollidingWithHouse()) {
            this.hero.updateIsCollidingWithHouse(true);
        } else {
            this.hero.updateIsCollidingWithHouse(false);
        }

        if (this.isCollidingWithEnemy()) {
            this.hero.updateHealth(10)
        }
    }

    resetGame() {
        this.hero = new Hero(500, 300, heroSpeed, maxHealth);
        this.enemy = new Enemy(800, 400, 2, 200);
        this.map = new Map(canvas.width, canvas.height);
    }
}