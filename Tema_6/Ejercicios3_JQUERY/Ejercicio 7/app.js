$(function () {
  const b = $('#box');
  $('#animar').on('click', function () {
    b.clearQueue().stop(true, false);
    b.animate({ left: 200 }, 400)
     .animate({ top: 100 }, 400)
     .animate({ width: 120, height: 120 }, 400)
     .animate({ opacity: 0.3 }, 400)
     .animate({ left: 0, top: 0, width: 80, height: 80, opacity: 1 }, 400);
  });
  $('#limpiar').on('click', function () {
    b.clearQueue().stop(true, false);
  });
});
