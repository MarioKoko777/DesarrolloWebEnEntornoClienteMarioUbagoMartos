$(function () {
  let clicks = 0;
  $('#aumentar').on('click', function () {
    if (clicks < 2) {
      clicks++;
      const p = $('#texto');
      const size = parseFloat(p.css('font-size')) || 16;
      p.css('font-size', size + 2);
      if (clicks === 2) { $(this).prop('disabled', true); }
    }
  });
});
