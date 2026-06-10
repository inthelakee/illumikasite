document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.t-popup').forEach(function (popup) {
    var container = popup.querySelector('.t-popup__container');
    var closeBtn = popup.querySelector('.t-popup__close');
    if (container && closeBtn) {
      container.insertBefore(closeBtn, container.firstChild);
    }
  });
});