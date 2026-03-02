$(function () {
  $('#btn-1').on('click', function () {
    $('#doc1').hide();
  });
  $('#btn-2').on('click', function () {
    $(this).hide();
  });
  $('#btn-3').on('click', function () {
    $('.intro').hide();
  });
  $('#btn-4').on('click', function () {
    $('p.intro').hide();
  });
  $('#btn-5').on('click', function () {
    $('#lista1 li:first').hide();
  });
  $('#btn-6').on('click', function () {
    $('#lista1 li:first, #lista2 li:first').hide();
  });
});
