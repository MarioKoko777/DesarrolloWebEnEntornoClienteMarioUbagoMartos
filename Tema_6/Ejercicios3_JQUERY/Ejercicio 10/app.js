$(function () {
  $.fn.strengthMeter = function (opts) {
    const o = $.extend({ target: null }, opts || {});
    const $t = $(o.target);
    function rate(v) {
      let score = 0;
      if (v.length >= 8) score += 4;
      if (/[A-Z]/.test(v)) score += 2;
      if (/[a-z]/.test(v)) score += 2;
      if (/\d/.test(v)) score += 2;
      if (/[^A-Za-z0-9]/.test(v)) score += 2;
      return score;
    }
    function label(s) {
      if (s < 5) return 'No segura';
      if (s < 8) return 'Medianamente segura';
      return 'Segura';
    }
    return this.each(function () {
      $(this).on('input', function () {
        const v = $(this).val();
        const s = rate(v);
        $t.text(label(s));
        $t.attr('data-score', s);
      });
    });
  };
  $('#pwd').strengthMeter({ target: '#msg' });
});
