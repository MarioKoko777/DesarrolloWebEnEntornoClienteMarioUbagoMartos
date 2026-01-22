let usuario, contraseña;
// Repetir mientras usuario y contraseña sean incorrectos
while (!(usuario === "admin" && contraseña === "1234")) {
    usuario = prompt("Usuario:");
    contraseña = prompt("Contraseña:");
    
    // Mostrar mensaje de error si los datos no son correctos
    if (!(usuario === "admin" && contraseña === "1234")) {
        console.log("Usuario o contraseña incorrectos. Intente nuevamente.");
    }
}
console.log("¡Acceso permitido!");