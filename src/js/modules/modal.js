const openDialogs = new Set();
const lastFocus = new WeakMap();

function getFocusable(dialog) {
  return [
    ...dialog.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ].filter((element) => element.getClientRects().length > 0);
}

export function openDialog(dialog, trigger = document.activeElement, options = {}) {
  if (!dialog || dialog.open) return;

  lastFocus.set(dialog, trigger instanceof HTMLElement ? trigger : null);
  document.documentElement.classList.add('has-modal');
  openDialogs.add(dialog);

  if (typeof dialog.showModal === 'function') {
    dialog.showModal();
  } else {
    dialog.setAttribute('open', '');
  }

  window.requestAnimationFrame(() => {
    const target =
      options.initialFocus ??
      dialog.querySelector('[data-autofocus]') ??
      getFocusable(dialog)[0] ??
      dialog;
    target?.focus({ preventScroll: true });
  });
}

function restoreState(dialog) {
  openDialogs.delete(dialog);
  if (openDialogs.size === 0) {
    document.documentElement.classList.remove('has-modal');
  }

  const trigger = lastFocus.get(dialog);
  if (trigger?.isConnected) {
    window.requestAnimationFrame(() => trigger.focus({ preventScroll: true }));
  }
}

export function closeDialog(dialog) {
  if (!dialog) return;

  if (typeof dialog.close === 'function' && dialog.open) {
    dialog.close();
  } else {
    dialog.removeAttribute('open');
    restoreState(dialog);
  }
}

/**
 * Prepara un <dialog> nativo: cierre por fondo, Escape (nativo), trampa de
 * foco de respaldo y restauración del foco al elemento de origen.
 */
export function setupDialog(dialog, { onClose } = {}) {
  if (!dialog) return;

  if (!dialog.hasAttribute('tabindex')) dialog.setAttribute('tabindex', '-1');

  dialog.addEventListener('close', () => {
    restoreState(dialog);
    onClose?.();
  });

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeDialog(dialog);
  });

  dialog.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;

    const focusable = getFocusable(dialog);
    if (!focusable.length) {
      event.preventDefault();
      dialog.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}
