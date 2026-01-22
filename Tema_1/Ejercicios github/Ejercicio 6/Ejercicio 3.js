function sumar(a, b) {
  let resultado = a + b;
  return resultado;
}
console.log(sumar(2, 3)); // 5
/**El problema principal en ese código es que la función sumar 
 * no tiene una instrucción return, por lo que, aunque calcula 
 * la suma de a + b y la guarda en la variable resultado, ese 
 * valor no se envía de vuelta al lugar donde se llama la función. 
 * En JavaScript, si una función no retorna explícitamente un valor, 
 * devuelve undefined por defecto. Por eso, al hacer console.log(sumar(2, 3)), 
 * se imprime undefined en lugar de 5. La solución es usar return resultado; 
 * dentro de la función para que el resultado se devuelva correctamente. */