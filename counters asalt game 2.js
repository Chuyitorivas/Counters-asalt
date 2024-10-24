const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let platforms = [
    { x: 70, y: 430, width: 780, height: 30 },
    { x: 250, y: 350, width: 300, height: 30 },
    { x: 500, y: 270, width: 300, height: 30 }
];
let player = {
    x: 80,
    y: 30,
    width: 50,
    height: 50,
    color: 'black',
    dy: 0,
    gravity: 1,
    jumpForce: 45,
    grounded: false
};

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player.dy += player.gravity;
    player.y += player.dy;

    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
        player.dy = 0;
        player.grounded = true;
    }

    platforms.forEach(platform => {
        if (player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y + player.height > platform.y &&
            player.y + player.height < platform.y + platform.height) {
            player.y = platform.y - player.height;
            player.dy = 0;
            player.grounded = true;
        }
    });

    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    ctx.fillStyle = 'green';
    platforms.forEach(platform => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });

    requestAnimationFrame(gameLoop);
}

gameLoop();
window.addEventListener('keydown', (e) => {
    switch(e.code) {
        case 'ArrowLeft':
            player.x -= 5; // Mover a la izquierda
            break;
        case 'ArrowRight':
            player.x += 5; // Mover a la derecha
            break;
        case 'ArrowUp':
            player.y -= 10; // Saltar
            break;
    }
});
