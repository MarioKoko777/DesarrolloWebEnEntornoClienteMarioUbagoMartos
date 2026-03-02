$(function () {
  $('#menu li').each(function () {
    const blind = $(this).find('.blind');
    blind.css({ height: 0 });
  });
  $('#menu li').on('mouseenter', function () {
    $(this).find('.blind').stop(true, true).animate({ height: $(this).outerHeight() }, 150);
  }).on('mouseleave', function () {
    $(this).find('.blind').stop(true, true).animate({ height: 0 }, 150);
  });
});
