const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let platforms = [
    { x: 200, y: 110, width: 500, height: 20 },
    { x: 120, y: 270, width: 250, height: 20 },
    { x: 320, y: 190, width: 250, height: 20 },
    { x: 530, y: 270, width: 250, height: 20 },
    { x: 70, y: 430, width: 780, height: 20 },
    { x: 320, y: 350, width: 250, height: 20 }
];
let player = {
    x: 135,
    y: -500,
    width: 50,
    height: 60,
    sprite:new Image(),
    dy: 0,
    gravity: 0.3,
    jumpForce:90,
    grounded: false,
    speed:5,
    bullets:[]
};
player.sprite.src='personajes/naruto.png';

let enemies = {
    x: 715,
    y: -500,
    width: 50,
    height: 60,
    sprite:new Image(),
    dy: 0,
    gravity: 0.3,
    jumpForce:90,
    grounded: false,
    speed:5,
    bullets:[]
};
enemies.sprite.src='personajes/mario.png';

const deathThreshold = 439;
canvas.height += 10 ;

const bulletPushForce = 10;

function resetCharacter(character)
{
         character.x = player.x,enemies.x ;
         character.y=-500;
         character.dy=0;
         character.grounded= false;
}
function detectCollision(rect1,rect2)
{
         return rect1.x<rect2.x+rect2.width && rect1.x+rect1.width>rect2.x && rect1.y<rect2.y+rect2.width && rect1.y+rect1.width>rect2.y ;
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player.dy += player.gravity;
    player.y += player.dy;

    enemies.dy += enemies.gravity;
    enemies.y += enemies.dy;
 
    player.grounded=false;
    enemies.grounded=false;

    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
        player.dy = 0;
        player.grounded = true;
    }

    if (enemies.y + enemies.height > canvas.height) {
        enemies.y = canvas.height - enemies.height;
        enemies.dy = 0;
        enemies.grounded = true;
    }

    platforms.forEach(platform => {
        if (player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y + player.height > platform.y &&
            player.y + player.height < platform.y + platform.height) {
            player.y = platform.y - player.height;
            player.dy = 0;
            player.grounded = true;
        };
        if (enemies.x < platform.x + platform.width &&
            enemies.x + enemies.width > platform.x &&
            enemies.y + enemies.height > platform.y &&
            enemies.y + enemies.height < platform.y + platform.height) {
            enemies.y = platform.y - enemies.height;
            enemies.dy = 0;
            enemies.grounded = true;
        }
    });
    
    if(player.y > deathThreshold)
{
    resetCharacter(player);
}
    if(enemies.y > deathThreshold)
{
    resetCharacter(enemies);
}

    if(enemies.grounded){
    if(player.x>enemies.x){enemies.x+=enemies.speed;
}
    else if(player.x<enemies.x){enemies.x-=enemies.speed;
}   
    if(player.y<enemies.y&&enemies.grounded){enemies.y-=enemies.jumpForce;
    enemies.grounded=false;
  }
}
    ctx.drawImage(player.sprite, player.x, player.y, player.width, player.height);

    ctx.drawImage(enemies.sprite, enemies.x, enemies.y, enemies.width, enemies.height);

    ctx.fillStyle = 'green';
    platforms.forEach(platform => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });

    requestAnimationFrame(gameLoop);
}

gameLoop();
window.addEventListener('keydown', (e) => {
    switch(e.code) {
        case 'ArrowRight':
            player.x += player.speed; // Mover a la derecha
            break;
        case 'ArrowLeft':
            player.x -= player.speed; // Mover a la izquierda
            break;
        case 'ArrowUp':
            if (player.grounded){player.y -= player.jumpForce; // Saltar
            player.grounded = false;}
            break;
        case 'space':
            player.bullets.push({ x: player.x + player.width, 
            y: player.y + player.height / 2,
            width: 7,
            height: 4,
            dx:7
            });
    }
});
