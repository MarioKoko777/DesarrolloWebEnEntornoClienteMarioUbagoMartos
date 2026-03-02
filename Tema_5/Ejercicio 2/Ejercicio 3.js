class ImagePuzzle15 {
    constructor() {
        this.board = document.getElementById('board');
        this.previewBoard = document.getElementById('previewBoard');
        this.message = document.getElementById('message');
        this.moveCountSpan = document.getElementById('moveCount');
        this.imageSelect = document.getElementById('imageSelect');
        this.modal = document.getElementById('imageModal');
        this.imageUpload = document.getElementById('imageUpload');
        this.uploadPreview = document.getElementById('uploadPreview');
        this.applyImageBtn = document.getElementById('applyImageBtn');
        
        this.size = 4;
        this.tiles = [];
        this.emptyRow = 3;
        this.emptyCol = 3;
        this.moves = 0;
        this.solved = false;
        this.currentImage = 'nature';
        this.customImageUrl = null;
        
        // Imágenes predefinidas (usaremos imágenes de placeholder de alta calidad)
        this.images = {
            nature: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
            city: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=400&fit=crop',
            abstract: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=400&fit=crop'
        };
        
        this.init();
        this.setupEventListeners();
    }
    
    init() {
        this.reset();
        this.setupModal();
    }
    
    reset() {
        this.tiles = [];
        for (let i = 0; i < 16; i++) {
            this.tiles.push(i);
        }
        this.emptyRow = 3;
        this.emptyCol = 3;
        this.moves = 0;
        this.solved = false;
        this.message.textContent = '';
        this.moveCountSpan.textContent = '0';
        this.render();
        this.renderPreview();
    }
    
    render() {
        this.board.innerHTML = '';
        
        for (let i = 0; i < this.tiles.length; i++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            
            if (this.tiles[i] === 15) { // Espacio vacío
                tile.classList.add('empty');
            } else {
                // Calcular posición de la imagen para esta pieza
                const row = Math.floor(this.tiles[i] / 4);
                const col = this.tiles[i] % 4;
                const imageUrl = this.customImageUrl || this.images[this.currentImage];
                
                tile.style.backgroundImage = `url('${imageUrl}')`;
                tile.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;
            }
            
            tile.dataset.index = i;
            tile.addEventListener('click', (e) => this.handleTileClick(e));
            
            this.board.appendChild(tile);
        }
    }
    
    renderPreview() {
        this.previewBoard.innerHTML = '';
        const imageUrl = this.customImageUrl || this.images[this.currentImage];
        
        for (let i = 0; i < 16; i++) {
            const previewTile = document.createElement('div');
            previewTile.className = 'preview-tile';
            
            if (i === 15) {
                previewTile.classList.add('empty');
            } else {
                const row = Math.floor(i / 4);
                const col = i % 4;
                previewTile.style.backgroundImage = `url('${imageUrl}')`;
                previewTile.style.backgroundPosition = `-${col * 60}px -${row * 60}px`;
            }
            
            this.previewBoard.appendChild(previewTile);
        }
    }
    
    handleTileClick(e) {
        if (this.solved) return;
        
        const index = parseInt(e.target.dataset.index);
        const row = Math.floor(index / 4);
        const col = index % 4;
        
        if (this.isAdjacentToEmpty(row, col)) {
            this.swapTiles(row, col);
            this.moves++;
            this.moveCountSpan.textContent = this.moves;
            
            if (this.checkWin()) {
                this.solved = true;
                this.message.textContent = '🎉 ¡Felicidades! Has completado el puzzle 🎉';
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
        
        [this.tiles[clickedIndex], this.tiles[emptyIndex]] = 
        [this.tiles[emptyIndex], this.tiles[clickedIndex]];
        
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
            { row: -1, col: 0 },
            { row: 1, col: 0 },
            { row: 0, col: -1 },
            { row: 0, col: 1 }
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
            if (this.tiles[i] !== i) {
                return false;
            }
        }
        return this.tiles[15] === 15;
    }
    
    changeImage(imageKey) {
        if (imageKey === 'custom') {
            this.modal.style.display = 'block';
        } else {
            this.currentImage = imageKey;
            this.customImageUrl = null;
            this.reset();
        }
    }
    
    setupModal() {
        // Cerrar modal con la X
        document.querySelector('.close').addEventListener('click', () => {
            this.modal.style.display = 'none';
        });
        
        // Cerrar modal haciendo clic fuera
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.modal.style.display = 'none';
            }
        });
        
        // Vista previa de imagen subida
        this.imageUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.uploadPreview.src = e.target.result;
                    this.uploadPreview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });
        
        // Aplicar imagen personalizada
        this.applyImageBtn.addEventListener('click', () => {
            if (this.uploadPreview.src && this.uploadPreview.src !== '#') {
                this.customImageUrl = this.uploadPreview.src;
                this.currentImage = 'custom';
                this.modal.style.display = 'none';
                this.reset();
            } else {
                alert('Por favor, selecciona una imagen primero');
            }
        });
    }
    
    setupEventListeners() {
        document.getElementById('shuffleBtn').addEventListener('click', () => {
            this.shuffle();
        });
        
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.reset();
        });
        
        this.imageSelect.addEventListener('change', (e) => {
            this.changeImage(e.target.value);
        });
    }
}

// Inicializar el juego cuando la página cargue
document.addEventListener('DOMContentLoaded', () => {
    new ImagePuzzle15();
});