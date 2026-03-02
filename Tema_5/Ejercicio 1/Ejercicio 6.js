// Variables globales
let indiceActual = 1;
const totalImagenes = 6;
// Función para cambiar la imagen
function cambiarImagen(direccion) {
    if (direccion === 'siguiente' && indiceActual < totalImagenes) {
        indiceActual++;
    } else if (direccion === 'anterior' && indiceActual > 1) {
        indiceActual--;
    }   
    actualizarImagen();
}
// Función para actualizar la imagen en el DOM
function actualizarImagen() {
    const imagen = document.getElementById('imagen');
    const contador = document.getElementById('contador');
    const botonAnterior = document.getElementById('anterior');
    const botonSiguiente = document.getElementById('siguiente');
    // Actualizar la imagen - las imágenes están en la misma carpeta
    imagen.src = `${indiceActual}.jpg`;
    imagen.alt = `Imagen ${indiceActual}`;
    // Actualizar el contador
    contador.textContent = `Imagen ${indiceActual} de ${totalImagenes}`;   
    // Habilitar/deshabilitar botones según la posición
    botonAnterior.disabled = (indiceActual === 1);
    botonSiguiente.disabled = (indiceActual === totalImagenes);
}
// Función para verificar que las imágenes existen
function verificarImagenes() {
    const imagen = document.getElementById('imagen');
    imagen.onerror = function() {
        console.error(`Error: No se puede cargar la imagen ${this.src}`);
        console.log('Asegúrate de que las imágenes estén en la misma carpeta que el HTML');
        console.log('Nombres requeridos: 1.jpg, 2.jpg, 3.jpg, 4.jpg, 5.jpg, 6.jpg');
        this.src = 'https://via.placeholder.com/600x400?text=Imagen+no+encontrada';
    };   
    imagen.onload = function() {
        console.log(`Imagen cargada correctamente: ${this.src}`);
    };
}
// Inicializar el visor cuando la página carga
document.addEventListener('DOMContentLoaded', function() {
    actualizarImagen();
    verificarImagenes();
});