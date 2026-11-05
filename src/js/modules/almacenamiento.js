import { CONFIG } from '../config.js';
import { nextAppointmentId } from '../utils/id.js';

export class StorageError extends Error {
  constructor(message, code = 'storage') {
    super(message);
    this.name = 'StorageError';
    this.code = code;
  }
}

function isValidRecord(cita) {
  return Boolean(
    cita &&
      typeof cita === 'object' &&
      typeof cita.idCita === 'string' &&
      cita.paciente &&
      typeof cita.paciente === 'object' &&
      typeof cita.paciente.nombreCompleto === 'string' &&
      cita.servicio &&
      typeof cita.servicio === 'object' &&
      typeof cita.servicio.especialidad === 'string' &&
      typeof cita.servicio.medicoAsignado === 'string' &&
      typeof cita.fechaHora === 'string' &&
      !Number.isNaN(Date.parse(cita.fechaHora)),
  );
}

/** Lee las citas tolerando datos corruptos o almacenamiento bloqueado. */
export function readAppointments() {
  try {
    const raw = window.localStorage.getItem(CONFIG.storageKey);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      console.warn('[MediCare Plus] El contenedor de citas no es un array; se ignoró.');
      return [];
    }
    const valid = parsed.filter(isValidRecord);
    if (valid.length !== parsed.length) {
      console.warn('[MediCare Plus] Se ignoraron citas con estructura inválida.');
    }
    return valid;
  } catch (error) {
    console.warn('[MediCare Plus] No se pudo leer localStorage.', error);
    return [];
  }
}

export function writeAppointments(citas) {
  try {
    window.localStorage.setItem(CONFIG.storageKey, JSON.stringify(citas));
  } catch (error) {
    throw new StorageError(
      'No se pudo guardar la cita. Revisa si el navegador está en modo privado o si el almacenamiento está lleno.',
      'quota',
    );
  }
}

export function storageAvailable() {
  try {
    const key = `${CONFIG.storageKey}.test`;
    window.localStorage.setItem(key, '1');
    window.localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

export function isSlotTaken(cita, citas) {
  return citas.some(
    (item) =>
      item.fechaHora === cita.fechaHora &&
      item.servicio?.medicoAsignado === cita.servicio?.medicoAsignado,
  );
}

/**
 * Guarda una cita: relee, comprueba conflicto, genera id y persiste.
 * Devuelve el registro completo con idCita.
 */
export function saveAppointment(cita) {
  const citas = readAppointments();

  if (isSlotTaken(cita, citas)) {
    throw new StorageError(
      'Esa franja acaba de ocuparse. Elige otro horario disponible.',
      'conflict',
    );
  }

  const record = {
    idCita: nextAppointmentId(citas),
    paciente: { ...cita.paciente },
    servicio: { ...cita.servicio },
    fechaHora: cita.fechaHora,
    estado: 'confirmada',
  };

  writeAppointments([...citas, record]);
  window.dispatchEvent(new CustomEvent('medicareplus:appointments-changed'));
  return record;
}

export function countAppointments() {
  return readAppointments().length;
}

export function getAppointmentsSorted() {
  return readAppointments()
    .slice()
    .sort((a, b) => new Date(a.fechaHora).getTime() - new Date(b.fechaHora).getTime());
}
