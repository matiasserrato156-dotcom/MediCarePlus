/**
 * Fuente de verdad del directorio médico (perfiles ficticios).
 * Las tarjetas de index.html llevan data-medico-id y deben coincidir
 * textualmente con este catálogo. La prueba de coherencia lo verifica.
 */
export const MEDICOS = Object.freeze([
  {
    id: 'valentina-rios',
    nombre: 'Dra. Valentina Ríos',
    especialidadId: 'medicina-general',
    especialidad: 'Medicina general',
    registro: 'RM 105842',
    habilitacion: 'HAB-2026-0142',
    horario: 'Lun–Vie · 8:00 a. m. – 12:00 m.',
    bio: 'Perfil ficticio de demostración. Enfoque en prevención y cuidado integral.',
  },
  {
    id: 'mateo-salazar',
    nombre: 'Dr. Mateo Salazar',
    especialidadId: 'pediatria',
    especialidad: 'Pediatría',
    registro: 'RM 098415',
    habilitacion: 'HAB-2026-0087',
    horario: 'Lun–Vie · 2:00 – 6:00 p. m.',
    bio: 'Perfil ficticio de demostración. Acompañamiento cálido a familias.',
  },
  {
    id: 'camila-torres',
    nombre: 'Dra. Camila Torres',
    especialidadId: 'cardiologia',
    especialidad: 'Cardiología',
    registro: 'RM 112376',
    habilitacion: 'HAB-2026-0219',
    horario: 'Lun–Sáb · 8:00 a. m. – 12:00 m.',
    bio: 'Perfil ficticio de demostración. Promoción de hábitos para el corazón.',
  },
  {
    id: 'nicolas-vega',
    nombre: 'Dr. Nicolás Vega',
    especialidadId: 'odontologia',
    especialidad: 'Odontología',
    registro: 'RM 087540',
    habilitacion: 'HAB-2026-0034',
    horario: 'Lun–Vie · 8:00 a. m. – 12:00 m.',
    bio: 'Perfil ficticio de demostración. Cuidado oral con atención cercana.',
  },
]);

export function getMedicosPorEspecialidad(especialidadId) {
  return MEDICOS.filter((medico) => medico.especialidadId === especialidadId);
}

export function getMedicoPorNombre(nombre) {
  return MEDICOS.find((medico) => medico.nombre === nombre) ?? null;
}
