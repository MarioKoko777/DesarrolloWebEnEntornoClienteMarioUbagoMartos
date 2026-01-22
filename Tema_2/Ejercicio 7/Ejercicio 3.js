function generarID() {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < 16; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    id += caracteres.charAt(indice);
  }
  return id;
}
// Ejemplo de uso
console.log(generarID());