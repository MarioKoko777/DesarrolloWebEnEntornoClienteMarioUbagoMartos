// vistas/VistaLista.js
class VistaLista {
    constructor(contenedor, controlador) {
        this.contenedor = contenedor;
        this.controlador = controlador;
        this.notas = [];
        this.intervaloActualizacion = null;
    }
    
    renderizar(notas) {
        this.notas = notas;
        this.contenedor.className = 'notes-container list-view';
        
        if (notas.length === 0) {
            this.contenedor.innerHTML = '<div class="empty-state">No hay notas creadas. ¡Crea tu primera nota!</div>';
            return;
        }
        
        let html = '';
        notas.forEach(nota => {
            const tiempoTranscurrido = TiempoUtils.calcularTiempoTranscurrido(nota.horaCreacion);
            const fechaCompleta = TiempoUtils.formatearFechaCompleta(nota.horaCreacion);
            
            html += `
                <div class="nota" data-id="${nota.id}">
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
        this.iniciarActualizacionTiempo();
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
        }, 60000);
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