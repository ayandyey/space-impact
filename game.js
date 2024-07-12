const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const SCREEN_WIDTH = canvas.width;
const SCREEN_HEIGHT = canvas.height;

const playerWidth = 50;
const playerHeight = 50;
let playerX = SCREEN_WIDTH / 2 - playerWidth / 2;
let playerY = SCREEN_HEIGHT - playerHeight - 10;
const playerSpeed = 5;

const enemyWidth = 50;
const enemyHeight = 50;
const enemySpeed = 2;
const enemyFrequency = 60;
let enemies = [];

let keys = {};

document.addEventListener('keydown', function(event) {
    keys[event.code] = true;
});

document.addEventListener('keyup', function(event) {
    keys[event.code] = false;
});

function drawPlayer() {
    ctx.fillStyle = 'white';
    ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
}

function createEnemy() {
    const x = Math.random() * (SCREEN_WIDTH - enemyWidth);
    const y = -enemyHeight;
    enemies.push({ x, y });
}

function drawEnemies() {
    ctx.fillStyle = 'black';
    enemies.forEach((enemy, index) => {
        ctx.fillRect(enemy.x, enemy.y, enemyWidth, enemyHeight);
        enemy.y += enemySpeed;
        if (enemy.y > SCREEN_HEIGHT) {
            enemies.splice(index, 1);
        }
    });
}

function update() {
    if (keys['ArrowLeft'] && playerX > 0) {
        playerX -= playerSpeed;
    }
    if (keys['ArrowRight'] && playerX < SCREEN_WIDTH - playerWidth) {
        playerX += playerSpeed;
    }
    if (keys['ArrowUp'] && playerY > 0) {
        playerY -= playerSpeed;
    }
    if (keys['ArrowDown'] && playerY < SCREEN_HEIGHT - playerHeight) {
        playerY += playerSpeed;
    }

    if (Math.floor(Math.random() * enemyFrequency) === 0) {
        createEnemy();
    }
}

function draw() {
    ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    drawPlayer();
    drawEnemies();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
