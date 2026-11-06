import { CONFIG } from '../config.js';
import { getEspecialidad } from '../data/especialidades.js';
import { readAppointments, saveAppointment, StorageError, storageAvailable } from './almacenamiento.js';
import { closeDialog, openDialog, setupDialog } from './modal.js';
import {
  findNextDateWithAvailability,
  findNextGlobalAvailability,
  getAvailability,
} from './disponibilidad.js';
import {
  normalizePatient,
  renderErrorSummary,
  setFieldState,
  validatePatient,
  validateSchedule,
} from './validacion.js';
import {
  capitalize,
  formatDateTime,
  formatLongDate,
  formatTimeFromHHMM,
  maxDateISO,
  relativeDayLabel,
  todayISO,
} from '../utils/fechas.js';
import { downloadAppointmentICS } from '../utils/calendario.js';

const state = {
  step: 1,
  especialidadId: '',
  fecha: '',
  hora: '',
  iso: '',
  medico: null,
  slots: [],
  saved: null,
  trigger: null,
};

let dialog;
let form;

function q(selector, root = dialog) {
  return root?.querySelector(selector) ?? null;
}

function qa(selector, root = dialog) {
  return [...(root?.querySelectorAll(selector) ?? [])];
}

function fieldElements() {
  return {
    especialidad: {
      input: q('[data-booking-specialty]'),
      error: q('[data-error-for="especialidad"]'),
    },
    fecha: {
      input: q('[data-booking-date]'),
      error: q('[data-error-for="fecha"]'),
    },
    franja: {
      input: q('[data-booking-slots]'),
      error: q('[data-error-for="franja"]'),
    },
    nombre: {
      input: q('#cita-nombre'),
      error: q('[data-error-for="nombre"]'),
    },
    documento: {
      input: q('#cita-documento'),
      error: q('[data-error-for="documento"]'),
    },
    telefono: {
      input: q('#cita-telefono'),
      error: q('[data-error-for="telefono"]'),
    },
    correo: {
      input: q('#cita-correo'),
      error: q('[data-error-for="correo"]'),
    },
    politica: {
      input: q('#cita-politica'),
      error: q('[data-error-for="politica"]'),
    },
  };
}

function getFieldMap() {
  const fields = fieldElements();
  return Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [key, value.input]),
  );
}

function clearFieldErrors() {
  const fields = fieldElements();
  for (const { input, error } of Object.values(fields)) {
    setFieldState(input, error, '');
  }
  const summary = q('[data-booking-error-summary]');
  if (summary) summary.hidden = true;
  const storage = q('[data-booking-storage-error]');
  if (storage) storage.hidden = true;
}

function paintFieldErrors(errors) {
  const fields = fieldElements();
  for (const [key, { input, error }] of Object.entries(fields)) {
    setFieldState(input, error, errors[key] ?? '');
  }
}

function paintDateHint() {
  const specialty = q('[data-booking-specialty]')?.value ?? '';
  const date = q('[data-booking-date]')?.value ?? '';
  const hint = q('[data-date-hint]');
  if (!hint) return;

  if (!specialty || !date) {
    hint.textContent = 'Atendemos de lunes a sábado, hasta 90 días adelante.';
    return;
  }

  const errors = validateSchedule({ especialidadId: specialty, fecha: date });
  if (errors.fecha) {
    hint.textContent = errors.fecha;
    hint.dataset.state = 'warning';
    return;
  }

  const { availableCount } = getAvailability(specialty, date, readAppointments());
  hint.dataset.state = availableCount ? 'ok' : 'warning';
  hint.textContent = availableCount
    ? `Hay ${availableCount} horario${availableCount === 1 ? '' : 's'} disponible${availableCount === 1 ? '' : 's'} ese día.`
    : 'Ese día no quedan cupos. Prueba otra fecha.';
}

function updateDateBounds() {
  const min = todayISO();
  const max = maxDateISO();
  const bookingDate = q('[data-booking-date]');
  const quickDate = document.querySelector('[data-quick-date]');

  for (const input of [bookingDate, quickDate]) {
    if (!input) continue;
    input.min = min;
    input.max = max;
  }
}

