import { countAppointments, getAppointmentsSorted } from './almacenamiento.js';
import { closeDialog, openDialog, setupDialog } from './modal.js';
import { formatDateTime } from '../utils/fechas.js';
import { formatPhone, maskDocument } from '../utils/formato.js';
import { downloadAppointmentICS } from '../utils/calendario.js';

let dialog;
let list;
let empty;

function updateCount() {
  const total = countAppointments();
  document.querySelectorAll('[data-appointments-count]').forEach((badge) => {
    badge.textContent = String(total);
    badge.hidden = total === 0;
  });
}

function buildAppointmentCard(cita) {
  const card = document.createElement('article');
  card.className = 'appointment-card';

  const top = document.createElement('div');
  top.className = 'appointment-top';

  const code = document.createElement('p');
  code.className = 'appointment-code';
  code.textContent = cita.idCita;

  const status = document.createElement('span');
  status.className = 'status-pill';
  status.textContent = 'Confirmada';

  top.append(code, status);

  const specialty = document.createElement('h3');
  specialty.textContent = cita.servicio?.especialidad ?? 'Especialidad';

  const when = document.createElement('p');
  when.className = 'appointment-when';
  when.textContent = formatDateTime(cita.fechaHora);

  const details = document.createElement('dl');
  details.className = 'appointment-details';

  const entries = [
    ['Profesional', cita.servicio?.medicoAsignado ?? '—'],
    ['Paciente', cita.paciente?.nombreCompleto ?? '—'],
    ['Documento', maskDocument(cita.paciente?.documento)],
    ['Teléfono', formatPhone(cita.paciente?.telefono)],
  ];

  for (const [label, value] of entries) {
    const wrapper = document.createElement('div');
    const term = document.createElement('dt');
    term.textContent = label;
    const description = document.createElement('dd');
    description.textContent = value;
    wrapper.append(term, description);
    details.append(wrapper);
  }

  const actions = document.createElement('div');
  actions.className = 'appointment-actions';

  const calendar = document.createElement('button');
  calendar.type = 'button';
  calendar.className = 'button button-secondary button-sm';
  calendar.textContent = 'Agregar a mi calendario';
  calendar.addEventListener('click', () => downloadAppointmentICS(cita));

  actions.append(calendar);

  card.append(top, specialty, when, details, actions);
  return card;
}

function renderAppointments() {
  if (!list || !empty) return;

  const appointments = getAppointmentsSorted();
  list.replaceChildren();
  empty.hidden = appointments.length > 0;
  list.hidden = appointments.length === 0;

  for (const cita of appointments) {
    list.append(buildAppointmentCard(cita));
  }

  updateCount();
}

function openAppointments(trigger = document.activeElement) {
  renderAppointments();
  openDialog(dialog, trigger);
}

export function initMisCitas() {
  dialog = document.querySelector('[data-appointments-dialog]');
  if (!dialog) return;

  list = dialog.querySelector('[data-appointments-list]');
  empty = dialog.querySelector('[data-appointments-empty]');

  setupDialog(dialog, { onClose: updateCount });

  document.addEventListener('click', (event) => {
    const opener = event.target.closest('[data-open-appointments]');
    if (!opener) return;
    event.preventDefault();
    openAppointments(opener);
  });

  dialog.querySelector('[data-close-appointments]')?.addEventListener('click', () => {
    closeDialog(dialog);
  });

  dialog.querySelector('[data-appointments-new]')?.addEventListener('click', () => {
    closeDialog(dialog);
    document.dispatchEvent(new CustomEvent('medicareplus:open-booking'));
  });

  document.addEventListener('medicareplus:open-appointments', () => {
    openAppointments(document.activeElement);
  });

  window.addEventListener('medicareplus:appointments-changed', updateCount);
  updateCount();
}

export { openAppointments, updateCount };
