$(function () {
  $('#aplicar').on('click', function () {
    const filas = $('#tabla tr');
    filas.css('background', '');
    filas.filter(':lt(2)').css('background', 'red');
    filas.filter(':gt(2)').css('background', 'blue');
  });
});
