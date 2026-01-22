/**
 * @name getFileExtension
 * @description Obtiene la extensión de un archivo
 *
 * @param {string} file - El nombre del archivo a obtener la extensión 
 * @returns {string} - La extensión del archivo
 * 
 * @example
 *  getFileExtension("imagen.jpg") // returns "jpg"
 */
function getFileExtension(file) {
    // Buscar la última posición del punto
    const lastDotIndex = file.lastIndexOf(".");
    // Si no hay punto, devolver cadena vacía
    if (lastDotIndex === -1) return "";
    // Retornar la parte después del último punto
    return file.slice(lastDotIndex + 1);
}
// Ejemplo de uso
console.log(getFileExtension("documento.pdf")); // "pdf"
console.log(getFileExtension("foto.png"));      // "png"
console.log(getFileExtension("archivo"));       // ""
console.log(getFileExtension("archivo.tar.gz"));// "gz"