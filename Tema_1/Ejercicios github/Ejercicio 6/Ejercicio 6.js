let dias = ["Lunes", "Martes", "Miércoles"];
console.log(dias[2]);
/**El problema en este código es que se intenta acceder a un índice que no existe en el array. 
 * Los arrays en JavaScript comienzan en el índice 0, por lo que un array con tres elementos tiene 
 * índices 0, 1 y 2. Al usar dias[3], se está solicitando un cuarto elemento que no existe, 
 * lo que hace que JavaScript devuelva undefined. Para evitar este error, siempre hay que asegurarse 
 * de que el índice que se usa esté dentro del rango válido del array. */