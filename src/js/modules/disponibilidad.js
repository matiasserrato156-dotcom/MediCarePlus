import { CONFIG } from '../config.js';
import { ESPECIALIDADES, getEspecialidad } from '../data/especialidades.js';
import { getMedicosPorEspecialidad } from '../data/medicos.js';
import {
  addDaysISO,
  dateTimeToISO,
  dayOfWeek,
  hhmmToMinutes,
  isPastDate,
  isPastSlot,
  minutesToHHMM,
  todayISO,
} from '../utils/fechas.js';

/** Genera las franjas de 30 minutos de un día según CONFIG.schedule. */
export function generateSlots(dateStr) {
  const ranges = CONFIG.schedule[dayOfWeek(dateStr)] ?? [];
  const slots = [];

  for (const range of ranges) {
    const start = hhmmToMinutes(range.start);
    const end = hhmmToMinutes(range.end);
    for (let minute = start; minute + CONFIG.slotMinutes <= end; minute += CONFIG.slotMinutes) {
      slots.push(minutesToHHMM(minute));
    }
  }

  return slots;
}

export function isDoctorBusy(medicoNombre, iso, citas) {
  return citas.some(
    (cita) =>
      cita?.fechaHora === iso && cita?.servicio?.medicoAsignado === medicoNombre,
  );
}

/**
 * Disponibilidad de una especialidad para una fecha.
 * Capacidad: un paciente por médico por franja (D2).
 */
export function getAvailability(especialidadId, dateStr, citas = []) {
  const medicos = getMedicosPorEspecialidad(especialidadId);
  const past = isPastDate(dateStr);

  const slots = generateSlots(dateStr).map((time) => {
    const iso = dateTimeToISO(dateStr, time);
    const isPast = past || isPastSlot(dateStr, time);
    const medico = isPast
      ? null
      : (medicos.find((doctor) => !isDoctorBusy(doctor.nombre, iso, citas)) ?? null);

    return {
      time,
      iso,
      disponible: Boolean(medico),
      medico,
    };
  });

  return {
    dateStr,
    especialidadId,
    medicos,
    slots,
    availableCount: slots.filter((slot) => slot.disponible).length,
  };
}

/** Busca la primera franja libre de una especialidad a partir de una fecha. */
export function findNextAvailability(
  especialidadId,
  citas = [],
  maxDays = CONFIG.maxDaysAhead,
  startDate = todayISO(),
) {
  for (let offset = 0; offset <= maxDays; offset += 1) {
    const fecha = addDaysISO(startDate, offset);
    if ((CONFIG.schedule[dayOfWeek(fecha)] ?? []).length === 0) continue;

    const { slots } = getAvailability(especialidadId, fecha, citas);
    const slot = slots.find((item) => item.disponible);
    if (slot) {
      return { especialidadId, fecha, ...slot };
    }
  }

  return null;
}

/** Primera franja libre entre todas las especialidades (para el Hero). */
export function findNextGlobalAvailability(citas = [], maxDays = CONFIG.maxDaysAhead) {
  let best = null;

  for (const especialidad of ESPECIALIDADES) {
    const next = findNextAvailability(especialidad.id, citas, maxDays);
    if (!next) continue;

    const key = `${next.fecha}T${next.time}`;
    if (!best || key < best.key) {
      best = { ...next, key, especialidad };
    }
  }

  return best;
}

/** Sugiere el siguiente día con disponibilidad para una especialidad. */
export function findNextDateWithAvailability(
  especialidadId,
  citas = [],
  maxDays = CONFIG.maxDaysAhead,
  startDate = todayISO(),
) {
  const next = findNextAvailability(especialidadId, citas, maxDays, startDate);
  return next ? next.fecha : null;
}

export function getSpecialtyAvailabilityLabel(especialidadId) {
  return getEspecialidad(especialidadId)?.nombre ?? 'Especialidad';
}
