export function normalizeWhitespace(value) {
  return String(value ?? '')
    .trim()
    .replace(/\s+/g, ' ');
}

export function onlyDigits(value) {
  return String(value ?? '').replace(/\D/g, '');
}

export function formatDocument(value) {
  const digits = onlyDigits(value);
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function maskDocument(value) {
  const digits = onlyDigits(value);
  if (!digits) return '—';
  return digits.length > 4 ? `•••• ${digits.slice(-4)}` : digits;
}

export function formatPhone(value) {
  const digits = onlyDigits(value);
  if (digits.length !== 10) return digits;
  return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
}

export function pluralize(count, singular, plural) {
  return count === 1 ? singular : plural;
}
