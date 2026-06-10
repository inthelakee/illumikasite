document.addEventListener('DOMContentLoaded', function () {
  const config = [
    {
      container: '.uc-rightpic, .uc-rightpic2, .uc-leftpic, .uc-leftpic2',
      selectors: ['.t-descr', '.t-descr_md']
    },
    {
      container: '.uc-keys',
      selectors: ['.t-card__descr.t-text.t-text_xs']
    },
    {
      container: '.uc-mainmob, .uc-maindesk',
      selectors: ['.t-descr', '.t-descr_md', '.t995__descr.t-descr.t-descr_lg']
    },
    {
      container: '.uc-block',
      selectors: ['.t-text', '.t-text_md']
    }
  ];

  function splitNodeToWords(node) {
    if (!node || node.dataset.splitInit === 'done') return;
    node.dataset.splitInit = 'done';

    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null);
    const textNodes = [];

    while (walker.nextNode()) {
      const current = walker.currentNode;
      if (current.nodeType === Node.TEXT_NODE && current.nodeValue.trim().length > 0) {
        textNodes.push(current);
      }
    }

    let globalWordIndex = 0;

    textNodes.forEach(function (textNode) {
      const parent = textNode.parentNode;
      const text = textNode.nodeValue;
      const parts = text.split(/(\s+)/);
      const frag = document.createDocumentFragment();

      parts.forEach(function (part) {
        if (/^\s+$/.test(part)) {
          frag.appendChild(document.createTextNode(part));
        } else if (part.length > 0) {
          const span = document.createElement('span');
          span.className = 'word';
          span.style.setProperty('--index', ++globalWordIndex);
          span.textContent = part.trim();
          frag.appendChild(span);
        }
      });

      parent.replaceChild(frag, textNode);
    });

    node.dataset.splitType = 'words';
  }

  function initConfiguredBlocks() {
    config.forEach(function (item) {
      const containers = document.querySelectorAll(item.container);
      if (!containers.length) return;

      containers.forEach(function (container) {
        const nodes = container.querySelectorAll(item.selectors.join(','));
        nodes.forEach(function (node) {
          splitNodeToWords(node);
        });
      });
    });
  }

  function observeWordAnimations() {
    const allTargets = document.querySelectorAll('[data-split-type="words"]');
    if (!allTargets.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-animated');
          }
        });
      }, { threshold: 0.2 });

      allTargets.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      allTargets.forEach(function (el) {
        el.classList.add('is-animated');
      });
    }
  }

  function observeTitles() {
    const titles = document.querySelectorAll('.js-anim-title');

    if (!titles.length) return;

    if ('IntersectionObserver' in window) {
      const titleObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.2 });

      titles.forEach(function (title) {
        titleObserver.observe(title);
      });
    } else {
      titles.forEach(function (title) {
        title.classList.add('visible');
      });
    }
  }

  initConfiguredBlocks();
  observeWordAnimations();
  observeTitles();
});