import {
  renderErrorSummary,
  setFieldState,
  validateContact,
} from './validacion.js';

function getFields(root) {
  return {
    nombre: {
      input: root.querySelector('#contacto-nombre'),
      error: root.querySelector('[data-contact-error="nombre"]'),
    },
    correo: {
      input: root.querySelector('#contacto-correo'),
      error: root.querySelector('[data-contact-error="correo"]'),
    },
    mensaje: {
      input: root.querySelector('#contacto-mensaje'),
      error: root.querySelector('[data-contact-error="mensaje"]'),
    },
    politica: {
      input: root.querySelector('#contacto-politica'),
      error: root.querySelector('[data-contact-error="politica"]'),
    },
  };
}

export function initContacto() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const fields = getFields(form);
  const summary = form.querySelector('[data-contact-summary]');
  const success = form.querySelector('[data-contact-success]');
  const counter = form.querySelector('[data-contact-count]');
  const message = form.querySelector('#contacto-mensaje');
  const fieldMap = Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [key, value.input]),
  );

  function getData() {
    return {
      nombre: fields.nombre.input?.value ?? '',
      correo: fields.correo.input?.value ?? '',
      mensaje: fields.mensaje.input?.value ?? '',
      politica: Boolean(fields.politica.input?.checked),
    };
  }

  function updateCounter() {
    if (!counter || !message) return;
    counter.textContent = `${message.value.length}/600`;
  }

  function clearErrors() {
    for (const { input, error } of Object.values(fields)) {
      setFieldState(input, error, '');
    }
    if (summary) summary.hidden = true;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const errors = validateContact(getData());
    if (success) success.hidden = true;

    for (const [key, { input, error }] of Object.entries(fields)) {
      setFieldState(input, error, errors[key] ?? '');
    }

    if (Object.keys(errors).length) {
      const firstInvalid = renderErrorSummary(summary, errors, fieldMap);
      (firstInvalid ?? summary)?.focus();
      return;
    }

    form.reset();
    updateCounter();
    clearErrors();

    if (success) {
      success.hidden = false;
      success.focus({ preventScroll: true });
    }
  });

  form.addEventListener('input', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    if (target === message) updateCounter();

    const entry = Object.entries(fields).find(([, value]) => value.input === target);
    if (!entry) return;
    if (target.getAttribute('aria-invalid') !== 'true') return;

    const [key] = entry;
    const errors = validateContact(getData());
    setFieldState(fields[key].input, fields[key].error, errors[key] ?? '');
  });

  fields.politica.input?.addEventListener('change', () => {
    if (fields.politica.input.getAttribute('aria-invalid') !== 'true') return;
    const errors = validateContact(getData());
    setFieldState(fields.politica.input, fields.politica.error, errors.politica ?? '');
  });

  updateCounter();
}
