for (let i = 0; i < palabra.length; i++) {
  console.log(palabra[i]);
}
/**El problema en este código es que el bucle usa la condición i <= palabra.length, 
 * lo que hace que la variable i llegue a un valor igual a la longitud de la cadena. 
 * Como los índices de un string en JavaScript empiezan en 0 y van hasta length - 1, 
 * el índice palabra[length] no existe, por lo que en la última iteración se imprime undefined. 
 * La forma correcta de recorrer todos los caracteres es usar i < palabra.length, asegurando que 
 * solo se accedan índices válidos. */