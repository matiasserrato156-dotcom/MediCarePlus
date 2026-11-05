import '../css/main.css';
import { initNavegacion } from './modules/navegacion.js';
import { initAnimaciones } from './modules/animaciones.js';
import { initIntro } from './modules/intro.js';
import { initAgenda } from './modules/agenda.js';
import { initContacto } from './modules/contacto.js';
import { initPolitica } from './modules/politica.js';
import { initMisCitas } from './modules/mis-citas.js';
import { populateSpecialtySelects } from './modules/render.js';
import { checkTeamCoherence } from './modules/coherencia.js';

function safeInit(name, initializer) {
  try {
    initializer();
  } catch (error) {
    console.error(`[MediCare Plus] Falló la inicialización de ${name}.`, error);
  }
}

function start() {
  populateSpecialtySelects();
  safeInit('navegación', initNavegacion);
  safeInit('animaciones', initAnimaciones);
  safeInit('introducción', initIntro);
  safeInit('agenda', initAgenda);
  safeInit('contacto', initContacto);
  safeInit('política de datos', initPolitica);
  safeInit('mis citas', initMisCitas);

  if (import.meta.env.DEV) {
    checkTeamCoherence();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start, { once: true });
} else {
  start();
}
