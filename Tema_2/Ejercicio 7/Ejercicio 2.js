function simuladorDados(n, m) {
  let resultados = [];
  let sumaTotal = 0;
  for (let i = 0; i < n; i++) {
    const dado = Math.floor(Math.random() * m) + 1;
    resultados.push(dado);
    sumaTotal += dado;
  }
  return `${resultados.join(", ")} → total ${sumaTotal}`;
}
// Ejemplo de uso
console.log(simuladorDados(3, 6));