function goToStep(step, { quiet = false } = {}) {
  state.step = step;
  const panels = qa('[data-booking-panel]');
  const numericStep = typeof step === 'number' ? step : 4;

  panels.forEach((panel) => {
    panel.hidden = panel.dataset.bookingPanel !== String(step);
  });

  qa('[data-step-indicator]').forEach((item) => {
    const value = Number(item.dataset.stepIndicator);
    const done = value < numericStep || step === 'success';
    const active = value === numericStep && step !== 'success';
    item.classList.toggle('is-done', done);
    item.classList.toggle('is-active', active);
    if (active) item.setAttribute('aria-current', 'step');
    else item.removeAttribute('aria-current');
  });

  const back = q('[data-booking-back]');
  const next = q('[data-booking-next]');
  const submit = q('[data-booking-submit]');
  const done = q('[data-booking-done]');

  if (back) back.hidden = !(typeof step === 'number' && step > 1);
  if (next) next.hidden = typeof step !== 'number' || step > 2;
  if (submit) submit.hidden = step !== 3;
  if (done) done.hidden = step !== 'success';

  const body = q('.booking-body');
  if (body) body.scrollTop = 0;

  if (quiet || !dialog?.open) return;

  window.requestAnimationFrame(() => {
    if (step === 1) {
      q('[data-booking-specialty]')?.focus({ preventScroll: true });
    } else if (step === 2) {
      const firstSlot = q('[data-booking-slots] .slot:not([disabled])');
      (firstSlot ?? q('[data-booking-slots]'))?.focus({ preventScroll: true });
    } else if (step === 3) {
      q('#cita-nombre')?.focus({ preventScroll: true });
    }
  });
}

function resetBooking() {
  state.step = 1;
  state.especialidadId = '';
  state.fecha = '';
  state.hora = '';
  state.iso = '';
  state.medico = null;
  state.slots = [];
  state.saved = null;

  form?.reset();
  clearFieldErrors();
  updateDateBounds();

  const slots = q('[data-booking-slots]');
  if (slots) slots.replaceChildren();
  const count = q('[data-booking-slots-count]');
  if (count) count.textContent = '';
  const empty = q('[data-booking-slots-empty]');
  if (empty) empty.hidden = true;
  paintDateHint();
  paintSummary();
  goToStep(1, { quiet: true });
}

function paintSummary() {
  const specialty = getEspecialidad(state.especialidadId);
  const specialtyText = specialty?.nombre ?? '—';
  const dateText = state.fecha
    ? capitalize(formatLongDate(state.fecha))
    : '—';
  const timeText = state.hora ? formatTimeFromHHMM(state.hora) : '—';
  const doctorText = state.medico
    ? `${state.medico.nombre} · ${state.medico.registro}`
    : 'Se asigna al elegir el horario';

  // Los mismos datos aparecen en la cabecera del paso 2 y en la tarjeta
  // resumen del paso 3; hay que actualizar todas las coincidencias.
  qa('[data-summary-specialty]').forEach((node) => {
    node.textContent = specialtyText;
  });
  qa('[data-summary-date]').forEach((node) => {
    node.textContent = dateText;
  });
  qa('[data-summary-time]').forEach((node) => {
    node.textContent = timeText;
  });
  qa('[data-summary-doctor]').forEach((node) => {
    node.textContent = doctorText;
  });
}

function renderSlots(slots) {
  const container = q('[data-booking-slots]');
  if (!container) return;

  container.replaceChildren();

  for (const slot of slots) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'slot';
    button.dataset.time = slot.time;
    button.setAttribute('aria-pressed', 'false');

    if (!slot.disponible) {
      button.disabled = true;
      button.classList.add('is-busy');
      button.setAttribute('aria-label', `${formatTimeFromHHMM(slot.time)}, no disponible`);
    } else {
      button.setAttribute('aria-label', `${formatTimeFromHHMM(slot.time)}, disponible`);
      button.addEventListener('click', () => selectSlot(slot, button));
    }

    const time = document.createElement('strong');
    time.textContent = formatTimeFromHHMM(slot.time);
    const note = document.createElement('small');
    note.textContent = slot.disponible ? '30 min' : 'Ocupado';

    button.append(time, note);
    container.append(button);
  }

  if (state.hora) {
    const selected = slots.find(
      (slot) => slot.time === state.hora && slot.disponible,
    );
    if (selected) {
      const button = q(`[data-booking-slots] .slot[data-time="${state.hora}"]`);
      button?.classList.add('is-selected');
      button?.setAttribute('aria-pressed', 'true');
      state.medico = selected.medico;
      state.iso = selected.iso;
    } else {
      state.hora = '';
      state.iso = '';
      state.medico = null;
    }
  }
}

function selectSlot(slot, button) {
  state.hora = slot.time;
  state.iso = slot.iso;
  state.medico = slot.medico;

  qa('[data-booking-slots] .slot').forEach((item) => {
    item.classList.remove('is-selected');
    item.setAttribute('aria-pressed', 'false');
  });

  button.classList.add('is-selected');
  button.setAttribute('aria-pressed', 'true');
  setFieldState(fieldElements().franja.input, fieldElements().franja.error, '');
  paintSummary();
}

