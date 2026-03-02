class ArkanoidGame {
    constructor() {
        this.gameArea = document.getElementById('gameArea');
        this.scoreElement = document.getElementById('score');
        this.livesElement = document.getElementById('lives');
        this.gameMessage = document.getElementById('gameMessage');
        
        this.paddle = null;
        this.ball = null;
        this.blocks = [];
        
        this.gameWidth = 800;
        this.gameHeight = 500;
        this.paddleWidth = 100;
        this.paddleHeight = 15;
        this.ballSize = 15;
        
        this.ballSpeed = 3;
        this.ballX = 400;
        this.ballY = 400;
        this.ballDX = this.ballSpeed;
        this.ballDY = -this.ballSpeed;
        
        this.paddleX = 350;
        this.paddleSpeed = 8;
        
        this.score = 0;
        this.lives = 3;
        this.gameRunning = false;
        this.gameLoop = null;
        
        this.keys = {};
        
        this.init();
    }
    
    init() {
        // Crear barra
        this.paddle = document.createElement('div');
        this.paddle.className = 'paddle';
        this.gameArea.appendChild(this.paddle);
        
        // Crear pelota
        this.ball = document.createElement('div');
        this.ball.className = 'ball';
        this.gameArea.appendChild(this.ball);
        
        // Crear bloques
        this.createBlocks();
        
        // Posicionar elementos
        this.updatePositions();
        
        // Event listeners
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));
        document.getElementById('startButton').addEventListener('click', () => this.startGame());
        document.getElementById('resetButton').addEventListener('click', () => this.resetGame());
        
        this.showMessage('Presiona "Iniciar Juego" para comenzar');
    }
    
    createBlocks() {
        const rows = 5;
        const cols = 10;
        const blockWidth = 70;
        const blockHeight = 25;
        const padding = 5;
        const startX = 30;
        const startY = 50;
        
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const block = document.createElement('div');
                block.className = `block block-row-${row}`;
                
                const x = startX + col * (blockWidth + padding);
                const y = startY + row * (blockHeight + padding);
                
                block.style.left = x + 'px';
                block.style.top = y + 'px';
                
                this.gameArea.appendChild(block);
                this.blocks.push({
                    element: block,
                    x: x,
                    y: y,
                    width: blockWidth,
                    height: blockHeight,
                    active: true
                });
            }
        }
    }
    
    updatePositions() {
        this.paddle.style.left = this.paddleX + 'px';
        this.ball.style.left = this.ballX + 'px';
        this.ball.style.top = this.ballY + 'px';
    }
    
    handleKeyDown(e) {
        this.keys[e.key] = true;
    }
    
    handleKeyUp(e) {
        this.keys[e.key] = false;
    }
    
    movePaddle() {
        if (!this.gameRunning) return;
        
        if (this.keys['ArrowLeft'] && this.paddleX > 0) {
            this.paddleX -= this.paddleSpeed;
        }
        if (this.keys['ArrowRight'] && this.paddleX < this.gameWidth - this.paddleWidth) {
            this.paddleX += this.paddleSpeed;
        }
        
        this.paddle.style.left = this.paddleX + 'px';
    }
    
    moveBall() {
        if (!this.gameRunning) return;
        
        this.ballX += this.ballDX;
        this.ballY += this.ballDY;
        
        // Colisión con paredes laterales
        if (this.ballX <= 0 || this.ballX >= this.gameWidth - this.ballSize) {
            this.ballDX *= -1;
        }
        
        // Colisión con techo
        if (this.ballY <= 0) {
            this.ballDY *= -1;
        }
        
        // Colisión con borde inferior (pérdida de vida)
        if (this.ballY >= this.gameHeight - this.ballSize) {
            this.loseLife();
            return;
        }
        
        // Colisión con barra
        this.checkPaddleCollision();
        
        // Colisión con bloques
        this.checkBlockCollision();
        
        this.updatePositions();
    }
    
    checkPaddleCollision() {
        if (this.ballY + this.ballSize >= this.gameHeight - 45 && 
            this.ballY <= this.gameHeight - 30 &&
            this.ballX + this.ballSize >= this.paddleX && 
            this.ballX <= this.paddleX + this.paddleWidth) {
            
            // Cambiar dirección según dónde golpee la barra
            const ballCenter = this.ballX + this.ballSize / 2;
            const paddleCenter = this.paddleX + this.paddleWidth / 2;
            const relativeIntersect = (ballCenter - paddleCenter) / (this.paddleWidth / 2);
            
            this.ballDX = relativeIntersect * this.ballSpeed;
            this.ballDY = -Math.abs(this.ballDY);
        }
    }
    
    checkBlockCollision() {
        for (let i = this.blocks.length - 1; i >= 0; i--) {
            const block = this.blocks[i];
            
            if (!block.active) continue;
            
            if (this.ballX < block.x + block.width &&
                this.ballX + this.ballSize > block.x &&
                this.ballY < block.y + block.height &&
                this.ballY + this.ballSize > block.y) {
                
                // Determinar dirección de rebote
                const ballCenterX = this.ballX + this.ballSize / 2;
                const ballCenterY = this.ballY + this.ballSize / 2;
                const blockCenterX = block.x + block.width / 2;
                const blockCenterY = block.y + block.height / 2;
                
                const dx = ballCenterX - blockCenterX;
                const dy = ballCenterY - blockCenterY;
                
                if (Math.abs(dx) > Math.abs(dy)) {
                    this.ballDX *= -1;
                } else {
                    this.ballDY *= -1;
                }
                
                // Eliminar bloque
                block.element.remove();
                block.active = false;
                
                // Actualizar puntuación
                this.score += 10;
                this.scoreElement.textContent = this.score;
                
                // Verificar victoria
                this.checkVictory();
                
                break;
            }
        }
    }
    
    loseLife() {
        this.lives--;
        this.livesElement.textContent = this.lives;
        
        if (this.lives <= 0) {
            this.gameOver('¡Game Over! Has perdido todas las vidas.');
        } else {
            this.resetBall();
            this.showMessage(`¡Has perdido una vida! Te quedan ${this.lives} vidas.`);
        }
    }
    
    resetBall() {
        this.ballX = 400;
        this.ballY = 400;
        this.ballDX = this.ballSpeed;
        this.ballDY = -this.ballSpeed;
        this.paddleX = 350;
        this.updatePositions();
    }
    
    checkVictory() {
        const activeBlocks = this.blocks.filter(block => block.active).length;
        
        if (activeBlocks === 0) {
            this.gameWon();
        }
    }
    
    gameWon() {
        this.gameRunning = false;
        cancelAnimationFrame(this.gameLoop);
        this.showMessage('¡Felicidades! ¡Has ganado! 🎉');
        this.gameArea.classList.add('game-over');
    }
    
    gameOver(message) {
        this.gameRunning = false;
        cancelAnimationFrame(this.gameLoop);
        this.showMessage(message);
        this.gameArea.classList.add('game-over');
    }
    
    showMessage(message) {
        this.gameMessage.textContent = message;
    }
    
    startGame() {
        if (!this.gameRunning) {
            this.gameRunning = true;
            this.gameArea.classList.remove('game-over');
            this.showMessage('');
            this.gameLoop = requestAnimationFrame(() => this.update());
        }
    }
    
    resetGame() {
        // Detener juego actual
        this.gameRunning = false;
        cancelAnimationFrame(this.gameLoop);
        
        // Limpiar área de juego
        while (this.gameArea.firstChild) {
            this.gameArea.removeChild(this.gameArea.firstChild);
        }
        
        // Reiniciar variables
        this.blocks = [];
        this.score = 0;
        this.lives = 3;
        this.ballX = 400;
        this.ballY = 400;
        this.ballDX = this.ballSpeed;
        this.ballDY = -this.ballSpeed;
        this.paddleX = 350;
        
        // Actualizar UI
        this.scoreElement.textContent = this.score;
        this.livesElement.textContent = this.lives;
        this.gameArea.classList.remove('game-over');
        
        // Recrear elementos
        this.init();
    }
    
    update() {
        if (!this.gameRunning) return;
        
        this.movePaddle();
        this.moveBall();
        
        this.gameLoop = requestAnimationFrame(() => this.update());
    }
}

// Iniciar juego cuando la página cargue
document.addEventListener('DOMContentLoaded', () => {
    new ArkanoidGame();
});