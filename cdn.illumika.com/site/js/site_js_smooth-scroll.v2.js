document.addEventListener('DOMContentLoaded', function () {
  if (window.innerWidth < 1200) return;

  let currentScroll = window.pageYOffset;
  let targetScroll = currentScroll;
  let isAnimating = false;
  let anchorLock = false;
  let isProgrammaticScroll = false;

  const speed = 0.5;   // было 0.35
  const smooth = 0.12; // было 0.08

  function syncToRealScroll() {
    currentScroll = window.pageYOffset;
    targetScroll = window.pageYOffset;
  }

  function animateScroll() {
    isAnimating = true;
    currentScroll += (targetScroll - currentScroll) * smooth;

    if (Math.abs(targetScroll - currentScroll) < 0.5) {
      currentScroll = targetScroll;
      isAnimating = false;
    }

    isProgrammaticScroll = true;
    window.scrollTo(0, currentScroll);
    requestAnimationFrame(() => {
      isProgrammaticScroll = false;
    });

    if (isAnimating) {
      requestAnimationFrame(animateScroll);
    }
  }

  function lockAfterAnchor() {
    anchorLock = true;
    syncToRealScroll();

    setTimeout(syncToRealScroll, 50);
    setTimeout(syncToRealScroll, 200);
    setTimeout(syncToRealScroll, 600);
    setTimeout(function () {
      syncToRealScroll();
      anchorLock = false;
    }, 1200);
  }

  document.addEventListener('click', function (e) {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const hash = link.getAttribute('href');
    if (!hash || hash === '#') return;

    setTimeout(lockAfterAnchor, 50);
  });

  window.addEventListener('hashchange', function () {
    lockAfterAnchor();
  });

  window.addEventListener('wheel', function (e) {
    if (anchorLock) {
      syncToRealScroll();
    }

    e.preventDefault();

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    targetScroll += e.deltaY * speed;
    targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

    if (!isAnimating) {
      requestAnimationFrame(animateScroll);
    }
  }, { passive: false });

  window.addEventListener('scroll', function () {
    if (!isProgrammaticScroll) {
      syncToRealScroll();
    }
  }, { passive: true });

  window.addEventListener('resize', syncToRealScroll);
  window.addEventListener('load', syncToRealScroll);
});
