const resultado = document.getElementById("resultado");
// --- Matrices de ejemplo ---
const numeros = [3, 6, 9, 12, 15, 8, 7];
const cadenas = ["mesa", "silla", "escalera", "lámpara", "espejo"];
const palabras = ["hola", "este", "es", "javascript", "programación"];
// 1️ Buscar el número más grande
const maxNum = Math.max(...numeros);
resultado.innerHTML += `<p>Número más grande: ${maxNum}</p>`;
// 2️ Buscar la cadena más larga
const cadenaMasLarga = cadenas.reduce((a, b) => a.length >= b.length ? a : b);
resultado.innerHTML += `<p>Cadena más larga: ${cadenaMasLarga}</p>`;
// 3️ Buscar números pares
const numerosPares = numeros.filter(n => n % 2 === 0);
resultado.innerHTML += `<p>Números pares: ${numerosPares.join(", ")}</p>`;
// 4️ Buscar números impares
const numerosImpares = numeros.filter(n => n % 2 !== 0);
resultado.innerHTML += `<p>Números impares: ${numerosImpares.join(", ")}</p>`;
// 5️ Buscar palabras que contengan "es"
const palabrasEs = palabras.filter(p => p.includes("es"));
resultado.innerHTML += `<p>Palabras que contienen "es": ${palabrasEs.join(", ")}</p>`;
// 6️ Afirmar que todos los números son divisibles por 3
const todosDiv3 = numeros.every(n => n % 3 === 0);
resultado.innerHTML += `<p>Todos los números divisibles por 3: ${todosDiv3}</p>`;
// 7️ Combinar dos matrices
const matrizCombinada = numeros.concat(palabras);
resultado.innerHTML += `<p>Matriz combinada: ${matrizCombinada.join(", ")}</p>`;
// 8️ Ordenar la matriz unida de menor a mayor (solo números)
const soloNumeros = matrizCombinada.filter(el => typeof el === "number");
const numerosOrdenados = soloNumeros.sort((a, b) => a - b);
resultado.innerHTML += `<p>Números ordenados: ${numerosOrdenados.join(", ")}</p>`;
// 9️ Eliminar la primera palabra de la matriz de palabras
palabras.shift();
resultado.innerHTML += `<p>Matriz de palabras tras eliminar la primera: ${palabras.join(", ")}</p>`;
// 10 Colocar una nueva palabra al principio de la matriz
palabras.unshift("nuevo");
resultado.innerHTML += `<p>Matriz de palabras tras añadir al principio: ${palabras.join(", ")}</p>`;
// 11 Reemplazar algunos elementos (ej: reemplazar índice 1 y 2)
palabras.splice(1, 2, "reemplazo1", "reemplazo2");
resultado.innerHTML += `<p>Matriz de palabras tras reemplazar elementos: ${palabras.join(", ")}</p>`;