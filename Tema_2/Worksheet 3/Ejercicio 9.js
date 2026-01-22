function mostrarTablaCuadrada(palabra) {
  const n = palabra.length;
  // Primera fila
  console.log(palabra.split('').join(' '));
  // Filas intermedias
  for (let i = 1; i < n - 1; i++) {
    const izquierda = palabra[i];
    const derecha = palabra[n - i - 1];
    // Espacios intermedios
    const espacios = (n - 2) * 2 - 1;
    console.log(izquierda + ' '.repeat(espacios) + derecha);
  }
  // Última fila (invertida)
  console.log(palabra.split('').reverse().join(' '));
}
// Ejemplos
mostrarTablaCuadrada('HOLA');
console.log('\n');
mostrarTablaCuadrada('MUNDO');
mostrarTablaCuadrada('LILKOKO');