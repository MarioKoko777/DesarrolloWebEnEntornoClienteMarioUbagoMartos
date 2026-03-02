// vistas/VistaGrid.js
class VistaGrid {
    constructor(contenedor, controlador) {
        this.contenedor = contenedor;
        this.controlador = controlador;
        this.notas = [];
        this.intervaloActualizacion = null;
    }
    
    renderizar(notas) {
        this.notas = notas;
        this.contenedor.className = 'notes-container grid-view';
        
        if (notas.length === 0) {
            this.contenedor.innerHTML = '<div class="empty-state">No hay notas creadas. ¡Crea tu primera nota!</div>';
            return;
        }
        
        let html = '';
        notas.forEach(nota => {
            const tiempoTranscurrido = TiempoUtils.calcularTiempoTranscurrido(nota.horaCreacion);
            const fechaCompleta = TiempoUtils.formatearFechaCompleta(nota.horaCreacion);
            
            html += `
                <div class="nota" draggable="true" data-id="${nota.id}" 
                     style="transform: translate(${nota.posX || 0}px, ${nota.posY || 0}px)">
                    <h3>${this.escapeHTML(nota.titulo)}</h3>
                    <p>${this.escapeHTML(nota.texto)}</p>
                    <div class="tiempo-creacion" title="${fechaCompleta}">
                        ⏱️ ${tiempoTranscurrido}
                    </div>
                    <div class="acciones">
                        <button class="btn-editar" onclick="app.abrirModalEdicion('${nota.id}')">✏️ Editar</button>
                        <button class="btn-eliminar" onclick="app.eliminarNota('${nota.id}')">🗑️ Eliminar</button>
                    </div>
                </div>
            `;
        });
        
        this.contenedor.innerHTML = html;
        this.configurarDragAndDrop();
        this.iniciarActualizacionTiempo();
    }
    
    configurarDragAndDrop() {
        const notas = this.contenedor.querySelectorAll('.nota');
        
        notas.forEach(nota => {
            nota.addEventListener('dragstart', (e) => {
                nota.classList.add('dragging');
                e.dataTransfer.setData('text/plain', nota.dataset.id);
            });
            
            nota.addEventListener('dragend', (e) => {
                nota.classList.remove('dragging');
                
                // Obtener nueva posición
                const rect = nota.getBoundingClientRect();
                const containerRect = this.contenedor.getBoundingClientRect();
                
                // Calcular posición relativa al contenedor
                const posX = rect.left - containerRect.left;
                const posY = rect.top - containerRect.top;
                
                // Actualizar en el modelo
                this.controlador.actualizarPosicionNota(nota.dataset.id, posX, posY);
            });
        });
        
        // Permitir soltar en el contenedor
        this.contenedor.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        
        this.contenedor.addEventListener('drop', (e) => {
            e.preventDefault();
            const id = e.dataTransfer.getData('text/plain');
            const nota = document.querySelector(`.nota[data-id="${id}"]`);
            
            if (nota) {
                const rect = this.contenedor.getBoundingClientRect();
                const posX = e.clientX - rect.left - 140; // Centrar aproximadamente
                const posY = e.clientY - rect.top - 75;
                
                nota.style.transform = `translate(${posX}px, ${posY}px)`;
                this.controlador.actualizarPosicionNota(id, posX, posY);
            }
        });
    }
    
    iniciarActualizacionTiempo() {
        if (this.intervaloActualizacion) {
            clearInterval(this.intervaloActualizacion);
        }
        
        this.intervaloActualizacion = setInterval(() => {
            const elementosTiempo = this.contenedor.querySelectorAll('.tiempo-creacion');
            elementosTiempo.forEach((elemento, index) => {
                const nota = this.notas[index];
                if (nota) {
                    const tiempoTranscurrido = TiempoUtils.calcularTiempoTranscurrido(nota.horaCreacion);
                    elemento.innerHTML = `⏱️ ${tiempoTranscurrido}`;
                }
            });
        }, 60000); // Actualizar cada minuto
    }
    
    destroy() {
        if (this.intervaloActualizacion) {
            clearInterval(this.intervaloActualizacion);
        }
    }
    
    escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}