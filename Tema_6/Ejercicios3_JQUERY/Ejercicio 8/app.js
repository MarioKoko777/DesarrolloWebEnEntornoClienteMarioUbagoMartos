$(function () {
  $('.sq').hide();
  $('#iniciar').on('click', function () {
    $('#sq1').fadeIn('slow')
      .queue(function (next) { $('#sq2').fadeIn('fast'); next(); })
      .queue(function (next) { $('#sq3').fadeIn(800); next(); })
      .queue(function (next) { $('#sq4').fadeIn(2000); next(); })
      .queue(function (next) { $('#sq5').fadeIn(4000); next(); });
  });
});
