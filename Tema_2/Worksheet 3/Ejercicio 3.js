function localizarSubcadenas(cadena, subcadena) {
  let posiciones = [];
  let indice = cadena.indexOf(subcadena); // busca la primera aparición
  while (indice !== -1) {
    posiciones.push(indice); // guarda la posición encontrada
    indice = cadena.indexOf(subcadena, indice + 1); // busca desde la siguiente posición
  }
  return posiciones;
}
// Ejemplo de uso:
const texto = "Hola mundo, mundo es grande, mundo!";
const resultado = localizarSubcadenas(texto, "mundo");
console.log(resultado); // [5, 12, 28]