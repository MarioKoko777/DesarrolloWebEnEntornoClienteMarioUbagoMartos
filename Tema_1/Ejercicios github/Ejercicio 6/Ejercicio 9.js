let numeros = [1, 2, 3, 4, 5];
for (let i = 0; i < numeros.length; i++) {
  console.log(numeros[i]);
}
/**El problema en el código es que hay un punto y coma (;) justo después de la declaración del for, 
 * lo que hace que el bucle no tenga cuerpo y termine inmediatamente. 
 * Como resultado, el bloque { console.log(numeros[i]); } queda fuera del 
 * bucle y al intentar usar i produce un error o imprime undefined. 
 * La solución es quitar el punto y coma para que el bloque entre {} se ejecute en cada 
 * iteración del bucle. */