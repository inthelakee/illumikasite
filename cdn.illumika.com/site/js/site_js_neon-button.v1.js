    (function () {
  const CONTAINER_SELECTOR = [
    '.uc-rightpic',
    '.uc-rightpic2',
    '.uc-leftpic',
    '.uc-leftpic2',
    '.uc-maindesk',
    '.uc-mainmob',
    '.uc-quiz',
    '.uc-social',
    '.uc-infoblock',
    '.uc-subscription'
  ].join(', ');

  const BUTTON_SELECTOR = [
    '.t-btnflex.t-btnflex_type_button',
    '.t-btnflex.t-btnflex_type_button2',
    '.t-submit.t-btnflex.t-btnflex_type_submit.t-btnflex_sm',
    '.t-submit.t-btnflex.t-btnflex_type_submit.t-btnflex_md.t-quiz__btn_submit'
  ].join(', ');

  let time = 0;
  let rafId = null;
  let isRunning = false;
  let lastFrame = 0;

  function isMobile() {
    return window.innerWidth < 1200;
  }

  function getFPS() {
    return isMobile() ? 10 : 18;
  }

  function getTargetButtons() {
    const containers = document.querySelectorAll(CONTAINER_SELECTOR);
    const buttons = [];

    containers.forEach(function (container) {
      const found = container.querySelectorAll(BUTTON_SELECTOR);
      found.forEach(function (btn) {
        buttons.push(btn);
      });
    });

    return buttons;
  }

  function renderFrame() {
    const mobile = isMobile();

    time += mobile ? 0.025 : 0.035;

    const angleV = time * (mobile ? 1.6 : 2.1);
    const angleB = -time * (mobile ? 2.1 : 2.9) + 5.8;
    const angleY = time * (mobile ? 1.9 : 2.3) + 2.1;

    const rV = mobile ? 2 : 3;
    const rB = mobile ? 4 : 7;
    const rY = mobile ? 5 : 8;

    const xV = Math.cos(angleV) * rV;
    const yV = Math.sin(angleV) * rV;

    const xB = Math.cos(angleB) * rB;
    const yB = 0;

    const xY = 0;
    const yY = Math.sin(angleY) * rY;

    const blurV = mobile ? 10 + Math.sin(time * 0.7) * 1 : 14 + Math.sin(time * 0.8) * 1.5;
    const blurB = mobile ? 12 + Math.sin(time * 0.6) * 1.2 : 18 + Math.sin(time * 0.7) * 2;
    const blurY = mobile ? 12 + Math.sin(time * 0.5) * 1 : 18 + Math.sin(time * 0.6) * 1.5;

    const alphaV = mobile ? 0.14 + Math.sin(time * 0.7) * 0.02 : 0.22 + Math.sin(time * 0.9) * 0.03;
    const alphaB = mobile ? 0.20 + Math.sin(time * 0.6) * 0.03 : 0.34 + Math.sin(time * 0.7) * 0.04;
    const alphaY = mobile ? 0.18 + Math.sin(time * 0.5) * 0.03 : 0.30 + Math.sin(time * 0.6) * 0.04;

    const violet = `${xV}px ${yV}px ${blurV}px rgba(255, 0, 179, ${alphaV})`;
    const blue   = `${xB}px ${yB}px ${blurB}px rgba(80, 150, 255, ${alphaB})`;
    const yellow = `${xY}px ${yY}px ${blurY}px rgba(255, 220, 60, ${alphaY})`;

    const buttons = getTargetButtons();
    if (!buttons.length) return;

    buttons.forEach(function (btn) {
      btn.style.setProperty('box-shadow', `${violet}, ${blue}, ${yellow}`, 'important');
      btn.style.setProperty('background-color', '#050505', 'important');
      btn.style.setProperty('border-color', 'transparent', 'important');
      btn.style.setProperty('color', '#FFFFFF', 'important');
    });
  }

  function loop(timestamp) {
    if (!isRunning) return;

    const frameTime = 1000 / getFPS();

    if (!lastFrame || timestamp - lastFrame >= frameTime) {
      renderFrame();
      lastFrame = timestamp;
    }

    rafId = requestAnimationFrame(loop);
  }

  function startAnimation() {
    if (isRunning) return;
    if (document.hidden) return;
    if (!getTargetButtons().length) return;

    isRunning = true;
    lastFrame = 0;
    rafId = requestAnimationFrame(loop);
  }

  function stopAnimation() {
    isRunning = false;
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  function initNeonButtons() {
    startAnimation();
  }

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      stopAnimation();
    } else {
      startAnimation();
    }
  });

  window.addEventListener('resize', function () {
    stopAnimation();
    startAnimation();
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(initNeonButtons, 300);
    });
  } else {
    setTimeout(initNeonButtons, 300);
  }
})();

    document.addEventListener('DOMContentLoaded', function () {
  document
    .querySelectorAll('.t-btn.t-btnflex.t-btnflex_type_button, .t-btn.t-btnflex.t-btnflex_type_button2')
    .forEach(function (btn) {
      btn.style.animation = 'spaGlow 3s ease-in-out infinite';
    });
});