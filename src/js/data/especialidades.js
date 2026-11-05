/**
 * Catálogo único de especialidades.
 * El nombre visible se usa también en el contrato de datos de la cita.
 */
export const ESPECIALIDADES = Object.freeze([
  {
    id: 'medicina-general',
    nombre: 'Medicina general',
    resumen: 'Revisión integral y orientación para tu día a día.',
    descripcion:
      'Un primer espacio para revisar tu salud, resolver inquietudes y recibir orientación integral.',
    duracion: 30,
    tono: 'blue',
    beneficios: ['Chequeo general', 'Orientación preventiva'],
  },
  {
    id: 'pediatria',
    nombre: 'Pediatría',
    resumen: 'Acompañamiento atento para niñas, niños y familias.',
    descripcion:
      'Acompañamiento atento para el crecimiento y bienestar de niñas, niños y sus familias.',
    duracion: 30,
    tono: 'peach',
    beneficios: ['Control del crecimiento', 'Guía para familias'],
  },
  {
    id: 'cardiologia',
    nombre: 'Cardiología',
    resumen: 'Prevención y cuidado para la salud de tu corazón.',
    descripcion:
      'Prevención y orientación especializada para cuidar la salud de tu corazón.',
    duracion: 30,
    tono: 'lilac',
    beneficios: ['Prevención cardiovascular', 'Hábitos saludables'],
  },
  {
    id: 'odontologia',
    nombre: 'Odontología',
    resumen: 'Cuidado oral preventivo para sonreír tranquilo.',
    descripcion:
      'Cuidado oral preventivo y atención pensada para que sonrías con tranquilidad.',
    duracion: 30,
    tono: 'mint',
    beneficios: ['Higiene oral', 'Prevención dental'],
  },
]);

export function getEspecialidad(id) {
  return ESPECIALIDADES.find((especialidad) => especialidad.id === id) ?? null;
}

export function getEspecialidadPorNombre(nombre) {
  const normalizado = String(nombre ?? '').trim().toLowerCase();
  return (
    ESPECIALIDADES.find(
      (especialidad) => especialidad.nombre.toLowerCase() === normalizado,
    ) ?? null
  );
}
