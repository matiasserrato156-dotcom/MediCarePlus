# Plan de trabajo — MediCare Plus

> Documento actualizado en la **Fase 0** (29 de octubre de 2026).
> Ningún comando de instalación, build o Git ha sido ejecutado.
> Regla: no se avanza de fase sin revisar y aprobar la anterior.

---

## 0. Punto de partida real

| Elemento | Estado |
|---|---|
| PRD y guía | Leídos; son la fuente de verdad |
| `ARQUITECTURA.md` | Actualizado en Fase 0 |
| `DECISIONES.md` | Creado en Fase 0 |
| `package.json` | Genérico, sin dependencias útiles |
| `index.html`, `src/`, `public/` | No existen |
| `node_modules/` | No existe |
| Repositorio Git | No inicializado |
| Código de la aplicación | No escrito |

---

## 1. Resumen de fases

| Fase | Objetivo | Entregable | Estado |
|---|---|---|---|
| 0 | Resolver decisiones y corregir documentación | `DECISIONES.md`, docs coherentes | ✅ Documentada |
| 1 | Preparar entorno y repositorio | Proyecto Vite + Tailwind que arranca | ⏳ Pendiente |
| 2 | Generar identidad visual con Gemini | Logo, banner, retratos y renders | ⏳ Pendiente |
| 3 | Construir HTML semántico y diseño responsive | Landing maquetada | ⏳ Pendiente |
| 4 | Implementar lógica de citas y almacenamiento | Módulos de datos y validación | ⏳ Pendiente |
| 5 | Integrar modal accesible y flujo completo | Agendamiento funcional | ⏳ Pendiente |
| 6 | Completar contacto, navegación y contenido legal | Secciones restantes | ⏳ Pendiente |
| 7 | Probar, desplegar y documentar | Demo pública + informe | ⏳ Pendiente |

---

## 2. Fase 0 — Decisiones y línea base

**Qué se hizo:** se separaron requisitos de propuestas, se registraron D1–D5 y D17, y se corrigieron las afirmaciones de "aprobado" que no correspondían.

**Para qué sirve:** evitar construir el Hero y el modelo de datos con decisiones equivocadas.

**Archivos:** `docs/DECISIONES.md`, `docs/ARQUITECTURA.md`, `docs/PLAN-DE-TRABAJO.md`.

**Qué aprenderé:** diferencia entre requisito, interpretación, decisión y propuesta; trazabilidad.

**Cómo se comprueba:** cada decisión tiene fuente, alternativa descartada y justificación; las pendientes tienen fase asignada.

**Evidencia:** este plan y el registro de decisiones.

---

## 3. Fase 1 — Entorno y repositorio

**Qué haremos:** verificar herramientas, actualizar `package.json`, instalar Vite y Tailwind, crear la estructura mínima y hacer el primer commit.

**Para qué sirve:** tener un proyecto reproducible y un historial académico desde el inicio.

**Archivos:**
- `package.json` (modificar).
- `vite.config.js`, `index.html`, `src/css/main.css`, `src/js/main.js` (crear).
- `.gitignore`, `README.md` (crear).
- `docs/SYSTEM-PROMPT.md`, `docs/BITACORA-PROMPTS.md` (crear).

**Qué aprenderé:** npm, Vite, Tailwind 4, módulos ES, build y commits descriptivos.

**Comandos previstos (no ejecutados aún):**

```powershell
node --version
npm --version
git --version

npm install -D vite@8.3.5 tailwindcss@4.3.3 @tailwindcss/vite@4.3.3
```

Si D18 se aprueba:

```powershell
npm install -D @tailwindcss/forms@0.5.11
```

`package.json` propuesto:

```json
{
  "name": "medicareplus",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "description": "Landing page de agendamiento de citas médicas — proyecto académico ADSO",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

Arranque y build:

```powershell
npm run dev
npm run build
npm run preview
```

Git (solo con autorización):

```powershell
git init
git add .
git commit -m "chore: configura entorno Vite y Tailwind"
```

**Cómo se comprueba:**
- `npm run dev` sirve la página en `http://localhost:5173/`.
- `npm run build` genera `dist/` sin errores.
- `npm run preview` sirve el build en `http://localhost:4173/`.
- `git log --oneline` muestra el commit inicial.

**Evidencia:** salida de terminal, captura del navegador y primer commit.

---

## 4. Fase 2 — Identidad visual y activos con Gemini

