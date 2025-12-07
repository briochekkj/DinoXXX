const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 250;

let player = {
    x: 50,
    y: 180,
    width: 30,
    height: 30,
    dy: 0,
    jumpForce: -10,
    gravity: 0.5,
    isJumping: false
};

let obstacles = [];
let speed = 5;
let gameOver = false;

// Criar obstáculos
function spawnObstacle() {
    obstacles.push({
        x: canvas.width,
        y: 190,
        width: 20,
        height: 40
    });
}

// Colisão
function checkCollision(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

// Update do jogo
function update() {
    if (gameOver) {
        ctx.font = "30px Arial";
        ctx.fillStyle = "red";
        ctx.fillText("GAME OVER", 200, 120);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Player
    player.y += player.dy;
    player.dy += player.gravity;

    if (player.y > 180) {
        player.y = 180;
        player.dy = 0;
        player.isJumping = false;
    }

    // Obstacles
    obstacles.forEach((obs, i) => {
        obs.x -= speed;

        if (obs.x + obs.width < 0) {
            obstacles.splice(i, 1);
        }

        if (checkCollision(player, obs)) {
            gameOver = true;
        }

        ctx.fillStyle = "#333";
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    });

    // Desenhar player
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    requestAnimationFrame(update);
}

// Pulo
document.addEventListener("keydown", () => {
    if (!player.isJumping) {
        player.dy = player.jumpForce;
        player.isJumping = true;
    }
});

// Spawn automático
setInterval(spawnObstacle, 1200);

update();
