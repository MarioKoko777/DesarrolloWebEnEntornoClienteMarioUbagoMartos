$(function () {
  const cube = $('#cube');
  function seq() {
    cube.show().css({ left: 0, top: 0, background: '#ef4444' })
      .animate({ left: 200 }, 600)
      .queue(function (next) { cube.css('background', '#2563eb'); next(); })
      .animate({ top: -80, opacity: 0 }, 600, function () { cube.hide().css({ opacity: 1, top: 0 }); });
  }
  $('#start').on('click', function () { cube.clearQueue().stop(true, false); seq(); });
  $('#stop').on('click', function () { cube.clearQueue().stop(true, false); });
});
