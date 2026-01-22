// Conjunto de caracteres que se usarán en la contraseña
const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
// Longitud de la contraseña
const longitud = 8;
let contraseña = "";
// Generar contraseña
for (let i = 0; i < longitud; i++) {
  const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
  contraseña += caracteres[indiceAleatorio];
}
console.log("Contraseña generada:", contraseña);