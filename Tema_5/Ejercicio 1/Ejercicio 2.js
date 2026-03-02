/**
 * Función para mostrar/ocultar el texto completo de un artículo
 * @param {string} elementId - ID del elemento que contiene el texto completo
 * @param {HTMLElement} button - Botón que activó la función
 */
function toggleArticle(elementId, button) {
    // Obtener el elemento del texto completo
    const fullText = document.getElementById(elementId);
    // Verificar si el texto completo está visible
    // Comprobamos el estilo display actual
    const isVisible = fullText.style.display === 'block';
    if (isVisible) {
        // Ocultar el texto completo
        fullText.style.display = 'none';
        button.textContent = 'Ver Artículo Completo';
    } else {
        // Mostrar el texto completo
        fullText.style.display = 'block';
        button.textContent = 'Ver Menos';
    }
}