**Qué haremos:** generar logo, banner, retratos de doctores y renders de servicios. Mientras llegan, usar SVG temporales con las dimensiones finales.

**Para qué sirve:** cumplir los entregables gráficos y la rúbrica de "activos visuales coherentes".

**Archivos:**
- `public/img/logo.svg` o `.png`.
- `public/img/hero-clinica.*`.
- `public/img/equipo/*`.
- `public/img/servicios/*`.
- `public/img/especialidades/*.svg`.
- `docs/BITACORA-PROMPTS.md` (registro de prompts de Gemini).

**Qué aprenderé:** prompts visuales, encuadre, iluminación, formatos, optimización y texto alternativo.

**Cómo se comprueba:** todas las imágenes cargan; tienen `alt`, `width`, `height` y un peso razonable; los prompts están registrados.

**Evidencia:** imágenes finales, capturas y bitácora con los prompts.

**Decisión pendiente:** D10 (quién genera los assets y cómo se evidencia).

---

## 5. Fase 3 — HTML semántico y diseño responsive

**Qué haremos:** construir navbar, Hero con formulario corto, especialidades, equipo, testimonios, contacto, footer y el esqueleto del modal.

**Para qué sirve:** tener estructura y diseño antes de añadir lógica.

**Archivos:** `index.html`, `src/css/main.css`, `src/js/data/*.js`, `src/js/modules/render.js` (si D12 lo aprueba).

**Qué aprenderé:** HTML semántico, landmarks, Tailwind, grid/flex, mobile-first, foco visible y contraste.

**Cómo se comprueba:**
- Revisión en 320, 375, 768, 1024 y 1440 px.
- Un solo `<h1>`; landmarks correctos.
- Contraste según `ARQUITECTURA.md`.
- Navegación con `Tab` y enlace de salto.

**Evidencia:** capturas, validador W3C y commit de la fase.

**Decisiones pendientes:** D8, D9, D12, D16. D17 ya está decidida y se implementa en esta fase.

---

## 6. Fase 4 — Lógica de citas y almacenamiento

**Qué haremos:** implementar fechas, IDs, almacenamiento, franjas, validaciones y asignación de médico.

**Para qué sirve:** que el agendamiento funcione con datos reales del formulario.

**Archivos:** `src/js/utils/fechas.js`, `id.js`, `src/js/modules/almacenamiento.js`, `disponibilidad.js`, `validacion.js`, `agenda.js`, `config.js`.

**Qué aprenderé:** módulos ES, funciones puras, `Date`/`Intl`, `localStorage`, validación y manejo de errores.

**Cómo se comprueba:**
- 09:30 Bogotá se guarda como `14:30:00.000Z`.
- El array contiene varias citas y no se pierde al recargar.
- Una franja ocupada no se repite con el mismo médico.
- Los IDs siguen el formato `MED-AAAA-NNN`.
- Las validaciones bloquean datos incorrectos.

**Evidencia:** registro de pruebas, captura de `localStorage` y commit.

**Decisiones pendientes:** D6, D13.

---

## 7. Fase 5 — Modal accesible y flujo completo

**Qué haremos:** integrar el formulario del Hero con el modal, el foco atrapado, `Esc`, el retorno de foco, los errores y la confirmación.

**Para qué sirve:** cumplir el requisito central del PRD y la accesibilidad de la guía.

**Archivos:** `src/js/modules/modal.js`, `agenda.js`, `index.html`, `src/css/main.css`.

**Qué aprenderé:** manejo de foco, ARIA, diálogos nativos o personalizados, prevención de errores.

**Cómo se comprueba:**
- El formulario del Hero abre el modal con especialidad y fecha.
- El modal se cierra con `Esc` y devuelve el foco.
- `Tab` no escapa del diálogo.
- Los errores se anuncian y el foco va al primero.
- La confirmación muestra el resumen correcto.

**Evidencia:** informe de pruebas T-04 a T-20, capturas y, si es posible, un video corto.

**Decisión pendiente:** D11.

---

## 8. Fase 6 — Contacto, navegación y contenido institucional

**Qué haremos:** validar el contacto, simular el envío, implementar el menú móvil, el desplazamiento suave, la política de datos, las credenciales y la geolocalización.

**Para qué sirve:** cerrar las secciones de la guía y el footer del PRD.

**Archivos:** `src/js/modules/contacto.js`, `navegacion.js`, `index.html`, `src/css/main.css`.

