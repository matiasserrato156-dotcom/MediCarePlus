import { closeDialog, openDialog, setupDialog } from './modal.js';

export function initPolitica() {
  const dialog = document.querySelector('[data-policy-dialog]');
  if (!dialog) return;

  setupDialog(dialog);

  document.addEventListener('click', (event) => {
    const opener = event.target.closest('[data-open-policy]');
    if (opener) {
      event.preventDefault();
      openDialog(dialog, opener);
      return;
    }

    const closer = event.target.closest('[data-close-policy]');
    if (closer) {
      event.preventDefault();
      closeDialog(dialog);
    }
  });
}
