# Bitácora de prompts — MediCare Plus

> Registro del uso de herramientas de IA durante el proyecto.
> La guía exige al menos **3 herramientas** documentadas y sus iteraciones.

---

## 1. Cómo registrar

Cada entrada debe incluir:

| Campo | Contenido |
|---|---|
| Fecha | Día del uso |
| Herramienta | ChatGPT, Gemini, OpenCode, Ollama u OpenRouter |
| Fase | Fase del plan |
| Objetivo | Qué se quería lograr |
| Prompt | Texto o resumen fiel |
| Resultado | Qué produjo |
| Corrección | Qué se ajustó y por qué |
| Evidencia | Archivo, captura o commit |

No se registran prompts inventados ni resultados no verificados. Cuando un dato no está disponible se escribe `PENDIENTE: [qué falta]`.

---

## 2. Índice

| Fecha | Herramienta | Fase | Objetivo | Evidencia |
|---|---|---|---|---|
| 29/10/2026 | OpenCode | 0 | Inspeccionar requisitos y corregir documentación | `docs/ARQUITECTURA.md`, `docs/DECISIONES.md` |
| 29/10/2026 | OpenCode | 1 | Configurar Vite + Tailwind | `package.json`, `vite.config.js`, commit `0a475b9` |
| PENDIENTE: fecha de la sesión | ChatGPT | 0 | Redactar/ajustar System Prompt y PRD | `docs/SYSTEM-PROMPT.md`, `docs/Doc Requisitos del Producto PRD.md` |
| PENDIENTE: fecha de generación | Gemini | 2 | Generar las 5 imágenes de la landing | `docs/PROMPTS-IMAGENES.md`; imágenes PENDIENTE |
| 05/11/2026 (fecha del commit) | OpenCode | 3 | Integrar normalización de nombre | `src/js/modules/validacion.js`, `src/js/modules/agenda.js`, commit `de8a26c` |
| 06/11/2026 | OpenCode | 4 | Auditoría de accesibilidad, responsive, JS y coherencia | PENDIENTE: captura o documento de auditoría |
| 06/11/2026 | OpenCode | 4 | Corregir contraste, foco, ARIA y desborde móvil | commit `71156be` |

---

## 3. Entradas detalladas

### Entrada 001 — Diagnóstico y comparación de requisitos

- **Fecha:** 29/10/2026.
- **Herramienta:** OpenCode.
- **Fase:** 0.
- **Objetivo:** leer el PRD y la guía, revisar los documentos anteriores y detectar contradicciones.
- **Prompt (resumen):** "Inspecciona E:\MediCarePlus, lee el PRD y el PDF, revisa ARQUITECTURA.md y PLAN-DE-TRABAJO.md, y presenta una matriz de requisitos separando requisitos de propuestas."
- **Resultado:** diagnóstico con contradicciones (Hero, zona horaria, almacenamiento), omisiones (ecosistema de IA, assets de Gemini) y una matriz de requisitos.
- **Corrección:** se cambió el flujo del Hero a formulario corto + modal; se corrigió el borde de `#cbd5e1` a `#64748b`.
- **Evidencia:** `docs/DECISIONES.md`, `docs/ARQUITECTURA.md`.

### Entrada 002 — Configuración del entorno

- **Fecha:** 29/10/2026.
- **Herramienta:** OpenCode.
- **Fase:** 1.
- **Objetivo:** preparar Vite, Tailwind y la estructura mínima.
- **Prompt (resumen):** "Configura el entorno con Vite y Tailwind, crea la estructura base y verifica el build."
- **Resultado:** proyecto que arranca y compila.
- **Corrección:** PENDIENTE: correcciones aplicadas en la fase 1.
- **Evidencia:** `package.json`, `vite.config.js`, commit `0a475b9`.

### Entrada 003 — System Prompt y PRD con ChatGPT

- **Fecha:** PENDIENTE: fecha de la sesión con ChatGPT.
- **Herramienta:** ChatGPT.
- **Fase:** 0.
- **Objetivo:** redactar o ajustar el System Prompt y el PRD del proyecto.
- **Prompt (resumen):** PENDIENTE: texto o resumen exacto del prompt usado (System Prompt/PRD).
- **Resultado:** PENDIENTE: detalle de lo que devolvió ChatGPT. En el repositorio existen `docs/SYSTEM-PROMPT.md` y `docs/Doc Requisitos del Producto PRD.md`, pero no hay captura ni transcripción de la respuesta.
- **Corrección:** PENDIENTE: qué se corrigió después de la respuesta de ChatGPT.
- **Evidencia:** `docs/SYSTEM-PROMPT.md`, `docs/Doc Requisitos del Producto PRD.md`.