function loadSlots() {
  const citas = readAppointments();
  const { slots, availableCount } = getAvailability(
    state.especialidadId,
    state.fecha,
    citas,
  );

  state.slots = slots;
  renderSlots(slots);

  const specialty = getEspecialidad(state.especialidadId);
  const count = q('[data-booking-slots-count]');
  const empty = q('[data-booking-slots-empty]');

  if (count) {
    count.textContent = availableCount
      ? `${specialty?.nombre ?? 'Especialidad'} · ${capitalize(formatLongDate(state.fecha))} · ${availableCount} horario${availableCount === 1 ? '' : 's'} disponible${availableCount === 1 ? '' : 's'}`
      : `${specialty?.nombre ?? 'Especialidad'} · ${capitalize(formatLongDate(state.fecha))}`;
  }

  if (empty) empty.hidden = availableCount > 0;
  if (availableCount === 0) {
    const hint = q('[data-empty-hint]');
    if (hint) {
      hint.textContent = `No quedan cupos para ${specialty?.nombre?.toLowerCase() ?? 'esta especialidad'} ese día.`;
    }
  }

  paintSummary();
}

function stepOneNext() {
  const specialty = q('[data-booking-specialty]');
  const date = q('[data-booking-date]');
  const especialidadId = specialty?.value ?? '';
  const fecha = date?.value ?? '';
  const errors = validateSchedule({ especialidadId, fecha });

  paintFieldErrors(errors);
  const summary = q('[data-booking-error-summary]');
  if (summary) summary.hidden = true;

  const firstInvalid = getFieldMap()[Object.keys(errors)[0]];
  if (firstInvalid) {
    firstInvalid.focus();
    return;
  }

  state.especialidadId = especialidadId;
  state.fecha = fecha;
  state.hora = '';
  state.iso = '';
  state.medico = null;
  loadSlots();
  goToStep(2);
}

function stepTwoNext() {
  const { input, error } = fieldElements().franja;

  if (!state.hora) {
    setFieldState(input, error, 'Selecciona una franja disponible.');
    q('[data-booking-slots] .slot:not([disabled])')?.focus();
    return;
  }

  const slot = state.slots.find(
    (item) => item.time === state.hora && item.disponible,
  );

  if (!slot) {
    loadSlots();
    setFieldState(input, error, 'Ese horario ya no está disponible. Elige otro.');
    return;
  }

  state.medico = slot.medico;
  state.iso = slot.iso;
  paintSummary();
  goToStep(3);
}

function getPatientData() {
  return {
    nombreCompleto: q('#cita-nombre')?.value ?? '',
    documento: q('#cita-documento')?.value ?? '',
    telefono: q('#cita-telefono')?.value ?? '',
    correo: q('#cita-correo')?.value ?? '',
    politica: Boolean(q('#cita-politica')?.checked),
  };
}

function showStorageError(message) {
  const box = q('[data-booking-storage-error]');
  if (!box) return;
  box.textContent = message;
  box.hidden = false;
  box.focus();
}

function submitBooking() {
  const data = getPatientData();
  const errors = validatePatient(data);
  const summary = q('[data-booking-error-summary]');

  paintFieldErrors(errors);

  if (Object.keys(errors).length) {
    const firstInvalid = renderErrorSummary(summary, errors, getFieldMap());
    (firstInvalid ?? q('[data-booking-error-summary]'))?.focus();
    return;
  }

  if (summary) summary.hidden = true;

  const latest = getAvailability(
    state.especialidadId,
    state.fecha,
    readAppointments(),
  );
  const slot = latest.slots.find(
    (item) => item.time === state.hora && item.disponible,
  );

  if (!slot) {
    state.hora = '';
    state.iso = '';
    state.medico = null;
    loadSlots();
    goToStep(2);
    setFieldState(
      fieldElements().franja.input,
      fieldElements().franja.error,
      'Esa franja acaba de ocuparse. Elige otro horario disponible.',
    );
    return;
  }

  state.medico = slot.medico;
  state.iso = slot.iso;

  const specialty = getEspecialidad(state.especialidadId);
  const patient = normalizePatient(data);

  const cita = {
    paciente: {
      nombreCompleto: patient.nombreCompleto,
      documento: patient.documento,
      telefono: patient.telefono,
      correo: patient.correo,
    },
    servicio: {
      especialidad: specialty?.nombre ?? '',
      medicoAsignado: slot.medico.nombre,
    },
    fechaHora: slot.iso,
    estado: 'confirmada',
  };

  try {
    const saved = saveAppointment(cita);
    showSuccess(saved);
  } catch (error) {
    if (error instanceof StorageError && error.code === 'conflict') {
      state.hora = '';
      state.iso = '';
      state.medico = null;
      loadSlots();
      goToStep(2);
      setFieldState(
        fieldElements().franja.input,
        fieldElements().franja.error,
        error.message,
      );
      return;
    }

    showStorageError(
      error instanceof StorageError
        ? error.message
        : 'No se pudo guardar la cita. Intenta de nuevo.',
    );
  }
}

