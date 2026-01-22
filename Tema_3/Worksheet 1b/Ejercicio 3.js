const stringLength = str => {
    let length = str.length; // guardamos la longitud en una variable
    console.log(`the length of "${str}" is:`, length); // mostramos en consola
    return length; // devolvemos la longitud
};
// Ejemplo de uso
let resultado = stringLength("willynilly"); 
// imprime: the length of "willynilly" is: 10
console.log("La longitud devuelta es:", resultado); // muestra: La longitud devuelta es: 10