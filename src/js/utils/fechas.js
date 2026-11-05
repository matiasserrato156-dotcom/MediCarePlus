import { CONFIG } from '../config.js';

const pad = (value) => String(value).padStart(2, '0');

/**
 * Bogotá usa UTC−5 todo el año (sin horario de verano). Construir las
 * fechas con este offset explícito evita que la zona del navegador
 * desplace las citas (decisión D4).
 */
export function getBogotaParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: CONFIG.timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date);

  const value = (type) => parts.find((part) => part.type === type)?.value ?? '0';
  let hour = Number(value('hour'));
  if (hour === 24) hour = 0;

  return {
    year: Number(value('year')),
    month: Number(value('month')),
    day: Number(value('day')),
    hour,
    minute: Number(value('minute')),
  };
}

export function todayISO(date = new Date()) {
  const { year, month, day } = getBogotaParts(date);
  return `${year}-${pad(month)}-${pad(day)}`;
}

export function addDaysISO(dateStr, days) {
  const date = new Date(`${dateStr}T12:00:00-05:00`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function maxDateISO() {
  return addDaysISO(todayISO(), CONFIG.maxDaysAhead);
}

export function isValidISODate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T12:00:00-05:00`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function dayOfWeek(dateStr) {
  return new Date(`${dateStr}T12:00:00-05:00`).getUTCDay();
}

export function isClosedDay(dateStr) {
  return (CONFIG.schedule[dayOfWeek(dateStr)] ?? []).length === 0;
}

export function isPastDate(dateStr) {
  return dateStr < todayISO();
}

export function hhmmToMinutes(hhmm) {
  const [hours, minutes] = hhmm.split(':').map(Number);
  return hours * 60 + minutes;
}

export function minutesToHHMM(minutes) {
  return `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`;
}

export function nowMinutes() {
  const { hour, minute } = getBogotaParts();
  return hour * 60 + minute;
}

export function isPastSlot(dateStr, hhmm) {
  return dateStr === todayISO() && hhmmToMinutes(hhmm) <= nowMinutes();
}

export function dateTimeToISO(dateStr, hhmm) {
  const iso = new Date(`${dateStr}T${hhmm}:00-05:00`).toISOString();
  if (Number.isNaN(new Date(iso).getTime())) {
    throw new Error(`Fecha u hora inválida: ${dateStr} ${hhmm}`);
  }
  return iso;
}

export function isoToBogotaDate(iso) {
  const { year, month, day } = getBogotaParts(new Date(iso));
  return `${year}-${pad(month)}-${pad(day)}`;
}

export function capitalize(text) {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function formatLongDate(dateStr, extra = {}) {
  return new Intl.DateTimeFormat(CONFIG.locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: CONFIG.timeZone,
    ...extra,
  }).format(new Date(`${dateStr}T12:00:00-05:00`));
}

export function formatShortDate(dateStr) {
  return new Intl.DateTimeFormat(CONFIG.locale, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: CONFIG.timeZone,
  }).format(new Date(`${dateStr}T12:00:00-05:00`));
}

export function formatTimeFromHHMM(hhmm) {
  const [hours, minutes] = hhmm.split(':').map(Number);
  return new Intl.DateTimeFormat(CONFIG.locale, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: CONFIG.timeZone,
  }).format(new Date(Date.UTC(2000, 0, 1, hours + 5, minutes)));
}

export function formatTimeFromISO(iso) {
  return new Intl.DateTimeFormat(CONFIG.locale, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: CONFIG.timeZone,
  }).format(new Date(iso));
}

export function formatDateTime(iso) {
  const dateStr = isoToBogotaDate(iso);
  return `${capitalize(formatLongDate(dateStr))} · ${formatTimeFromISO(iso)}`;
}

export function relativeDayLabel(dateStr) {
  const today = todayISO();
  if (dateStr === today) return 'Hoy';
  if (dateStr === addDaysISO(today, 1)) return 'Mañana';
  return capitalize(formatShortDate(dateStr));
}
