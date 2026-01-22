function actualizarReloj() {
  const ahora = new Date();
  // Hora
  let horas = ahora.getHours();
  let minutos = ahora.getMinutes();
  let segundos = ahora.getSeconds();
  // Añadir cero delante si es menor que 10
  horas = horas < 10 ? '0' + horas : horas;
  minutos = minutos < 10 ? '0' + minutos : minutos;
  segundos = segundos < 10 ? '0' + segundos : segundos;
  const horaActual = `${horas}:${minutos}:${segundos}`;
  document.getElementById('reloj').textContent = horaActual;
  // Fecha
  const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const fechaActual = ahora.toLocaleDateString('es-ES', opciones);
  document.getElementById('fecha').textContent = fechaActual;
}
// Actualizar cada segundo
setInterval(actualizarReloj, 1000);
// Inicializar al cargar
actualizarReloj();