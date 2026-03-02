// app.js
class App {
    constructor() {
        this.modelo = new ModeloNota();
        this.vistaActual = null;
        this.tipoVista = 'grid';
        this.contenedor = document.getElementById('contenedor-notas');
        this.modalEdicion = null;
        this.notaEnEdicion = null;
        
        this.inicializar();
    }
    
    async inicializar() {
        // Cargar notas desde JSON/localStorage
        await this.cargarNotasIniciales();
        
        // Configurar eventos
        this.configurarEventos();
        
        // Crear modal de edición
        this.crearModalEdicion();
        
        // Mostrar vista inicial
        await this.cambiarVista('grid');
    }
    
    async cargarNotasIniciales() {
        // Intentar cargar desde localStorage primero
        const notasGuardadas = localStorage.getItem('notas');
        if (notasGuardadas) {
            this.modelo.notas = JSON.parse(notasGuardadas);
        } else {
            // Si no hay en localStorage, cargar desde JSON
            await this.modelo.cargarNotas();
        }
    }
    
    configurarEventos() {
        // Botones de cambio de vista
        document.getElementById('btnVistaGrid').addEventListener('click', () => this.cambiarVista('grid'));
        document.getElementById('btnVistaLista').addEventListener('click', () => this.cambiarVista('lista'));
        
        // Formulario de creación
        document.getElementById('formCrearNota').addEventListener('submit', (e) => {
            e.preventDefault();
            this.crearNota();
        });
    }
    
    crearModalEdicion() {
        const modalHTML = `
            <div id="modalEdicion" class="modal">
                <div class="modal-content">
                    <h2>Editar Nota</h2>
                    <input type="text" id="editTitulo" placeholder="Título">
                    <textarea id="editTexto" placeholder="Contenido"></textarea>
                    <div class="modal-buttons">
                        <button id="btnGuardarEdicion">Guardar</button>
                        <button id="btnCancelarEdicion">Cancelar</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        this.modalEdicion = document.getElementById('modalEdicion');
        
        document.getElementById('btnGuardarEdicion').addEventListener('click', () => this.guardarEdicion());
        document.getElementById('btnCancelarEdicion').addEventListener('click', () => this.cerrarModal());
        
        // Cerrar modal al hacer clic fuera
        this.modalEdicion.addEventListener('click', (e) => {
            if (e.target === this.modalEdicion) {
                this.cerrarModal();
            }
        });
    }
    
    async cambiarVista(tipo) {
        // Actualizar botones
        document.getElementById('btnVistaGrid').classList.toggle('active', tipo === 'grid');
        document.getElementById('btnVistaLista').classList.toggle('active', tipo === 'lista');
        
        // Destruir vista actual si existe
        if (this.vistaActual) {
            this.vistaActual.destroy();
        }
        
        // Crear nueva vista
        if (tipo === 'grid') {
            this.vistaActual = new VistaGrid(this.contenedor, this);
        } else {
            this.vistaActual = new VistaLista(this.contenedor, this);
        }
        
        this.tipoVista = tipo;
        
        // Renderizar notas
        this.vistaActual.renderizar(this.modelo.notas);
    }
    
    async crearNota() {
        const titulo = document.getElementById('tituloNota').value;
        const texto = document.getElementById('textoNota').value;
        
        if (titulo && texto) {
            await this.modelo.crearNota(titulo, texto);
            
            // Limpiar formulario
            document.getElementById('tituloNota').value = '';
            document.getElementById('textoNota').value = '';
            
            // Actualizar vista
            this.vistaActual.renderizar(this.modelo.notas);
        }
    }
    
    async eliminarNota(id) {
        if (confirm('¿Estás seguro de que quieres eliminar esta nota?')) {
            await this.modelo.eliminarNota(id);
            this.vistaActual.renderizar(this.modelo.notas);
        }
    }
    
    abrirModalEdicion(id) {
        const nota = this.modelo.notas.find(n => n.id === id);
        if (nota) {
            this.notaEnEdicion = nota;
            document.getElementById('editTitulo').value = nota.titulo;
            document.getElementById('editTexto').value = nota.texto;
            this.modalEdicion.classList.add('active');
        }
    }
    
    async guardarEdicion() {
        if (this.notaEnEdicion) {
            const nuevoTitulo = document.getElementById('editTitulo').value;
            const nuevoTexto = document.getElementById('editTexto').value;
            
            if (nuevoTitulo && nuevoTexto) {
                await this.modelo.actualizarNota(this.notaEnEdicion.id, nuevoTitulo, nuevoTexto);
                this.vistaActual.renderizar(this.modelo.notas);
                this.cerrarModal();
            }
        }
    }
    
    cerrarModal() {
        this.modalEdicion.classList.remove('active');
        this.notaEnEdicion = null;
        document.getElementById('editTitulo').value = '';
        document.getElementById('editTexto').value = '';
    }
    
    async actualizarPosicionNota(id, posX, posY) {
        await this.modelo.actualizarPosicion(id, posX, posY);
    }
}

// Inicializar la aplicación
const app = new App();