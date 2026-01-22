function ruleta() {
  // Números de la ruleta del 1 al 36
  const ganador = Math.floor(Math.random() * 36) + 1;
  return ganador;
}
// Ejemplo de uso
console.log("Número ganador:", ruleta());