$(function () {
  $('#marcar').on('click', function () {
    $('p').each(function () {
      const txt = $(this).text().toLowerCase();
      $(this).css('background', txt.includes('eu') ? 'red' : '');
    });
  });
});
