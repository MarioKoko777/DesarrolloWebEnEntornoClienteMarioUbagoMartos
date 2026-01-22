function esPalindromo(cadena) {
  // Convertir a minúsculas y eliminar caracteres no alfabéticos
  const textoLimpio = cadena
    .toLowerCase()
    .replace(/[^a-z0-9]/g, ""); // elimina espacios y signos
  // Invertir la cadena
  const textoInvertido = textoLimpio.split("").reverse().join("");
  // Comparar
  return textoLimpio === textoInvertido;
}
// Ejemplos de uso
console.log(esPalindromo("Anita lava la tina")); // true
console.log(esPalindromo("Hola mundo"));        // false
console.log(esPalindromo("A man, a plan, a canal, Panama")); // true