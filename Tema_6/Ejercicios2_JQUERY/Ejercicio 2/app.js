$(function () {
  const items = $('#menu .items');
  const toggleBtn = $('#toggle-menu');
  toggleBtn.attr('aria-expanded', 'false');
  $('#menu .has-sub > a').attr('aria-expanded', 'false');
  toggleBtn.on('click', function () {
    const isOpen = items.is(':visible');
    items.stop(true, true).slideToggle(150);
    toggleBtn.attr('aria-expanded', String(!isOpen));
  });
  $('#menu .has-sub > a').on('click', function (e) {
    e.preventDefault();
    const sub = $(this).next('.sub');
    $('#menu .sub').not(sub).slideUp(150);
    $('#menu .has-sub > a').not(this).removeClass('open').attr('aria-expanded', 'false');
    const willOpen = !sub.is(':visible');
    sub.stop(true, true).slideToggle(150);
    $(this).toggleClass('open', willOpen).attr('aria-expanded', String(willOpen));
  });
  $('#menu .items > li:not(.has-sub) > a').on('click', function () {
    $('#menu .items a').removeClass('active');
    $(this).addClass('active');
    if (window.innerWidth <= 768) { items.slideUp(150); toggleBtn.attr('aria-expanded', 'false'); }
  });
  $('#menu .sub a').on('click', function () {
    $('#menu .items a').removeClass('active');
    $(this).addClass('active');
    if (window.innerWidth <= 768) { items.slideUp(150); toggleBtn.attr('aria-expanded', 'false'); }
  });
  $(document).on('click', function (e) {
    if ($(e.target).closest('#menu').length === 0) {
      $('#menu .sub').slideUp(150);
      $('#menu .has-sub > a').removeClass('open').attr('aria-expanded', 'false');
    }
  });
  $('#menu .has-sub > a').on('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); $(this).click(); }
    if (e.key === 'Escape') {
      $('#menu .sub').slideUp(150);
      $(this).removeClass('open').attr('aria-expanded', 'false');
    }
  });
  $(window).on('resize', function () {
    if (window.innerWidth > 768) { items.show(); toggleBtn.attr('aria-expanded', 'true'); }
    else { items.hide(); toggleBtn.attr('aria-expanded', 'false'); }
  }).trigger('resize');
});
