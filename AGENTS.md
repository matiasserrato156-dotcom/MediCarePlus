# AGENTS.md — MediCare Plus



Landing académica de agendamiento de citas médicas (ADSO, SENA). Datos ficticios: no es un sistema clínico real.



## Stack y estructura

- HTML5 semántico, Tailwind CSS 4, JavaScript Vanilla con módulos ES, Vite 8, Node 22 (`.nvmrc`).

- `index.html` (estructura), `src/css/main.css` (estilos), `src/js/` (`main.js`, `config.js`, `data/`, `modules/`, `utils/`).

- Catálogos en `src/js/data/`. El HTML y `medicos.js` deben coincidir (lo verifica `modules/coherencia.js`).

- Documentación en `docs/`. Imágenes en `public/img/` (pendientes).



## Comandos

- `npm install` · `npm run dev` · `npm run build`



## Convenciones

- Textos de la interfaz en español. Colores de marca: azul `#0284c7`, verde `#10b981`.

- Un módulo por responsabilidad en `src/js/modules/`.

- Accesibilidad WCAG 2.1 AA: labels asociados, `aria-describedby` en errores, foco visible, contraste ≥ 4,5:1.



## Reglas de dominio / trampas conocidas

- Las citas se guardan en `localStorage` (`medicareplus.citas.v1`) con el contrato JSON del PRD: `idCita` (MED-AAAA-NNN), `paciente`, `servicio`, `fechaHora`, `estado`.

- Fechas en zona America/Bogotá (-05:00): usa `utils/fechas.js`, no `new Date("AAAA-MM-DD")`.

- No reintroducir el desborde del hero en pantallas < 376 px (`.hero-art`: `aspect-ratio` + `min-height`).



## Forma de trabajar

- Antes de editar: `git log --oneline -1` debe coincidir con `origin/main`. No trabajar en copias antiguas.

- Tareas grandes: primero modo Plan. Cambios pequeños; no reescribas lo que ya funciona.

- No hagas commit ni push: lo hace el usuario. Al terminar, resume archivos cambiados y decisiones.



## Límites

- ✅ Siempre: ejecutar `npm run build`, mantener textos en español, actualizar `MEMORY.md` al terminar.

- ⚠️ Pregunta antes: dependencias nuevas, archivos nuevos, cambios en el formato de las citas.

- 🚫 Nunca: claves de API en el repo, imágenes sacadas de internet, datos reales de pacientes, renombrar archivos sin pedirlo.



## Memoria

- Al empezar, lee `MEMORY.md`. Al terminar, actualízalo (máx. \~50 líneas, sin datos sensibles).



## Verificación

- `npm run build` sin errores. En el navegador: agendar una cita, enviar formularios vacíos (deben mostrar errores) y revisar 360 px.

