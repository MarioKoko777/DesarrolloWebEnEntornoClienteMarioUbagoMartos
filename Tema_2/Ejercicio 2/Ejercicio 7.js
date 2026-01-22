function numeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Ejemplos
console.log(numeroAleatorio(1, 10));  // puede ser cualquier entero entre 1 y 10
console.log(numeroAleatorio(50, 60)); // puede ser cualquier entero entre 50 y 60