$(function () {
  const slider = $('#slider');
  const slides = slider.find('.slide');
  let i = 0;
  slides.hide().first().show();
  $('#next').on('click', function () {
    i = (i + 1) % slides.length;
    slides.stop(true, true).fadeOut(200).eq(i).fadeIn(200);
  });
  $('#prev').on('click', function () {
    i = (i - 1 + slides.length) % slides.length;
    slides.stop(true, true).fadeOut(200).eq(i).fadeIn(200);
  });
  if ($.fn.slidesjs) {
    slider.slidesjs({ width: 800, height: 400, play: { active: true, auto: true, interval: 3000 } });
    $('.acciones').hide();
  }
});
