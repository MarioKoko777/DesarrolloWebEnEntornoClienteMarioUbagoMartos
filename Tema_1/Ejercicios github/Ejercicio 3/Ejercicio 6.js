// Simular la entrada de la contraseña con una variable
let contraseña;
// Usar do-while para repetir hasta que la contraseña sea "1234"
do {
    contraseña = "0000"; // Aquí podrías cambiar el valor para simular intentos
    console.log("Contraseña incorrecta. Intenta de nuevo...");
    // Simulación de un nuevo intento, en la vida real sería un prompt
    contraseña = "1234"; // Finalmente, ponemos la contraseña correcta
} while (contraseña !== "1234");
console.log("Contraseña correcta");