let numero = 10;
if (numero > 5) {
  numero = 20; // Ahora sí se asigna el nuevo valor
}
console.log(numero); // Muestra: 20
/**El problema en el código es que dentro del if se usó numero == 20 en 
 * lugar de numero = 20. El operador == solo compara valores y no cambia 
 * el valor de la variable, por lo que numero nunca se actualizó y al final 
 * console.log(numero) seguía mostrando 10. Para asignar un nuevo valor a la 
 * variable se debe usar el operador de asignación =. */