function showSuccess(cita) {
  state.saved = cita;

  const id = q('[data-success-id]');
  const specialty = q('[data-success-specialty]');
  const date = q('[data-success-date]');
  const doctor = q('[data-success-doctor]');
  const patient = q('[data-success-patient]');

  if (id) id.textContent = cita.idCita;
  if (specialty) specialty.textContent = cita.servicio.especialidad;
  if (date) date.textContent = formatDateTime(cita.fechaHora);
  if (doctor) doctor.textContent = cita.servicio.medicoAsignado;
  if (patient) patient.textContent = cita.paciente.nombreCompleto;

  goToStep('success');
  window.requestAnimationFrame(() => {
    q('[data-success-card]')?.focus({ preventScroll: true });
  });
  updateNextAvailability();
}

function openBooking({ especialidadId = '', fecha = '', trigger = null } = {}) {
  if (!dialog) return;

  resetBooking();
  state.trigger = trigger;
  updateDateBounds();

  const specialtySelect = q('[data-booking-specialty]');
  const dateInput = q('[data-booking-date]');
  const validSpecialty = Boolean(getEspecialidad(especialidadId));

  if (validSpecialty) {
    specialtySelect.value = especialidadId;
    state.especialidadId = especialidadId;
  }

  if (fecha) {
    dateInput.value = fecha;
    state.fecha = fecha;
  } else if (validSpecialty) {
    const next = findNextDateWithAvailability(
      especialidadId,
      readAppointments(),
    );
    if (next) dateInput.value = next;
  }

  paintDateHint();
  paintSummary();
  goToStep(1, { quiet: true });

  openDialog(dialog, trigger, {
    initialFocus: validSpecialty ? dateInput : specialtySelect,
  });
}

function updateNextAvailability() {
  const label = document.querySelector('[data-next-availability]');
  const button = document.querySelector('[data-next-booking]');
  if (!label) return;

  const next = findNextGlobalAvailability(readAppointments());

  if (!next) {
    label.textContent = `Sin cupos en los próximos ${CONFIG.maxDaysAhead} días`;
    if (button) {
      delete button.dataset.specialty;
      delete button.dataset.date;
    }
    return;
  }

  label.textContent = `${next.especialidad.nombre} · ${relativeDayLabel(next.fecha)} · ${formatTimeFromHHMM(next.time)}`;

  if (button) {
    button.dataset.specialty = next.especialidadId;
    button.dataset.date = next.fecha;
  }
}

function bindQuickForm() {
  const quickForm = document.querySelector('[data-quick-form]');
  if (!quickForm) return;

  const specialty = quickForm.querySelector('[data-quick-specialty]');
  const date = quickForm.querySelector('[data-quick-date]');
  const error = quickForm.querySelector('[data-quick-error]');
  const submit = quickForm.querySelector('button[type="submit"]');

  const clearQuickError = () => {
    if (error) {
      error.hidden = true;
      error.textContent = '';
    }
    specialty?.removeAttribute('aria-invalid');
    date?.removeAttribute('aria-invalid');
    if (specialty?.getAttribute('aria-describedby') === 'quick-error') {
      specialty.removeAttribute('aria-describedby');
    }
    if (date?.getAttribute('aria-describedby') === 'quick-error') {
      date.removeAttribute('aria-describedby');
    }
  };

  quickForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const errors = validateSchedule({
      especialidadId: specialty?.value ?? '',
      fecha: date?.value ?? '',
    });

    if (Object.keys(errors).length) {
      const first = errors.especialidad ?? errors.fecha;
      if (error) {
        error.textContent = first;
        error.hidden = false;
      }
      if (errors.especialidad) {
        specialty?.setAttribute('aria-invalid', 'true');
        specialty?.setAttribute('aria-describedby', error?.id ?? '');
      }
      if (errors.fecha) {
        date?.setAttribute('aria-invalid', 'true');
        date?.setAttribute('aria-describedby', error?.id ?? '');
      }
      (errors.especialidad ? specialty : date)?.focus();
      return;
    }

    clearQuickError();
    openBooking({
      especialidadId: specialty?.value ?? '',
      fecha: date?.value ?? '',
      trigger: submit,
    });
  });

  specialty?.addEventListener('change', clearQuickError);
  date?.addEventListener('change', clearQuickError);

  const next = findNextGlobalAvailability(readAppointments());
  if (next) {
    specialty.value = next.especialidadId;
    date.value = next.fecha;
  }
}