### Entrada 004 — Prompts de imágenes con Gemini

- **Fecha:** PENDIENTE: fecha de generación con Gemini.
- **Herramienta:** Gemini.
- **Fase:** 2.
- **Objetivo:** generar el banner del hero y los cuatro retratos del equipo.
- **Prompt (resumen):** los cinco prompts, el estilo compartido y el negative prompt están documentados en `docs/PROMPTS-IMAGENES.md`; incluyen encuadre a la altura del busto para evitar manos deformadas.
- **Resultado:** PENDIENTE: imágenes no generadas. `public/img/` y `public/img/equipo/` existen pero están vacías.
- **Corrección:** PENDIENTE: intentos y ajustes de generación (si los hubo).
- **Evidencia:** `docs/PROMPTS-IMAGENES.md`; `public/img/` vacío.

### Entrada 005 — Normalización de nombre con OpenCode

- **Fecha:** PENDIENTE: fecha exacta de la sesión (el commit de referencia es del 05/11/2026).
- **Herramienta:** OpenCode (app de escritorio).
- **Modelo:** PENDIENTE: modelo usado en esa sesión (no registrado). La sesión de auditoría y corrección usó **DeepSeek V4.1 Flash Free**.
- **Fase:** 3.
- **Objetivo:** integrar la normalización del nombre del paciente antes de guardar la cita.
- **Prompt (resumen):** PENDIENTE: texto exacto del prompt de integración.
- **Resultado:** `normalizePatient()` y `toProperName()` en `src/js/modules/validacion.js`; `agenda.js` los usa al construir el objeto `paciente` de la cita.
- **Corrección:** PENDIENTE: ajustes realizados durante la integración.
- **Evidencia:** `src/js/modules/validacion.js` (líneas 14-32), `src/js/modules/agenda.js` (línea 457), commit `de8a26c`.

### Entrada 006 — Auditoría de accesibilidad y responsive con OpenCode

- **Fecha:** 06/11/2026.
- **Herramienta:** OpenCode (app de escritorio) con el modelo **DeepSeek V4.1 Flash Free**.
- **Fase:** 4.
- **Objetivo:** auditar sin modificar `index.html`, `src/css/main.css` y `src/js/`, revisando WCAG 2.1 AA, responsive en 360/768/1280 px, errores de JavaScript, manejo de `localStorage`, fechas y coherencia con `medicos.js`.
- **Prompt (resumen):** "Auditar index.html, src/css/main.css y src/js/ sin modificar nada. Entregar un informe ordenado por gravedad. Revisar contraste, labels, aria-describedby, foco visible, orden de tabulación, cierre de diálogos con Escape y retorno del foco, un solo h1; desbordes y puntos de quiebre en 360, 768 y 1280 px; errores de consola, localStorage no disponible, fechas y zona horaria; coherencia entre index.html y medicos.js. Esperar confirmación antes de corregir."
- **Resultado:** informe con hallazgos altos (A1-A3), medios (M1-M7) y bajos (B1-B10). Se verificó con navegador, mediciones de layout y Lighthouse; el informe no se guardó como archivo en el repositorio.
- **Corrección:** se confirmó la auditoría y se corrigieron únicamente A1-A3, M1-M7, B1, B2 y B9 (ver entrada 007).
- **Evidencia:** PENDIENTE: captura o documento de auditoría; resultados aplicados en el commit `71156be`.

### Entrada 007 — Correcciones de contraste, foco, ARIA y desborde móvil

