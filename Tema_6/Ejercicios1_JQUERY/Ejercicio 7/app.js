$(function () {
  alert('DOM listo');
  $('#btn-header').on('click', function () {
    alert('Cabecera: ' + $('#cabecera').text().trim());
  });
  $('#btn-body').on('click', function () {
    alert('Body: ' + $('body').text().trim().slice(0, 80) + '...');
  });
  $('#p1, #p2').on('click', function () {
    alert('Has pulsado un párrafo');
  });
  $('#p2').on('click', function () {
    $(this).hide();
  });
  $('#lista li').each(function () {
    $(this).prepend('# ');
  });
  $('#lista li').on('click', function () {
    $(this).hide();
  });
  $('#enlaces a').text('Enlace común');
  $('#t1 tr').on('click', function () {
    $(this).toggleClass('activo');
  });
  $('#t2 tr').on('click', function () {
    $(this).hide();
  });
});
