function onlyUniques(...args) {
    // Convertimos los argumentos en un Set para eliminar duplicados, luego lo transformamos de nuevo en array
    return [...new Set(args)];
}
// Ejemplos de uso
console.log(onlyUniques('gato', 'gato', 'perro', 'cerdo')); // ['gato', 'perro', 'cerdo']
console.log(onlyUniques(1, 4, 7, 1, 2, 7, 4)); // [1, 4, 7, 2]