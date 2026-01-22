function reorganizarCadena(cadena) {
  const vocales = "aeiouAEIOU";
  let consonantes = "";
  let vocalesEnCadena = "";
  for (let i = 0; i < cadena.length; i++) {
    const letra = cadena[i];
    if (letra === " ") continue; // Ignorar espacios
    if (vocales.includes(letra)) {
      vocalesEnCadena += letra;
    } else {
      consonantes += letra;
    }
  }
  return consonantes + vocalesEnCadena;
}
// Ejemplo de uso
const texto = "Hola Mundo";
const resultado = reorganizarCadena(texto);
console.log(resultado); // "HlMndouao"