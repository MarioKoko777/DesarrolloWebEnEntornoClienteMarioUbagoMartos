$(function () {
  $('#marcar').on('click', function () {
    $('#tabla td').each(function () {
      const txt = $(this).text().trim();
      $(this).css('background', txt.length === 0 ? 'yellow' : '');
    });
  });
});
