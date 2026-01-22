// Ejemplo con var
{
    var x = 10;  // 'var' tiene alcance de función o global, no de bloque
}
console.log("Valor de x fuera del bloque:", x);  // Esto funciona
// Ejemplo con let
{
    let y = 20;  // 'let' tiene alcance de bloque
}
console.log("Valor de y fuera del bloque:", y);  // Esto dará un error
/**En JavaScript, las variables declaradas con var no tienen alcance de 
 * bloque, sino de función o global, por lo que pueden ser usadas fuera 
 * del bloque {} donde se declaran, mientras que las variables declaradas 
 * con let sí tienen alcance de bloque y solo existen dentro del bloque 
 * donde se crearon, causando un error si intentamos acceder a ellas desde fuera. 
 * Esto hace que let y const sean más seguras para evitar conflictos de variables en bloques de código. */