function combineTwoArrays(arr1, arr2) {
    return [...arr1, ...arr2];
}
// Ejemplo de uso
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const combinado = combineTwoArrays(array1, array2);
console.log(combinado); // [1, 2, 3, 4, 5, 6]