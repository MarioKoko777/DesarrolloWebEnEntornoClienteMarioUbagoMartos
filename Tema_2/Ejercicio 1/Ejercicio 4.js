// Dividir 1 entre 0
const resultado = 1 / 0;
// Comprobar si el resultado es finito
if (Number.isFinite(resultado)) {
  console.log("El resultado es finito:", resultado);
} else {
  console.log("El resultado NO es finito (es infinito):", resultado);
}