/**
 * Configuración central de MediCare Plus.
 * Cambiar aquí horarios, duración o límites no requiere tocar la lógica.
 */
export const CONFIG = Object.freeze({
  storageKey: 'medicareplus.citas.v1',
  introKey: 'medicareplus.intro.v1',
  locale: 'es-CO',
  timeZone: 'America/Bogota',
  slotMinutes: 30,
  maxDaysAhead: 90,
  brand: {
    name: 'MediCare Plus',
    tagline: 'Cuidado cercano, claro y humano.',
  },
  contact: {
    telefono: '+57 601 742 8800',
    correo: 'hola@medicareplus.demo',
    direccion: 'Calle 45 # 12-30, Chapinero, Bogotá',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Chapinero+Bogota',
  },
  /** 0 = domingo … 6 = sábado. Cada rango se divide en franjas de 30 minutos. */
  schedule: {
    0: [],
    1: [
      { start: '08:00', end: '12:00' },
      { start: '14:00', end: '18:00' },
    ],
    2: [
      { start: '08:00', end: '12:00' },
      { start: '14:00', end: '18:00' },
    ],
    3: [
      { start: '08:00', end: '12:00' },
      { start: '14:00', end: '18:00' },
    ],
    4: [
      { start: '08:00', end: '12:00' },
      { start: '14:00', end: '18:00' },
    ],
    5: [
      { start: '08:00', end: '12:00' },
      { start: '14:00', end: '18:00' },
    ],
    6: [{ start: '08:00', end: '12:00' }],
  },
});
