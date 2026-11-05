import { CONFIG } from '../config.js';

function icsDate(date) {
  return date
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}Z$/, 'Z');
}

function escapeICS(value) {
  return String(value ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');
}

/**
 * Descarga un archivo .ics con la cita confirmada.
 * Es una utilidad de demostración: no envía datos a ningún servidor.
 */
export function downloadAppointmentICS(cita) {
  if (!cita?.fechaHora) return;

  const start = new Date(cita.fechaHora);
  const end = new Date(start.getTime() + CONFIG.slotMinutes * 60 * 1000);
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//MediCare Plus//Demo academica//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${cita.idCita}@medicareplus.demo`,
    `DTSTAMP:${icsDate(new Date())}`,
    `DTSTART:${icsDate(start)}`,
    `DTEND:${icsDate(end)}`,
    `SUMMARY:${escapeICS(`Cita de ${cita.servicio.especialidad} · MediCare Plus`)}`,
    `DESCRIPTION:${escapeICS(
      `Cita de demostración ${cita.idCita} con ${cita.servicio.medicoAsignado}. Proyecto académico ADSO.`,
    )}`,
    `LOCATION:${escapeICS(`${CONFIG.contact.direccion} (ficticia)`)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  const blob = new Blob([lines.join('\r\n')], {
    type: 'text/calendar;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${cita.idCita}.ics`;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
