function validarNumero(cadena) {
  if (cadena.trim() === "" || isNaN(cadena)) {
    return "No es un número válido";
  }
  let numero = Number(cadena);
  if (Number.isInteger(numero)) {
    return "Es un número válido entero";
  } else {
    return "Es un número válido decimal";
  }
}
// Ejemplos
console.log(validarNumero("123"));    // Es un número válido entero
console.log(validarNumero("3.14"));   // Es un número válido decimal
console.log(validarNumero("abc"));    // No es un número válido
console.log(validarNumero("  5  "));  // Es un número válido entero