document.addEventListener('DOMContentLoaded', function () {
  document
    .querySelectorAll('.t-btn.t-btnflex.t-btnflex_type_button, .t-btn.t-btnflex.t-btnflex_type_button2')
    .forEach(function (btn) {
      btn.style.animation = 'spaGlow 3s ease-in-out infinite';
    });
});
