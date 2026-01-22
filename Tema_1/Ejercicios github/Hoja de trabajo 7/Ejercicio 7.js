function combineAllArrays(...arrays) {
    let combinado = [];
    for (let arr of arrays) {
        combinado = [...combinado, ...arr];
    }
    return combinado;
}
// Ejemplo de uso
const a1 = [1, 2];
const a2 = [3, 4];
const a3 = [5, 6];
const resultado = combineAllArrays(a1, a2, a3);
console.log(resultado); // [1, 2, 3, 4, 5, 6]