**Qué aprenderé:** formularios, eventos, UX, contenido legal simulado y mapas estáticos.

**Cómo se comprueba:**
- El contacto bloquea datos inválidos y aclara que el envío es simulado.
- El menú móvil funciona con teclado y `Esc`.
- El enlace legal abre contenido comprensible.
- La ubicación y los horarios son visibles.

**Evidencia:** pruebas T-21 a T-23, T-32 y T-33; capturas.

**Decisiones pendientes:** D7, D8, D9, D15, D16.

---

## 9. Fase 7 — Pruebas, despliegue y sustentación

**Qué haremos:** ejecutar la matriz completa, pasar axe/Lighthouse/W3C, compilar, publicar, completar README, bitácora, System Prompt e informe.

**Para qué sirve:** demostrar que el proyecto funciona y que las decisiones están documentadas.

**Archivos:** `docs/INFORME-PRUEBAS.md`, `docs/BITACORA-PROMPTS.md`, `docs/SYSTEM-PROMPT.md`, `README.md`, `vite.config.js`.

**Qué aprenderé:** QA, WCAG, despliegue estático y defensa técnica.

**Cómo se comprueba:**
- La URL pública carga y agenda.
- La matriz está diligenciada con fecha, navegador y resultado.
- El build no tiene errores.
- Otra persona puede ejecutar el proyecto siguiendo el README.

**Evidencia:** informe, URL, repositorio, capturas y commits.

**Decisiones pendientes:** D14, D19.

---

## 10. Matriz de pruebas

| ID | Prueba | Cómo se comprueba | Resultado esperado |
|---|---|---|---|
| T-01 | Navegación por teclado | Recorrer con `Tab` desde el inicio | Orden lógico y foco visible |
| T-02 | Enlace de salto | `Tab` una vez y `Enter` | El foco va a `main` |
| T-03 | Menú móvil | Ancho < 640 px, abrir y cerrar | `aria-expanded` cambia; se cierra con `Esc` |
| T-04 | Formulario del Hero | Elegir especialidad y fecha; enviar | Valida y abre el modal con esos datos |
| T-05 | Modal precargado | Revisar los valores del modal | Especialidad y fecha coinciden con el Hero |
| T-06 | Apertura del modal | Pulsar "Agendar cita" | Se abre y el foco entra |
| T-07 | Cierre del modal | `Esc` y botón cerrar | Se cierra y el foco vuelve al origen |
| T-08 | Foco atrapado | `Tab` repetido | El foco no sale del diálogo |
| T-09 | Validación vacía | Enviar sin datos | Errores claros y foco en el primero |
| T-10 | Documento inválido | Letras o 3 dígitos | Mensaje específico |
| T-11 | Teléfono inválido | 8 dígitos | Mensaje específico |
| T-12 | Correo inválido | `ana@` | Mensaje específico |
| T-13 | Fecha pasada | Elegir ayer | Rechazo con mensaje |
| T-14 | Domingo | Elegir domingo | Sin franjas y mensaje informativo |
| T-15 | Franjas de un día hábil | Abrir un lunes | 16 franjas de 30 min |
| T-16 | Doble reserva | Reservar y repetir la hora | La franja se rechaza o desaparece |
| T-17 | Persistencia | Reservar y recargar | La cita sigue en `localStorage` |
| T-18 | Formato del ID | Revisar el array guardado | `MED-2026-001`, `002`, … |
| T-19 | Zona horaria | Reservar 09:30 y revisar el ISO | `14:30:00.000Z` |
| T-20 | Confirmación | Reservar con datos válidos | Resumen correcto y anuncio accesible |
| T-21 | Contacto inválido | Enviar vacío o con correo malo | Errores y foco |
| T-22 | Contacto válido | Enviar datos correctos | Éxito simulado con aviso claro |
| T-23 | Movimiento reducido | Activar la preferencia del sistema | Sin animaciones molestas |
| T-24 | Zoom 200 % | Ampliar el navegador | Sin pérdida de contenido |
| T-25 | Reflujo 320 px | Vista responsive | Sin desplazamiento horizontal |
| T-26 | Lector de pantalla | NVDA + navegador, si está disponible | Anuncios y etiquetas comprensibles |
| T-27 | HTML válido | Validador W3C | Sin errores de anidación |
| T-28 | Lighthouse | Auditoría en Chrome | Accesibilidad y buenas prácticas ≥ 90 (objetivo) |
| T-29 | Build | `npm run build` y `npm run preview` | Igual que en desarrollo |
| T-30 | Demo | Abrir la URL publicada | Carga y agenda correctamente |
| T-31 | Imágenes | Revisar `alt`, `width` y `height` | Todas cumplen |
| T-32 | Enlace legal | Pulsar la política de datos | Abre contenido comprensible |
| T-33 | Geolocalización | Revisar el footer | Ubicación visible y coherente |
| T-34 | Evidencia de IA | Revisar la bitácora | Al menos 3 herramientas documentadas |
| T-35 | Contenedor de citas | Inspeccionar `localStorage` | Un array con varias citas |

