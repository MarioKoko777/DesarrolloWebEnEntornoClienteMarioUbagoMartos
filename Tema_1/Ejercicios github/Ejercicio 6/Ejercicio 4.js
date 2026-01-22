let i = 1;
while (i <= 5) {
  console.log(i);
  i++;
}
/**El problema en este código es que la condición del bucle while (i > 5) nunca se cumple al inicio, 
 * porque i vale 1, que no es mayor que 5. Por eso, el cuerpo del bucle nunca se ejecuta y no se imprime 
 * nada en la consola. Para que el bucle funcione y cuente del 1 al 5, la condición debería ser i <= 5. */