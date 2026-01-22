let N = Number(prompt("Ingrese un número"));
for (let i = 1; i <= N; i++) {
    if (i % 2 === 0) { // Si el número es divisible entre 2, es par
        console.log(i);
    }
}