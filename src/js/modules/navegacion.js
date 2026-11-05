const desktopViewport = window.matchMedia('(min-width: 768px)');

export function initNavegacion() {
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-toggle]');
  const navigation = document.querySelector('[data-navigation]');
  const openIcon = document.querySelector('[data-menu-open-icon]');
  const closeIcon = document.querySelector('[data-menu-close-icon]');
  const progress = document.querySelector('[data-scroll-progress]');

  function setMenuOpen(isOpen) {
    if (!menuButton || !navigation) return;

    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute(
      'aria-label',
      isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación',
    );
    navigation.classList.toggle('is-open', isOpen);
    openIcon?.classList.toggle('hidden', isOpen);
    closeIcon?.classList.toggle('hidden', !isOpen);
  }

  if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      setMenuOpen(!isOpen);
    });

    navigation.addEventListener('click', (event) => {
      if (event.target.closest('a, button')) setMenuOpen(false);
    });

    document.addEventListener('keydown', (event) => {
      if (
        event.key === 'Escape' &&
        menuButton.getAttribute('aria-expanded') === 'true'
      ) {
        setMenuOpen(false);
        menuButton.focus();
      }
    });

    document.addEventListener('click', (event) => {
      if (
        menuButton.getAttribute('aria-expanded') !== 'true' ||
        event.target.closest('[data-navigation], [data-menu-toggle]')
      ) {
        return;
      }
      setMenuOpen(false);
    });

    desktopViewport.addEventListener('change', (event) => {
      if (event.matches) setMenuOpen(false);
    });
  }

  const navLinks = [...document.querySelectorAll('[data-navigation] a[href^="#"]')];

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.forEach((item) => item.removeAttribute('aria-current'));
      link.setAttribute('aria-current', 'true');
    });
  });

  if ('IntersectionObserver' in window) {
    const sections = navLinks
      .map((link) => document.querySelector(link.getAttribute('href')))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          navLinks.forEach((link) => {
            const isCurrent = link.getAttribute('href') === `#${entry.target.id}`;
            if (isCurrent) link.setAttribute('aria-current', 'true');
            else link.removeAttribute('aria-current');
          });
        }
      },
      { rootMargin: '-42% 0px -52% 0px', threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
  }

  let ticking = false;

  function updateOnScroll() {
    const scrollY = window.scrollY;
    header?.classList.toggle('is-scrolled', scrollY > 10);

    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(scrollY / max, 1) : 0;
      progress.style.transform = `scaleX(${ratio})`;
    }

    ticking = false;
  }

  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateOnScroll);
    },
    { passive: true },
  );

  updateOnScroll();
}