> Las pruebas se ejecutarán realmente en la Fase 7 y se registrarán con fecha, navegador y resultado. No se reportarán como aprobadas antes de ejecutarlas.

---

## 11. Evidencias para la entrega

1. `docs/SYSTEM-PROMPT.md`: rol, stack, paleta y secciones.
2. `docs/BITACORA-PROMPTS.md`: fecha, herramienta, prompt, resultado, corrección.
3. `docs/INFORME-PRUEBAS.md`: matriz T-01 a T-35 diligenciada.
4. `docs/evidencias/capturas/`: móvil, escritorio, modal y `localStorage`.
5. Repositorio Git con commits descriptivos.
6. `README.md` con instalación, ejecución y despliegue.
7. URL pública de la demo.
8. Assets de Gemini y sus prompts.

---

## 12. Riesgos del plan

| Riesgo | Cuándo se detecta | Respuesta |
|---|---|---|
| Tailwind 4 difiere de tutoriales | Fase 1 | Documentación oficial de la versión |
| `@tailwindcss/forms` incompatible | Fase 1 | Omitirlo y estilizar manualmente |
| Assets de Gemini no llegan | Fase 2 | SVG temporales; generar antes de la entrega |
| `localStorage` bloqueado | Fase 4 | Aviso claro; la app sigue funcionando |
| Desfase horario | Fase 4 | Prueba T-19 obligatoria |
| El ejemplo del PRD cae en domingo | Fase 4 | Documentado; no se usa como cita real |
| El modal no atrapa el foco | Fase 5 | Prueba T-08 |
| GitHub Pages rompe rutas | Fase 7 | Configurar `base` en `vite.config.js` |
| Fuga de API keys | Todas | `.gitignore` y revisión antes de cada commit |
| Tiempo insuficiente | Fases 3–7 | Priorizar requisitos y aprobar cada fase |

---

## 13. Aprobaciones pendientes

| ID | Tema | Fase |
|---|---|---|
| D6 | Asignación de médico | 4 |
| D7 | Comportamiento del contacto | 6 |
| D8 | Método de geolocalización | 3 |
| D9 | Significado de credenciales | 3 |
| D10 | Assets de Gemini y evidencia | 2 |
| D11 | `<dialog>` nativo o personalizado | 5 |
| D12 | Contenido estático o renderizado por JS | 3 |
| D13 | Granularidad y nombres de módulos | 4 |
| D14 | Plataforma de despliegue | 7 |
| D15 | Texto de la política de datos | 6 |
| D16 | Datos ficticios de contenido | 3 |
| D18 | Uso de `@tailwindcss/forms` | 1 |
| D19 | Meta de Lighthouse | 7 |
| D20 | Versiones exactas | 1 |

**Cerradas:** D1, D2, D3, D4, D5 y D17.

---

## 14. Definición de "terminado"

- [ ] El Hero tiene formulario corto y abre el modal con datos.
- [ ] Las secciones del PRD y la guía están implementadas.
- [ ] El flujo de citas valida, asigna médico y persiste en `localStorage`.
- [ ] Las fechas se guardan en UTC y se muestran en Bogotá.
- [ ] La matriz de pruebas está ejecutada y registrada.
- [ ] No hay errores críticos de accesibilidad.
- [ ] El build de producción funciona.
- [ ] La demo está publicada.
- [ ] El repositorio tiene historial, README y bitácora.
- [ ] Se usaron al menos 3 herramientas de IA con evidencia.
- [ ] Los assets de Gemini están en la entrega.

---

*Documento actualizado en Fase 0. No se ejecutaron comandos de instalación, build ni Git; no se escribió código de la aplicación.*
