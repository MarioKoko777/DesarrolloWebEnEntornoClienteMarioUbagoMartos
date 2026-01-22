function decodificarRLE(texto) {
  let resultado = "";
  let i = 0;
  while (i < texto.length) {
    const letra = texto[i];
    i++;
    let numero = "";
    while (i < texto.length && !isNaN(texto[i])) {
      numero += texto[i];
      i++;
    }
    resultado += letra.repeat(Number(numero));
  }
  return resultado;
}
// Ejemplo de uso
console.log(decodificarRLE("a3b2c1d3")); // aaabbcddd