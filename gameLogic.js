import Hero from './Hero.js';
import Enemy from './Enemy.js';
import { loadImages, houseImg } from "./images.js";

const heroSpeed = 15;
const maxHealth = 2000;
const hero = new Hero(500, 300, heroSpeed, maxHealth);
const enemy = new Enemy(800, 400, 2, 200);

function isCollidingWithHouse() {
    const heroLeft = hero.x;
    const heroRight = hero.x + hero.SCALED_WIDTH;
    const heroTop = hero.y;
    const heroBottom = hero.y + hero.SCALED_HEIGHT;

    const houseLeft = 0;
    const houseRight = houseImg.width - 60;
    const houseTop = 0;
    const houseBottom = houseImg.height - 60;

    return heroLeft < houseRight &&
        heroRight > houseLeft &&
        heroTop < houseBottom &&
        heroBottom > houseTop;
}

function isCollidingWithEnemy() {
    const heroHitBoxLeft = hero.x + hero.SCALED_WIDTH * 0.25;
    const heroHitBoxRight = hero.x + hero.SCALED_WIDTH * 0.75;
    const heroHitBoxTop = hero.y + hero.SCALED_HEIGHT * 0.25;
    const heroHitBoxBottom = hero.y + hero.SCALED_HEIGHT * 0.75;

    const enemyHitBoxLeft = enemy.x + enemy.ENEMY_SCALED_WIDTH * 0.25;
    const enemyHitBoxRight = enemy.x + enemy.ENEMY_SCALED_WIDTH * 0.75;
    const enemyHitBoxTop = enemy.y + enemy.ENEMY_SCALED_HEIGHT * 0.25;
    const enemyHitBoxBottom = enemy.y + enemy.ENEMY_SCALED_HEIGHT * 0.75;

    return (
        heroHitBoxLeft < enemyHitBoxRight &&
        heroHitBoxRight > enemyHitBoxLeft &&
        heroHitBoxTop < enemyHitBoxBottom &&
        heroHitBoxBottom > enemyHitBoxTop
    );
}

function moveHero() {
    hero.moveHero();
}

function moveEnemyTowardsPlayer() {
    enemy.moveTowardsPlayer(hero.x, hero.y);
}

export function gameLoop() {
    loadImages();
    moveHero();
    moveEnemyTowardsPlayer();
    if (isCollidingWithHouse()) {
        hero.updateIsCollidingWithHouse(true);
    } else {
        hero.updateIsCollidingWithHouse(false);
    }

    if (isCollidingWithEnemy()) {
        hero.updateHealth(10)
    }
}