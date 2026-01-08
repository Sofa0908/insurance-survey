(() => {
  document.documentElement.classList.remove('no-js');

  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  const header = document.querySelector('.site-header');
  const premium = document.querySelector('.premium');
  const scoreValue = document.querySelector('.score-value');
  const scoreMeter = document.querySelector('.score-meter span');
  const rangeFields = document.querySelectorAll('.inputs input[type="range"]');
  const rangeOutputs = document.querySelectorAll('.range-value');
  const mileageInput = document.querySelector('input[data-range="mileage"]');
  const driverInput = document.querySelector('input[data-range="drivers"]');

  menuToggle?.addEventListener('click', () => {
    nav?.classList.toggle('open');
    header?.classList.toggle('nav-open');
  });

  nav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (header?.classList.contains('nav-open')) {
        header.classList.remove('nav-open');
        nav.classList.remove('open');
      }
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  const quoteForm = document.querySelector('.quote-form');
  const quoteStatus = document.querySelector('.form-status');

  quoteForm?.addEventListener('submit', () => {
    if (quoteStatus) {
      quoteStatus.textContent = '感謝填寫！資料已送出，顧問將在 24 小時內與您聯繫。';
    }
  });

  const formatNumber = (value) => value.toLocaleString('zh-TW');
  const formatCurrency = (value) => `NT$${Math.round(value).toLocaleString('zh-TW')}`;

  const updateOutputs = () => {
    rangeOutputs.forEach((output) => {
      const key = output.dataset.rangeValue;
      const input = document.querySelector(`input[data-range="${key}"]`);

      if (!input) return;

      if (key === 'mileage') {
        output.textContent = `${formatNumber(Number(input.value))} 公里`;
      } else if (key === 'drivers') {
        const count = Number(input.value);
        output.textContent = `${count} 位駕駛`;
      }
    });
  };

  const updateQuote = () => {
    if (!mileageInput || !driverInput || !premium || !scoreValue || !scoreMeter) return;

    const mileage = Number(mileageInput.value);
    const drivers = Number(driverInput.value);

    const scoreSeed = 99 - (mileage - 8000) / 700 - (drivers - 1) * 1.8;
    const score = Math.max(80, Math.min(99, Math.round(scoreSeed)));
    const fill = Math.min(100, Math.max(0, ((score - 60) / 40) * 100));

    const base = 2480;
    const mileageAdj = ((mileage - 12000) / 1000) * 90;
    const driverAdj = (drivers - 1) * 180;
    const behaviorAdj = (90 - score) * 35;
    const quote = Math.max(1580, base + mileageAdj + driverAdj + behaviorAdj);

    scoreValue.textContent = score.toString();
    scoreMeter.style.width = `${fill}%`;
    premium.textContent = formatCurrency(quote);
  };

  rangeFields.forEach((input) => {
    input.addEventListener('input', () => {
      updateOutputs();
      updateQuote();
    });
  });

  updateOutputs();
  updateQuote();

  const loadTargets = document.querySelectorAll('.animate-on-load, .card-fade');
  const scrollTargets = document.querySelectorAll('.reveal-on-scroll');
  const counters = document.querySelectorAll('.counter');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  loadTargets.forEach((el, index) => {
    const delay = index * 0.03;
    el.style.transitionDelay = `${delay}s`;
    if (!el.dataset.delayApplied) {
      el.style.setProperty('--delay', `${delay}s`);
      el.dataset.delayApplied = 'true';
    }
  });

  scrollTargets.forEach((el, index) => {
    const delay = el.dataset.stagger ? Number(el.dataset.stagger) : index * 0.02;
    el.style.transitionDelay = `${delay}s`;
  });

  const formatCounter = (value, el) => {
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    el.textContent = `${prefix}${Math.round(value).toLocaleString('zh-TW')}${suffix}`;
  };

  const animateCounter = (el) => {
    if (el.dataset.animated) return;
    el.dataset.animated = 'true';

    const target = Number(el.dataset.target || 0);
    const duration = 1500;
    let start = null;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
      formatCounter(target * eased, el);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        formatCounter(target, el);
      }
    };

    requestAnimationFrame(step);
  };

  if (!prefersReducedMotion) {
    document.body.classList.add('sequence-loaded');

    requestAnimationFrame(() => {
      loadTargets.forEach((el, index) => {
        setTimeout(() => el.classList.add('is-visible'), index * 35);
      });
    });

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.25 }
      );

      scrollTargets.forEach((el) => observer.observe(el));

      const counterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCounter(entry.target);
              counterObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.6 }
      );

      counters.forEach((el) => counterObserver.observe(el));
    } else {
      scrollTargets.forEach((el) => el.classList.add('is-visible'));
      counters.forEach((el) => animateCounter(el));
    }
  } else {
    loadTargets.forEach((el) => el.classList.add('is-visible'));
    scrollTargets.forEach((el) => el.classList.add('is-visible'));
    counters.forEach((el) => animateCounter(el));
  }

  window.addEventListener(
    'scroll',
    () => {
      const shift = Math.min(80, window.scrollY * 0.3);
      document.documentElement.style.setProperty('--hero-shift', `${shift}px`);
    },
    { passive: true }
  );
})();
