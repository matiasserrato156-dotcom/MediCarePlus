import { CONFIG } from '../config.js';
import { closeDialog, openDialog, setupDialog } from './modal.js';

const SLIDE_DURATION = 5200;

export function initIntro() {
  const dialog = document.querySelector('[data-intro]');
  if (!dialog) return;

  const slides = [...dialog.querySelectorAll('[data-intro-slide]')];
  const dots = [...dialog.querySelectorAll('[data-intro-dot]')];
  const progress = dialog.querySelector('[data-intro-progress]');
  const enterButton = dialog.querySelector('[data-intro-enter]');
  const skipButton = dialog.querySelector('[data-intro-skip]');
  const pauseButton = dialog.querySelector('[data-intro-pause]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let index = 0;
  let timer = null;
  let paused = false;

  if (reduceMotion) {
    if (pauseButton) pauseButton.hidden = true;
    if (progress) progress.hidden = true;
  }

  function markSeen() {
    try {
      window.sessionStorage.setItem(CONFIG.introKey, '1');
    } catch {
      /* sessionStorage puede estar bloqueado; no es crítico. */
    }
  }

  function showSlide(nextIndex) {
    if (!slides.length) return;
    index = (nextIndex + slides.length) % slides.length;

    slides.forEach((slide, position) => {
      const active = position === index;
      slide.hidden = !active;
      slide.classList.toggle('is-active', active);
    });

    dots.forEach((dot, position) => {
      const active = position === index;
      dot.setAttribute('aria-current', active ? 'true' : 'false');
      dot.classList.toggle('is-active', active);
    });

    if (progress && !reduceMotion) {
      progress.style.animation = 'none';
      void progress.offsetWidth;
      progress.style.animation = paused
        ? 'none'
        : `intro-progress ${SLIDE_DURATION}ms linear forwards`;
    }
  }

  function stopAutoplay() {
    if (timer) window.clearInterval(timer);
    timer = null;
    if (progress) progress.style.animationPlayState = 'paused';
  }

  function startAutoplay() {
    if (reduceMotion || paused) return;
    stopAutoplay();
    if (progress) progress.style.animationPlayState = 'running';
    timer = window.setInterval(() => showSlide(index + 1), SLIDE_DURATION);
  }

  function setPaused(nextPaused) {
    paused = nextPaused;
    pauseButton?.setAttribute('aria-pressed', String(paused));
    pauseButton?.setAttribute(
      'aria-label',
      paused ? 'Reanudar presentación automática' : 'Pausar presentación automática',
    );
    const icon = pauseButton?.querySelector('span');
    if (icon) icon.textContent = paused ? '▶' : '❚❚';
    if (paused) stopAutoplay();
    else startAutoplay();
  }

  function closeIntro() {
    markSeen();
    stopAutoplay();
    closeDialog(dialog);
  }

  setupDialog(dialog, {
    onClose: () => {
      markSeen();
      stopAutoplay();
    },
  });

  enterButton?.addEventListener('click', closeIntro);
  skipButton?.addEventListener('click', closeIntro);

  pauseButton?.addEventListener('click', () => setPaused(!paused));

  dots.forEach((dot, position) => {
    dot.addEventListener('click', () => {
      showSlide(position);
      if (!paused) startAutoplay();
    });
  });

  dialog.addEventListener('mouseenter', stopAutoplay);
  dialog.addEventListener('mouseleave', () => {
    if (!paused) startAutoplay();
  });

  document.querySelectorAll('[data-replay-intro]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      try {
        window.sessionStorage.removeItem(CONFIG.introKey);
      } catch {
        /* Sin sessionStorage, la intro se muestra igualmente. */
      }
      setPaused(false);
      showSlide(0);
      openDialog(dialog, button, { initialFocus: enterButton });
      startAutoplay();
    });
  });

  let seen = false;
  try {
    seen = window.sessionStorage.getItem(CONFIG.introKey) === '1';
  } catch {
    seen = false;
  }

  showSlide(0);

  if (!seen) {
    openDialog(dialog, document.body, { initialFocus: enterButton });
    startAutoplay();
  }
}
