import { todayISO } from './fechas.js';

const ID_PATTERN = /^MED-(\d{4})-(\d{3,})$/;

/**
 * Genera el siguiente idCita con formato MED-AAAA-NNN.
 * Ignora ids malformados (con advertencia) y evita colisiones.
 */
export function nextAppointmentId(citas, year = todayISO().slice(0, 4)) {
  const records = Array.isArray(citas) ? citas : [];
  const ids = records
    .map((cita) => cita?.idCita)
    .filter((id) => typeof id === 'string');

  const seen = new Set();
  let max = 0;

  for (const id of ids) {
    if (seen.has(id)) {
      console.warn(`[MediCare Plus] idCita duplicado detectado: ${id}`);
    }
    seen.add(id);

    const match = ID_PATTERN.exec(id);
    if (!match) {
      console.warn(`[MediCare Plus] idCita con formato inválido: ${id}`);
      continue;
    }
    if (match[1] !== String(year)) continue;
    max = Math.max(max, Number(match[2]));
  }

  let candidate = `MED-${year}-${String(max + 1).padStart(3, '0')}`;
  let sequence = max + 1;
  while (seen.has(candidate)) {
    sequence += 1;
    candidate = `MED-${year}-${String(sequence).padStart(3, '0')}`;
  }

  return candidate;
}

export function isValidAppointmentId(id) {
  return typeof id === 'string' && ID_PATTERN.test(id);
}
