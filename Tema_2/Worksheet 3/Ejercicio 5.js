function eliminarRepetidos(cadena) {
  let resultado = "";
  for (let i = 0; i < cadena.length; i++) {
    if (!resultado.includes(cadena[i])) {
      resultado += cadena[i];
    }
  }
  return resultado;
}
// Ejemplos de uso
console.log(eliminarRepetidos("hola mundo")); // "holamund"
console.log(eliminarRepetidos("programacion")); // "progamnci"
console.log(eliminarRepetidos("aa bb cc")); // "abc"