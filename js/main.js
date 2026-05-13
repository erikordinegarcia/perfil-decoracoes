(function () {
  // Year in footer
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile menu toggle
  const menuBtn = document.querySelector('[data-menu-btn]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');

  if (menuBtn && mobileMenu) {
    const setOpen = (open) => {
      mobileMenu.classList.toggle('is-open', open);
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    };

    menuBtn.addEventListener('click', () => {
      setOpen(!mobileMenu.classList.contains('is-open'));
    });

    // close on link click
    mobileMenu.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (a) setOpen(false);
    });

    // close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  // Reveal on scroll (IntersectionObserver)
  const reveals = Array.from(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  // Metrics count-up (executa uma vez)
  const counters = Array.from(document.querySelectorAll('[data-count]'));
  const formatCount = (value) => value.toLocaleString('pt-BR');
  const animateCounter = (el) => {
    if (el.dataset.counted === 'true') return;
    el.dataset.counted = 'true';

    const target = Number(el.getAttribute('data-count') || 0);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1300;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min(1, (now - startTime) / duration);
      const current = Math.round(target * (1 - Math.pow(1 - progress, 3)));
      el.textContent = `+${formatCount(current)}${suffix}`;

      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  if ('IntersectionObserver' in window && counters.length) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.35 }
    );

    counters.forEach((counter) => counterObserver.observe(counter));
  } else {
    counters.forEach((counter) => animateCounter(counter));
  }

  // Lightbox
  const lbRoot = document.querySelector('[data-lightbox-root]');
  const lbImg = document.querySelector('[data-lightbox-img]');
  const lbCaption = document.querySelector('[data-lightbox-caption]');
  const lbClose = document.querySelector('[data-lightbox-close]');

  const openLightbox = ({ src, alt }) => {
    if (!lbRoot || !lbImg) return;
    lbImg.src = src;
    lbImg.alt = alt || '';
    if (lbCaption) lbCaption.textContent = alt || '';
    lbRoot.classList.add('is-open');
    lbRoot.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    if (!lbRoot) return;
    lbRoot.classList.remove('is-open');
    lbRoot.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lbImg) lbImg.src = '';
  };

  document.querySelectorAll('[data-lightbox]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-src');
      const alt = btn.getAttribute('data-alt') || 'Imagem ampliada';
      if (src) openLightbox({ src, alt });
    });
  });

  if (lbRoot) {
    lbRoot.addEventListener('click', (e) => {
      const clickedImg = e.target.closest('[data-lightbox-img]');
      const clickedClose = e.target.closest('[data-lightbox-close]');
      if (clickedClose) return closeLightbox();
      // clicar fora da imagem fecha
      if (!clickedImg) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  // Header shadow on scroll
  const header = document.querySelector('[data-header]');
  if (header) {
    const onScroll = () => {
      const scrolled = window.scrollY > 6;
      header.style.boxShadow = scrolled ? '0 18px 40px rgba(0,0,0,.22)' : 'none';
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Service card image switch
  document.querySelectorAll('[data-service-media]').forEach((media) => {
    const images = Array.from(media.querySelectorAll('.serviceCard__img'));
    if (images.length < 2) return;

    let current = images.findIndex((img) => img.classList.contains('is-active'));
    if (current < 0) current = 0;

    const show = (nextIndex) => {
      images[current].classList.remove('is-active');
      current = (nextIndex + images.length) % images.length;
      images[current].classList.add('is-active');
    };

    const prev = media.querySelector('[data-service-prev]');
    const next = media.querySelector('[data-service-next]');

    const bindArrow = (el, direction) => {
      if (!el) return;
      const go = (event) => {
        event.preventDefault();
        event.stopPropagation();
        show(current + direction);
      };

      el.addEventListener('click', go);
      el.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') go(event);
      });
    };

    bindArrow(prev, -1);
    bindArrow(next, 1);
  });

  // Service carousels (serviços)
  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const track = carousel.querySelector('[data-carousel-track]');
    const prevBtn = carousel.querySelector('[data-carousel-prev]');
    const nextBtn = carousel.querySelector('[data-carousel-next]');
    if (!track || !prevBtn || !nextBtn) return;

    const slides = Array.from(track.children);
    if (!slides.length) return;

    let index = 0;
    const isMobileSwipe = () => window.matchMedia('(max-width: 720px)').matches;

    const getItemsPerView = () => {
      const styles = window.getComputedStyle(track);
      const raw = parseInt(styles.getPropertyValue('--items-per-view'), 10);
      return Number.isFinite(raw) && raw > 0 ? raw : 1;
    };

    const maxIndex = () => Math.max(0, slides.length - getItemsPerView());

    const update = () => {
      if (isMobileSwipe()) {
        track.style.transform = '';
        prevBtn.disabled = true;
        nextBtn.disabled = true;
        return;
      }

      const target = slides[index];
      if (target) {
        track.style.transform = `translateX(-${target.offsetLeft}px)`;
      }

      prevBtn.disabled = index <= 0;
      nextBtn.disabled = index >= maxIndex();
    };

    const move = (delta) => {
      index = Math.max(0, Math.min(maxIndex(), index + delta));
      update();
    };

    prevBtn.addEventListener('click', () => move(-1));
    nextBtn.addEventListener('click', () => move(1));

    window.addEventListener('resize', () => {
      index = Math.min(index, maxIndex());
      update();
    });

    update();
  });
})();
