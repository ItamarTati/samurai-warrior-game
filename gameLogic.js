import Hero from './Hero.js';
import Enemy from './Enemy.js';
import {loadImages} from "./images.js";

const heroSpeed = 15

const hero = new Hero(500, 300, heroSpeed, 2000);
const enemy = new Enemy(800, 400, 2, 200);

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
}
