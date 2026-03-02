$(function () {
  $('.content').hide();
  $('.toggle').on('click', function () {
    const content = $(this).siblings('.content');
    content.slideToggle(200);
    $(this).text(content.is(':visible') ? 'Ocultar' : 'Leer más');
  });
  $('#expand-all').on('click', function () {
    $('.content').slideDown(200);
    $('.toggle').text('Ocultar');
  });
  $('#collapse-all').on('click', function () {
    $('.content').slideUp(200);
    $('.toggle').text('Leer más');
  });
});