function bindDialog() {
  setupDialog(dialog, { onClose: resetBooking });

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (state.step === 1) stepOneNext();
    else if (state.step === 2) stepTwoNext();
    else if (state.step === 3) submitBooking();
  });

  q('[data-booking-next]')?.addEventListener('click', () => {
    if (state.step === 1) stepOneNext();
    else if (state.step === 2) stepTwoNext();
  });

  q('[data-booking-back]')?.addEventListener('click', () => {
    if (state.step === 3) {
      state.saved = null;
      goToStep(2);
    } else {
      goToStep(1);
    }
  });

  q('[data-booking-done]')?.addEventListener('click', () => closeDialog(dialog));
  q('[data-booking-close]')?.addEventListener('click', () => closeDialog(dialog));

  qa('[data-booking-edit]').forEach((button) => {
    button.addEventListener('click', () => goToStep(1));
  });

  q('[data-booking-next-day]')?.addEventListener('click', () => {
    const citas = readAppointments();
    const nextDate = findNextDateWithAvailability(
      state.especialidadId,
      citas,
      90,
      state.fecha || todayISO(),
    );
    if (!nextDate) return;

    const dateInput = q('[data-booking-date]');
    dateInput.value = nextDate;
    state.fecha = nextDate;
    state.hora = '';
    state.iso = '';
    state.medico = null;
    clearFieldErrors();
    loadSlots();
    paintDateHint();
    paintSummary();
  });

  q('[data-booking-specialty]')?.addEventListener('change', () => {
    state.especialidadId = q('[data-booking-specialty]')?.value ?? '';
    state.hora = '';
    state.iso = '';
    state.medico = null;
    setFieldState(fieldElements().especialidad.input, fieldElements().especialidad.error, '');
    paintDateHint();
  });

  q('[data-booking-date]')?.addEventListener('change', () => {
    state.fecha = q('[data-booking-date]')?.value ?? '';
    state.hora = '';
    state.iso = '';
    state.medico = null;
    setFieldState(fieldElements().fecha.input, fieldElements().fecha.error, '');
    paintDateHint();
  });

  q('[data-download-ics]')?.addEventListener('click', () => {
    if (state.saved) downloadAppointmentICS(state.saved);
  });

  q('[data-success-appointments]')?.addEventListener('click', () => {
    closeDialog(dialog);
    document.dispatchEvent(new CustomEvent('medicareplus:open-appointments'));
  });

  const patientKeyById = {
    'cita-nombre': 'nombre',
    'cita-documento': 'documento',
    'cita-telefono': 'telefono',
    'cita-correo': 'correo',
    'cita-politica': 'politica',
  };

  for (const [id, key] of Object.entries(patientKeyById)) {
    const input = q(`#${id}`);
    if (!input) continue;
    const eventName = input.type === 'checkbox' ? 'change' : 'input';
    input.addEventListener(eventName, () => {
      if (input.getAttribute('aria-invalid') !== 'true') return;
      const errors = validatePatient(getPatientData());
      const fields = fieldElements();
      setFieldState(fields[key].input, fields[key].error, errors[key] ?? '');
    });
  }
}

export function initAgenda() {
  dialog = document.querySelector('[data-booking-dialog]');
  if (!dialog) return;
  form = dialog.querySelector('[data-booking-form]');

  updateDateBounds();
  resetBooking();
  bindQuickForm();
  bindDialog();

  document.addEventListener('click', (event) => {
    const opener = event.target.closest('[data-open-booking]');
    if (!opener) return;
    event.preventDefault();
    openBooking({
      especialidadId: opener.dataset.specialty ?? '',
      fecha: opener.dataset.date ?? '',
      trigger: opener,
    });
  });

  document.addEventListener('medicareplus:open-booking', () => {
    openBooking({ trigger: document.activeElement });
  });

  window.addEventListener('medicareplus:appointments-changed', updateNextAvailability);

  if (!storageAvailable()) {
    const warning = q('[data-storage-warning]');
    if (warning) warning.hidden = false;
  }

  updateNextAvailability();
}
