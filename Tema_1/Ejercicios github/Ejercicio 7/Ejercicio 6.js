let positivos = 0;
let negativos = 0;
for (let i = 0; i < 5; i++) {
    let num = Number(prompt(`Ingrese el número ${i + 1}`));
    
    if (num > 0) {
        positivos++; // Incrementa el contador de positivos
    } else if (num < 0) {
        negativos++; // Incrementa el contador de negativos
    }
    // Los ceros no se cuentan como positivos ni negativos
}
console.log(`Números positivos: ${positivos}`);
console.log(`Números negativos: ${negativos}`);