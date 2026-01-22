let usuario = { nombre: "Ana", edad: 25 };
console.log(usuario.nombre.toLowerCase()); // Muestra: "ana"
/**El problema en el código es que se escribió incorrectamente el método toLowerCase como toLowerCasee() 
 * con una “e” extra. En JavaScript, los métodos de los strings son sensibles a mayúsculas y minúsculas, y 
 * escribir mal el nombre provoca un error de tipo TypeError, indicando que no es una función. 
 * La forma correcta es usuario.nombre.toLowerCase(), que convierte el texto a minúsculas y funciona 
 * sin errores. */