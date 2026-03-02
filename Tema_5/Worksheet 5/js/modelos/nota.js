// modelos/Nota.js
class ModeloNota {
    constructor() {
        this.notas = [];
        this.apiURL = 'data/notas.json';
    }
    
    async cargarNotas() {
        try {
            const response = await fetch(this.apiURL);
            if (!response.ok) {
                throw new Error('Error al cargar las notas');
            }
            const data = await response.json();
            this.notas = data;
            return this.notas;
        } catch (error) {
            console.error('Error cargando notas:', error);
            this.notas = [];
            return [];
        }
    }
    
    async guardarNotas() {
        try {
            // En un entorno real, esto sería una petición POST/PUT a un servidor
            // Para desarrollo local, guardamos en localStorage como respaldo
            localStorage.setItem('notas', JSON.stringify(this.notas));
            
            // Simulamos guardado en JSON (en producción sería una llamada API)
            console.log('Notas guardadas:', this.notas);
            
            return true;
        } catch (error) {
            console.error('Error guardando notas:', error);
            return false;
        }
    }
    
    async crearNota(titulo, texto) {
        const nuevaNota = {
            id: Date.now().toString(),
            titulo: titulo,
            texto: texto,
            horaCreacion: new Date().getTime(),
            posX: Math.random() * 20, // Para variación en posición
            posY: Math.random() * 20
        };
        
        this.notas.push(nuevaNota);
        await this.guardarNotas();
        return nuevaNota;
    }
    
    async eliminarNota(id) {
        this.notas = this.notas.filter(nota => nota.id !== id);
        await this.guardarNotas();
    }
    
    async actualizarNota(id, nuevoTitulo, nuevoTexto) {
        const notaIndex = this.notas.findIndex(nota => nota.id === id);
        if (notaIndex !== -1) {
            this.notas[notaIndex].titulo = nuevoTitulo;
            this.notas[notaIndex].texto = nuevoTexto;
            await this.guardarNotas();
            return this.notas[notaIndex];
        }
        return null;
    }
    
    async actualizarPosicion(id, posX, posY) {
        const notaIndex = this.notas.findIndex(nota => nota.id === id);
        if (notaIndex !== -1) {
            this.notas[notaIndex].posX = posX;
            this.notas[notaIndex].posY = posY;
            await this.guardarNotas();
            return true;
        }
        return false;
    }
}