- **Fecha:** 06/11/2026.
- **Herramienta:** OpenCode (app de escritorio) con el modelo **DeepSeek V4.1 Flash Free**.
- **Fase:** 4.
- **Objetivo:** corregir en tres lotes los hallazgos confirmados, sin tocar la lógica de citas ni hacer commit/push.
- **Prompt (resumen):** "Corrige solo lo listado, en orden y por lotes. Lote 1: desborde del hero por debajo de 376 px y contraste de `.contact-label`, `::placeholder`, `.quote-stars`, `.slot.is-selected small` y `.contact-lead`. Lote 2: foco de inputs/selects/textareas, error fuera del nombre accesible, `role="img"` en `.quote-stars` y `tabindex="-1"` en `<main>`. Lote 3: unificar la ventana a `CONFIG.maxDaysAhead`, corregir dt/dd y evitar que `closeDialog()` restaure el foco si el diálogo no estaba abierto. Ejecutar `npm run build` al terminar cada lote."
- **Resultado:** cambios en `index.html`, `src/css/main.css`, `src/js/modules/agenda.js`, `src/js/modules/disponibilidad.js` y `src/js/modules/modal.js`. Los tres builds pasaron y Lighthouse quedó en 1.0 en accesibilidad, buenas prácticas y SEO.
- **Corrección:** se limitó a A1-A3, M1-M7, B1, B2 y B9; B3-B8 y B10 quedaron sin tocar. Contrastes nuevos: `.contact-label` 4,68:1 (peor caso), placeholder 4,85:1, `.quote-stars` 5,41:1, `.slot.is-selected small` 4,59:1 y `.contact-lead` 4,68:1 (peor caso).
- **Evidencia:** commit `71156be` (registrado en el repositorio; esta sesión no hizo commit ni push); `index.html`, `src/css/main.css`, `src/js/modules/agenda.js`, `src/js/modules/disponibilidad.js`, `src/js/modules/modal.js`.

---

## 4. Pendientes de registrar

- **ChatGPT:** prompt exacto, respuesta obtenida y correcciones aplicadas.
- **Gemini:** fecha, intentos, imágenes generadas y ajustes. Los prompts ya están en `docs/PROMPTS-IMAGENES.md`.
- **OpenCode:** fechas exactas y prompts de las sesiones de normalización de nombre y auditoría.
- **Auditoría:** guardar el informe o una captura en `docs/evidencias/capturas/`.
- **Ollama / OpenRouter / Cursor:** no utilizados; si se usan, registrar modelo y configuración, **sin claves**.

---

## 5. Herramientas utilizadas

| Herramienta | ¿Usada? | Modelo / uso | Evidencia |
|---|---|---|---|
| OpenCode | Sí | App de escritorio. DeepSeek V4.1 Flash Free en auditoría y correcciones; modelo de la sesión de normalización PENDIENTE | Commits `de8a26c` y `71156be` |
| ChatGPT | Sí | System Prompt y PRD; detalles PENDIENTE | `docs/SYSTEM-PROMPT.md`, `docs/Doc Requisitos del Producto PRD.md` |
| Gemini | Parcial | Prompts de las 5 imágenes documentados; generación PENDIENTE | `docs/PROMPTS-IMAGENES.md` |
| Cursor | No | No utilizado | — |
| Ollama | No | No utilizado | — |
| OpenRouter | No | No utilizado | — |

> La rúbrica exige al menos 3 herramientas. OpenCode, ChatGPT y Gemini están documentadas; faltan las evidencias marcadas como PENDIENTE.

---

## 6. Commits reales (evidencia)

Salida de `git log --oneline` al 06/11/2026:

| Commit | Fecha | Mensaje |
|---|---|---|
| `71156be` | 2026-11-06 | fix: corrige desborde móvil, contraste y accesibilidad de foco y ARIA |
| `5d8b112` | 2026-11-05 | docs: agrega PRD, guía y documentación del proyecto |
| `72d6143` | 2026-11-05 | feat: conecta los módulos en el punto de entrada |
| `e30cbcc` | 2026-11-05 | feat: agrega contacto, política de datos y consulta de citas |
| `de8a26c` | 2026-11-05 | feat: implementa el flujo de agendamiento y las validaciones |
| `9407778` | 2026-11-05 | feat: implementa disponibilidad y almacenamiento de citas |
| `c51085c` | 2026-11-05 | feat: implementa diálogos, navegación e introducción |
| `4b26025` | 2026-11-05 | feat: agrega catálogos médicos y utilidades de fechas y formato |
| `d26c3cc` | 2026-11-05 | feat: agrega estructura semántica y estilos de la landing |
| `0a475b9` | 2026-11-05 | chore: configura Vite, Tailwind y Node 22 |
