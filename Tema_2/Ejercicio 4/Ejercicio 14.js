function esPalindromo(palabra) {
    // Convertimos la palabra a minúsculas para evitar problemas con mayúsculas
    let palabraMinuscula = palabra.toLowerCase();
    // Invertimos la palabra
    let palabraInvertida = palabraMinuscula.split('').reverse().join('');
    // Comparamos la palabra original con la invertida
    return palabraMinuscula === palabraInvertida;
}
// Ejemplos
console.log(esPalindromo("radar")); // true
console.log(esPalindromo("hola"));  // false
console.log(esPalindromo("Level")); // true