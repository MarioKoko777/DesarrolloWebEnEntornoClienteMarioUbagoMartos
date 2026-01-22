function cuentaRegresivaAñoNuevo() {
  const ahora = new Date();
  const proximoAño = new Date(ahora.getFullYear() + 1, 0, 1); // 1 de enero del próximo año
  const diferencia = proximoAño - ahora; // diferencia en milisegundos
  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
  console.log(`Faltan ${dias} días, ${horas} horas, ${minutos} minutos y ${segundos} segundos para Año Nuevo.`);
}
// Llamar a la función
cuentaRegresivaAñoNuevo();