// Esperamos a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencias a los elementos del DOM
    const botonAgregar = document.getElementById('btnAgregar');
    const lista = document.getElementById('lista');
    const contadorElement = document.getElementById('contador');
    // Contador para nombrar los elementos
    let contadorElementos = 3; // Empezamos en 3 porque ya hay 3 elementos iniciales
    // Función para actualizar el contador de elementos
    function actualizarContador() {
        const totalElementos = lista.children.length;
        contadorElement.textContent = `Total de elementos: ${totalElementos}`;
    }
    // Función para agregar un nuevo elemento a la lista
    function agregarElemento() {
        // Incrementar el contador
        contadorElementos++;
        // Crear un nuevo elemento li
        const nuevoElemento = document.createElement('li');
        // Añadir contenido al li
        nuevoElemento.textContent = `Elemento ${contadorElementos}`;
        // Añadir el nuevo elemento a la lista
        lista.appendChild(nuevoElemento);
        // Actualizar el contador
        actualizarContador();
        // Opcional: Efecto visual temporal al agregar
        nuevoElemento.style.backgroundColor = '#e8f5e9';
        setTimeout(() => {
            nuevoElemento.style.backgroundColor = '#f9f9f9';
        }, 300);   
        // Mostrar mensaje en consola (solo para desarrollo)
        console.log(`Elemento ${contadorElementos} agregado a la lista`);
    }
    // Asignar el evento click al botón
    botonAgregar.addEventListener('click', agregarElemento);
    // Función opcional: eliminar elementos (doble click)
    lista.addEventListener('dblclick', function(event) {
        if (event.target.tagName === 'LI') {
            const elementoEliminar = event.target;
            
            // Confirmar eliminación (opcional)
            if (confirm(`¿Eliminar "${elementoEliminar.textContent}"?`)) {
                elementoEliminar.remove();
                actualizarContador();
                console.log('Elemento eliminado');
            }
        }
    }); 
    console.log('Aplicación lista para usar');
});