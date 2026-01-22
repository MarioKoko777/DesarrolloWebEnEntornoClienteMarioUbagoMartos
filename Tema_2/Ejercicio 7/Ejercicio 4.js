function validarContrasena(password) {
  let errores = [];
  if (password.length < 8) {
    errores.push("Debe tener al menos 8 caracteres");
  }
  if (!/[A-Z]/.test(password)) {
    errores.push("Debe contener al menos una letra mayúscula");
  }
  if (!/[0-9]/.test(password)) {
    errores.push("Debe contener al menos un número");
  }
  if (!/[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\;/]/.test(password)) {
    errores.push("Debe contener al menos un símbolo especial");
  }
  if (errores.length === 0) {
    return "Contraseña válida";
  } else {
    return "Contraseña inválida:\n- " + errores.join("\n- ");
  }
}
// Ejemplos de uso
console.log(validarContrasena("Hola123"));
console.log(validarContrasena("Hola123!"));
console.log(validarContrasena("Password1!"));