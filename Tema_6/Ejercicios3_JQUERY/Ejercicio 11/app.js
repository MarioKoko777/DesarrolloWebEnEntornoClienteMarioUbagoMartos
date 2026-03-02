$(function () {
  const tt = $('#tooltip');
  $('.tip').on('mouseenter', function (e) {
    tt.text($(this).data('tip'));
    tt.css({ display: 'block', left: e.pageX + 12, top: e.pageY + 12 });
  }).on('mousemove', function (e) {
    tt.css({ left: e.pageX + 12, top: e.pageY + 12 });
  }).on('mouseleave', function () {
    tt.hide();
  });
});
