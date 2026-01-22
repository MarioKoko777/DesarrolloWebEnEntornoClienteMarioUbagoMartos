let a = Number(prompt("Número 1"));
let b = Number(prompt("Número 2"));
let c = Number(prompt("Número 3"));
if (a >= b && a >= c) {
    console.log(`El número mayor es: ${a}`);
} else if (b >= a && b >= c) {
    console.log(`El número mayor es: ${b}`);
} else {
    console.log(`El número mayor es: ${c}`);
}