class Puzzle15 {
    constructor() {
        this.board = document.getElementById('board');
        this.message = document.getElementById('message');
        this.moveCountSpan = document.getElementById('moveCount');
        this.size = 4;
        this.tiles = [];
        this.emptyRow = 3;
        this.emptyCol = 3;
        this.moves = 0;
        this.solved = false;
        
        this.initBoard();
        this.setupEventListeners();
    }
    
    initBoard() {
        // Crear el tablero ordenado inicialmente
        for (let i = 0; i < 16; i++) {
            this.tiles.push(i + 1);
        }
        this.tiles[15] = 16; // Usamos 16 para representar el espacio vacío
        
        this.render();
    }
    
    render() {
        this.board.innerHTML = '';
        
        for (let i = 0; i < this.tiles.length; i++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            
            if (this.tiles[i] === 16) {
                tile.classList.add('empty');
                tile.textContent = '';
            } else {
                tile.textContent = this.tiles[i];
            }
            
            tile.dataset.index = i;
            tile.addEventListener('click', (e) => this.handleTileClick(e));
            
            this.board.appendChild(tile);
        }
    }
    
    handleTileClick(e) {
        if (this.solved) return;
        
        const index = parseInt(e.target.dataset.index);
        const row = Math.floor(index / 4);
        const col = index % 4;
        
        // Verificar si la ficha clickeada es adyacente al espacio vacío
        if (this.isAdjacentToEmpty(row, col)) {
            this.swapTiles(row, col);
            this.moves++;
            this.moveCountSpan.textContent = this.moves;
            
            if (this.checkWin()) {
                this.solved = true;
                this.message.textContent = '🎉 ¡Felicidades! Has resuelto el puzzle 🎉';
                this.message.classList.add('win');
                setTimeout(() => {
                    this.message.classList.remove('win');
                }, 500);
            }
        }
    }
    
    isAdjacentToEmpty(row, col) {
        return (Math.abs(row - this.emptyRow) === 1 && col === this.emptyCol) ||
               (Math.abs(col - this.emptyCol) === 1 && row === this.emptyRow);
    }
    
    swapTiles(row, col) {
        const clickedIndex = row * 4 + col;
        const emptyIndex = this.emptyRow * 4 + this.emptyCol;
        
        // Intercambiar valores
        [this.tiles[clickedIndex], this.tiles[emptyIndex]] = 
        [this.tiles[emptyIndex], this.tiles[clickedIndex]];
        
        // Actualizar posición del espacio vacío
        this.emptyRow = row;
        this.emptyCol = col;
        
        this.render();
    }
    
    shuffle() {
        this.solved = false;
        this.message.textContent = '';
        this.moves = 0;
        this.moveCountSpan.textContent = '0';
        
        // Realizar movimientos aleatorios para mezclar
        const moves = 200;
        for (let i = 0; i < moves; i++) {
            const possibleMoves = this.getPossibleMoves();
            const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            this.swapTiles(randomMove.row, randomMove.col);
        }
    }
    
    getPossibleMoves() {
        const moves = [];
        const directions = [
            { row: -1, col: 0 }, // arriba
            { row: 1, col: 0 },  // abajo
            { row: 0, col: -1 }, // izquierda
            { row: 0, col: 1 }   // derecha
        ];
        
        for (const dir of directions) {
            const newRow = this.emptyRow + dir.row;
            const newCol = this.emptyCol + dir.col;
            
            if (newRow >= 0 && newRow < 4 && newCol >= 0 && newCol < 4) {
                moves.push({ row: newRow, col: newCol });
            }
        }
        
        return moves;
    }
    
    checkWin() {
        for (let i = 0; i < 15; i++) {
            if (this.tiles[i] !== i + 1) {
                return false;
            }
        }
        return this.tiles[15] === 16;
    }
    
    reset() {
        this.tiles = [];
        for (let i = 0; i < 16; i++) {
            this.tiles.push(i + 1);
        }
        this.tiles[15] = 16;
        this.emptyRow = 3;
        this.emptyCol = 3;
        this.moves = 0;
        this.solved = false;
        this.message.textContent = '';
        this.moveCountSpan.textContent = '0';
        this.render();
    }
    
    setupEventListeners() {
        document.getElementById('shuffleBtn').addEventListener('click', () => {
            this.shuffle();
        });
        
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.reset();
        });
    }
}

// Inicializar el juego cuando la página cargue
document.addEventListener('DOMContentLoaded', () => {
    new Puzzle15();
});