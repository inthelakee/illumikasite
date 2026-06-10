(function () {
  let vantaInstance = null;
  let preloaderHidden = false;

  function initVanta() {
    if (!window.VANTA || !window.THREE || vantaInstance) return;

    vantaInstance = VANTA.FOG({
      el: "#vanta-bg",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 350.00,
      minWidth: 350.00,
      highlightColor: 0x0096ff,
      midtoneColor: 0xff0000,
      lowlightColor: 0xfff000,
      baseColor: 0x000000,
      blurFactor: 0.90,
      speed: 2.70,
      zoom: 0.25
    });

    const bg = document.getElementById("vanta-bg");
    if (bg) {
      requestAnimationFrame(function () {
        bg.classList.add("vanta-ready");
      });
    }
  }

  function hidePreloader() {
    if (preloaderHidden) return;
    preloaderHidden = true;

    const preloader = document.getElementById("page-preloader");
    if (!preloader) return;

    preloader.classList.add("is-hidden");

    setTimeout(function () {
      preloader.style.display = "none";
    }, 400);
  }

  document.addEventListener("DOMContentLoaded", function () {
    hidePreloader();
    setTimeout(initVanta, 0);
  });

  window.addEventListener("load", function () {
    initVanta();
  });

  setTimeout(function () {
    hidePreloader();
  }, 1500);
})();
