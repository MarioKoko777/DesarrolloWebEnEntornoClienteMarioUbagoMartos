function generarMatricula() {
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let parteLetras = "";
    let parteNumeros = "";
    // Generar 3 letras aleatorias
    for (let i = 0; i < 3; i++) {
        const indice = Math.floor(Math.random() * letras.length);
        parteLetras += letras[indice];
    }
    // Generar 4 números aleatorios
    for (let i = 0; i < 4; i++) {
        
    }
    return `${parteLetras}-${parteNumeros}`;
}
// Ejemplo de uso
console.log(generarMatricula());