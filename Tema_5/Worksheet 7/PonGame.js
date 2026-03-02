// Obtener elementos del DOM
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');
const playerScoreElement = document.getElementById('playerScore');
const computerScoreElement = document.getElementById('computerScore');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const difficultySelect = document.getElementById('difficultySelect');

// Variables del juego
let gameRunning = false;
let gamePaused = false;
let animationId;

// Configuración de las paletas
const paddleWidth = 10;
const paddleHeight = 80;
const playerPaddle = {
    x: 20,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0,
    speed: 8
};

const computerPaddle = {
    x: canvas.width - 30,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0,
    speed: 5
};

// Configuración de la pelota
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 8,
    speed: 5,
    dx: 5,
    dy: 5
};

// Puntuación
let playerScore = 0;
let computerScore = 0;

// Eventos del teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        playerPaddle.dy = -playerPaddle.speed;
    } else if (e.key === 'ArrowDown') {
        playerPaddle.dy = playerPaddle.speed;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        playerPaddle.dy = 0;
    }
});

// Función para dibujar las paletas
function drawPaddle(x, y, width, height) {
    ctx.fillStyle = 'white';
    ctx.fillRect(x, y, width, height);
}

// Función para dibujar la pelota
function drawBall(x, y, radius) {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}

// Función para dibujar la línea de medio campo
function drawCenterLine() {
    ctx.strokeStyle = 'white';
    ctx.setLineDash([10, 15]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);
}

// Función para actualizar la posición de la paleta del jugador
function updatePlayerPaddle() {
    playerPaddle.y += playerPaddle.dy;
    
    // Limitar la paleta dentro del canvas
    if (playerPaddle.y < 0) {
        playerPaddle.y = 0;
    } else if (playerPaddle.y + playerPaddle.height > canvas.height) {
        playerPaddle.y = canvas.height - playerPaddle.height;
    }
}

// Función para actualizar la paleta de la computadora (IA)
function updateComputerPaddle() {
    // Velocidad según dificultad
    let computerSpeed = computerPaddle.speed;
    
    switch(difficultySelect.value) {
        case 'easy':
            computerSpeed = 3;
            break;
        case 'medium':
            computerSpeed = 5;
            break;
        case 'hard':
            computerSpeed = 8;
            break;
    }
    
    // Mover la paleta hacia la pelota
    if (computerPaddle.y + computerPaddle.height / 2 < ball.y) {
        computerPaddle.dy = computerSpeed;
    } else if (computerPaddle.y + computerPaddle.height / 2 > ball.y) {
        computerPaddle.dy = -computerSpeed;
    } else {
        computerPaddle.dy = 0;
    }
    
    computerPaddle.y += computerPaddle.dy;
    
    // Limitar la paleta dentro del canvas
    if (computerPaddle.y < 0) {
        computerPaddle.y = 0;
    } else if (computerPaddle.y + computerPaddle.height > canvas.height) {
        computerPaddle.y = canvas.height - computerPaddle.height;
    }
}

// Función para actualizar la posición de la pelota
function updateBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
    
    // Rebote en las paredes superior e inferior
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.dy *= -1;
    }
    
    // Colisión con la paleta del jugador
    if (ball.x - ball.radius < playerPaddle.x + playerPaddle.width &&
        ball.x + ball.radius > playerPaddle.x &&
        ball.y > playerPaddle.y &&
        ball.y < playerPaddle.y + playerPaddle.height) {
        
        ball.dx *= -1;
        // Cambiar la dirección según dónde golpee la paleta
        let collisionPoint = (ball.y - (playerPaddle.y + playerPaddle.height / 2)) / (playerPaddle.height / 2);
        ball.dy = collisionPoint * ball.speed;
    }
    
    // Colisión con la paleta de la computadora
    if (ball.x + ball.radius > computerPaddle.x &&
        ball.x - ball.radius < computerPaddle.x + computerPaddle.width &&
        ball.y > computerPaddle.y &&
        ball.y < computerPaddle.y + computerPaddle.height) {
        
        ball.dx *= -1;
        // Cambiar la dirección según dónde golpee la paleta
        let collisionPoint = (ball.y - (computerPaddle.y + computerPaddle.height / 2)) / (computerPaddle.height / 2);
        ball.dy = collisionPoint * ball.speed;
    }
    
    // Puntuación
    if (ball.x - ball.radius < 0) {
        computerScore++;
        computerScoreElement.textContent = computerScore;
        resetBall();
        
        // Aumentar velocidad después de 5 puntos
        if (computerScore % 5 === 0) {
            ball.speed += 0.5;
        }
    } else if (ball.x + ball.radius > canvas.width) {
        playerScore++;
        playerScoreElement.textContent = playerScore;
        resetBall();
        
        // Aumentar velocidad después de 5 puntos
        if (playerScore % 5 === 0) {
            ball.speed += 0.5;
        }
    }
}

// Función para reiniciar la posición de la pelota
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = ball.speed * (Math.random() > 0.5 ? 1 : -1);
    ball.dy = ball.speed * (Math.random() > 0.5 ? 1 : -1);
}

// Función principal del juego
function gameLoop() {
    if (!gameRunning || gamePaused) return;
    
    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Actualizar posiciones
    updatePlayerPaddle();
    updateComputerPaddle();
    updateBall();
    
    // Dibujar elementos
    drawCenterLine();
    drawPaddle(playerPaddle.x, playerPaddle.y, playerPaddle.width, playerPaddle.height);
    drawPaddle(computerPaddle.x, computerPaddle.y, computerPaddle.width, computerPaddle.height);
    drawBall(ball.x, ball.y, ball.radius);
    
    // Continuar el juego
    animationId = requestAnimationFrame(gameLoop);
}

// Eventos de los botones
startBtn.addEventListener('click', () => {
    if (!gameRunning) {
        gameRunning = true;
        gamePaused = false;
        gameLoop();
    } else if (gamePaused) {
        gamePaused = false;
        gameLoop();
    }
});

pauseBtn.addEventListener('click', () => {
    if (gameRunning) {
        gamePaused = !gamePaused;
        if (!gamePaused) {
            gameLoop();
        }
    }
});

resetBtn.addEventListener('click', () => {
    gameRunning = false;
    gamePaused = false;
    cancelAnimationFrame(animationId);
    
    // Reiniciar puntuación
    playerScore = 0;
    computerScore = 0;
    playerScoreElement.textContent = '0';
    computerScoreElement.textContent = '0';
    
    // Reiniciar posiciones
    playerPaddle.y = canvas.height / 2 - paddleHeight / 2;
    computerPaddle.y = canvas.height / 2 - paddleHeight / 2;
    ball.speed = 5;
    resetBall();
    
    // Dibujar el estado inicial
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCenterLine();
    drawPaddle(playerPaddle.x, playerPaddle.y, playerPaddle.width, playerPaddle.height);
    drawPaddle(computerPaddle.x, computerPaddle.y, computerPaddle.width, computerPaddle.height);
    drawBall(ball.x, ball.y, ball.radius);
});

// Dibujar estado inicial
ctx.clearRect(0, 0, canvas.width, canvas.height);
drawCenterLine();
drawPaddle(playerPaddle.x, playerPaddle.y, playerPaddle.width, playerPaddle.height);
drawPaddle(computerPaddle.x, computerPaddle.y, computerPaddle.width, computerPaddle.height);
drawBall(ball.x, ball.y, ball.radius);