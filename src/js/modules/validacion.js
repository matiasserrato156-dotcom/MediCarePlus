import { getEspecialidad } from '../data/especialidades.js';
import {
  isClosedDay,
  isPastDate,
  isValidISODate,
  maxDateISO,
} from '../utils/fechas.js';
import { normalizeWhitespace, onlyDigits } from '../utils/formato.js';

const NAME_PATTERN = /^[\p{L}\p{M}' -]+$/u;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const NAME_PARTICLES = new Set(['de', 'del', 'la', 'las', 'los', 'y']);

function toProperName(value) {
  return value
    .split(' ')
    .map((word, index) => {
      const lower = word.toLowerCase();
      if (index > 0 && NAME_PARTICLES.has(lower)) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(' ');
}

export function normalizePatient(data = {}) {
  return {
    nombreCompleto: toProperName(normalizeWhitespace(data.nombreCompleto)),
    documento: onlyDigits(data.documento),
    telefono: onlyDigits(data.telefono),
    correo: normalizeWhitespace(data.correo).toLowerCase(),
  };
}

export function validateSchedule({ especialidadId, fecha }) {
  const errors = {};

  if (!getEspecialidad(especialidadId)) {
    errors.especialidad = 'Selecciona una especialidad.';
  }

  if (!fecha) {
    errors.fecha = 'Selecciona una fecha para tu cita.';
  } else if (!isValidISODate(fecha)) {
    errors.fecha = 'Selecciona una fecha válida.';
  } else if (isPastDate(fecha)) {
    errors.fecha = 'La fecha no puede ser anterior a hoy.';
  } else if (fecha > maxDateISO()) {
    errors.fecha = 'Puedes agendar hasta 90 días adelante.';
  } else if (isClosedDay(fecha)) {
    errors.fecha = 'Ese día no atendemos. Elige de lunes a sábado.';
  }

  return errors;
}

export function validatePatient(data = {}) {
  const patient = normalizePatient(data);
  const errors = {};

  if (!patient.nombreCompleto) {
    errors.nombre = 'Escribe tu nombre completo.';
  } else if (patient.nombreCompleto.length < 3 || patient.nombreCompleto.length > 80) {
    errors.nombre = 'El nombre debe tener entre 3 y 80 caracteres.';
  } else if (!NAME_PATTERN.test(patient.nombreCompleto)) {
    errors.nombre = 'Usa solo letras, espacios, guiones o apóstrofos.';
  }

  if (!patient.documento) {
    errors.documento = 'Escribe tu número de documento.';
  } else if (!/^\d{6,10}$/.test(patient.documento)) {
    errors.documento = 'El documento debe tener entre 6 y 10 dígitos.';
  }

  if (!patient.telefono) {
    errors.telefono = 'Escribe tu teléfono.';
  } else if (!/^[37]\d{9}$/.test(patient.telefono)) {
    errors.telefono = 'Escribe un teléfono colombiano de 10 dígitos (inicia en 3 o 7).';
  }

  if (!patient.correo) {
    errors.correo = 'Escribe tu correo electrónico.';
  } else if (patient.correo.length > 120 || !EMAIL_PATTERN.test(patient.correo)) {
    errors.correo = 'Escribe un correo válido, por ejemplo nombre@correo.com.';
  }

  if (!data.politica) {
    errors.politica = 'Debes aceptar la política de tratamiento de datos.';
  }

  return errors;
}

export function validateContact(data = {}) {
  const nombre = normalizeWhitespace(data.nombre);
  const correo = normalizeWhitespace(data.correo).toLowerCase();
  const mensaje = normalizeWhitespace(data.mensaje);
  const errors = {};

  if (nombre.length < 3) {
    errors.nombre = 'Escribe tu nombre (mínimo 3 caracteres).';
  } else if (nombre.length > 80) {
    errors.nombre = 'El nombre no puede superar 80 caracteres.';
  }

  if (!correo) {
    errors.correo = 'Escribe tu correo electrónico.';
  } else if (correo.length > 120 || !EMAIL_PATTERN.test(correo)) {
    errors.correo = 'Escribe un correo válido, por ejemplo nombre@correo.com.';
  }

  if (mensaje.length < 10) {
    errors.mensaje = 'Cuéntanos un poco más (mínimo 10 caracteres).';
  } else if (mensaje.length > 600) {
    errors.mensaje = 'El mensaje no puede superar 600 caracteres.';
  }

  if (!data.politica) {
    errors.politica = 'Debes aceptar la política de tratamiento de datos.';
  }

  return errors;
}

function addDescribedBy(input, id) {
  const current = new Set((input.getAttribute('aria-describedby') ?? '').split(' ').filter(Boolean));
  current.add(id);
  input.setAttribute('aria-describedby', [...current].join(' '));
}

function removeDescribedBy(input, id) {
  const current = (input.getAttribute('aria-describedby') ?? '')
    .split(' ')
    .filter((value) => value && value !== id);
  if (current.length) input.setAttribute('aria-describedby', current.join(' '));
  else input.removeAttribute('aria-describedby');
}

/** Aplica o limpia el estado visual y accesible de un campo. */
export function setFieldState(input, errorElement, message) {
  if (!input) return;

  if (message) {
    input.setAttribute('aria-invalid', 'true');
    if (errorElement) {
      if (!errorElement.id) {
        errorElement.id = `${input.id || 'campo'}-error`;
      }
      errorElement.textContent = message;
      errorElement.hidden = false;
      addDescribedBy(input, errorElement.id);
    }
  } else {
    input.removeAttribute('aria-invalid');
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.hidden = true;
      removeDescribedBy(input, errorElement.id);
    }
  }
}

/** Pinta el resumen de errores y devuelve el primer campo inválido. */
export function renderErrorSummary(container, errors, fieldMap) {
  if (!container) return null;

  const entries = Object.entries(errors);
  container.replaceChildren();

  if (!entries.length) {
    container.hidden = true;
    return null;
  }

  const heading = document.createElement('p');
  heading.textContent = 'Revisa estos campos antes de continuar:';

  const list = document.createElement('ul');
  for (const [key, message] of entries) {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = `#${fieldMap[key]?.id ?? ''}`;
    link.textContent = message;
    link.addEventListener('click', (event) => {
      event.preventDefault();
      fieldMap[key]?.focus();
    });
    item.append(link);
    list.append(item);
  }

  container.append(heading, list);
  container.hidden = false;

  return fieldMap[entries[0][0]] ?? null;
}
