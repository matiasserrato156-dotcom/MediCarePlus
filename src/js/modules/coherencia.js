import { MEDICOS } from '../data/medicos.js';

/**
 * T-36: comprueba que las tarjetas visibles del directorio coincidan con
 * medicos.js (id, nombre, especialidad, registro y horario).
 * Solo se ejecuta en desarrollo para no ensuciar la consola de producción.
 */
export function checkTeamCoherence() {
  const cards = [...document.querySelectorAll('[data-medico-id]')];
  const byId = new Map(MEDICOS.map((medico) => [medico.id, medico]));
  const seen = new Set();

  for (const card of cards) {
    const id = card.dataset.medicoId;
    const medico = byId.get(id);

    if (!medico) {
      console.warn(`[coherencia] La tarjeta "${id}" no existe en medicos.js.`);
      continue;
    }

    seen.add(id);

    const checks = [
      ['nombre', medico.nombre, card.querySelector('[data-medico-nombre]')?.textContent],
      ['especialidad', medico.especialidad, card.querySelector('[data-medico-especialidad]')?.textContent],
      ['registro', medico.registro, card.querySelector('[data-medico-registro]')?.textContent],
      ['horario', medico.horario, card.querySelector('[data-medico-horario]')?.textContent],
    ];

    for (const [label, expected, actual] of checks) {
      if (actual?.trim() !== expected) {
        console.warn(
          `[coherencia] ${id}: ${label} visible "${actual?.trim()}" ≠ catálogo "${expected}".`,
        );
      }
    }
  }

  for (const medico of MEDICOS) {
    if (!seen.has(medico.id)) {
      console.warn(`[coherencia] Falta la tarjeta de ${medico.id} en index.html.`);
    }
  }
}
