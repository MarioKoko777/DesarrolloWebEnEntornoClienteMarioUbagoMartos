// Esperamos a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const container = document.getElementById('fileInputsContainer');
    const btnAdjuntar = document.getElementById('btnAdjuntar');
    const form = document.getElementById('uploadForm');
    // Función para crear un nuevo input de archivo
    function crearInputFile() {
        const div = document.createElement('div');
        div.className = 'file-input-group';
        const input = document.createElement('input');
        input.type = 'file';
        input.name = 'ficheros'; // Todos tendrán el mismo name   
        div.appendChild(input);
        return div;
    }
    // Función para añadir un nuevo input al contenedor
    function adjuntarInput() {
        const nuevoInput = crearInputFile();
        container.appendChild(nuevoInput);
    }
    // Inicializar con un primer input
    adjuntarInput();
    // Evento para el botón "Adjuntar otro fichero"
    btnAdjuntar.addEventListener('click', adjuntarInput);
    // Evento para el envío del formulario (solo mostramos información)
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitamos el envío real
        // Recogemos todos los inputs de archivo
        const fileInputs = document.querySelectorAll('input[type="file"]');
        let totalFicheros = 0;
        // Contamos cuántos ficheros se han seleccionado en total
        fileInputs.forEach((input) => {
            totalFicheros += input.files.length;
        });     
        // Mostramos un mensaje informativo
        if (totalFicheros > 0) {
            alert(`Has seleccionado ${totalFicheros} fichero(s) para enviar.`);
        } else {
            alert('No has seleccionado ningún fichero.');
        }
    });
});