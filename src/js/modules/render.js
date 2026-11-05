import { ESPECIALIDADES } from '../data/especialidades.js';

/** Puebla los selectores de especialidad desde el catálogo único. */
export function populateSpecialtySelects(root = document) {
  root.querySelectorAll('[data-specialty-select]').forEach((select) => {
    const selected = select.value;
    select.replaceChildren(new Option('Selecciona una especialidad', ''));

    for (const especialidad of ESPECIALIDADES) {
      select.add(new Option(especialidad.nombre, especialidad.id));
    }

    if (selected) select.value = selected;
  });
}
