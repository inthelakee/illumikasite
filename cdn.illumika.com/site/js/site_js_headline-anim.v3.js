function initHeadlineAnimations() {
  if (!window.IntersectionObserver) return;

  const titleSelectors = [
    '.t-title',
    '.t-title_lg',
    '.t-title_xs',
    '.t-section__title',
    '.js-anim-title'
  ];

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');

          setTimeout(function () {
            entry.target.classList.add('anim-done');
          }, 1000);
        }
      });
    },
    { threshold: 0.15 }
  );

  function observeAllTitles() {
    const found = [];

    titleSelectors.forEach(function (sel) {
      const els = document.querySelectorAll(sel);
      for (let i = 0; i < els.length; i++) {
        found.push(els[i]);
      }
    });

    found.forEach(function (el) {
      observer.observe(el);
    });
  }

  observeAllTitles();
  setTimeout(observeAllTitles, 2000);
  setTimeout(observeAllTitles, 5000);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function () {
    setTimeout(initHeadlineAnimations, 300);
  });
} else {
  setTimeout(initHeadlineAnimations, 300);
}
