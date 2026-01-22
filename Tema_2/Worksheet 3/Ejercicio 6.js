function buscarSubcadena(cadenaPrincipal, subcadena) {
  // indexOf devuelve -1 si no encuentra la subcadena
  const posicion = cadenaPrincipal.indexOf(subcadena);
  if (posicion !== -1) {
    return `La subcadena "${subcadena}" se encuentra en la posición ${posicion}.`;
  } else {
    return `La subcadena "${subcadena}" no se encuentra en la cadena principal.`;
  }
}
// Ejemplos de uso
console.log(buscarSubcadena("hola mundo", "mundo")); // posición 5
console.log(buscarSubcadena("hola mundo", "adiós")); // no encontrada