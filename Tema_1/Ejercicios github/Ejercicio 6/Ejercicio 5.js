let saludo = "Hola";
let nombre = "Luis";
console.log(saludo + ", " + nombre);
/**El problema ocurre porque al concatenar cadenas se debe usar el operador + para unirlas. 
 * No se puede poner una coma , dentro de la concatenación; eso genera un error de sintaxis. 
 * En la corrección, se agrega la coma como parte de la cadena ", " y se concatena correctamente con +. */