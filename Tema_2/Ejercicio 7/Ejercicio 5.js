function comprimirRLE(texto) {
  if (texto.length === 0) return "";
  let resultado = "";
  let contador = 1;
  for (let i = 0; i < texto.length; i++) {
    if (texto[i] === texto[i + 1]) {
      contador++;
    } else {
      resultado += texto[i] + contador;
      contador = 1;
    }
  }
  return resultado;
}
// Ejemplo de uso
const entrada = "aaabbcddd";
const salida = comprimirRLE(entrada);
console.log(salida); // a3b2c1d3