# Arquitectura — MediCare Plus

> Documento actualizado en la **Fase 0** (29 de octubre de 2026).
> **Prioridad de fuentes:** PRD y guía académica > este documento.
> Etiquetas usadas:
> - **[REQ]** requisito explícito de una fuente.
> - **[DEC]** decisión aprobada por el estudiante.
> - **[PROP]** propuesta técnica que aún requiere aprobación.
> - **[LÍMITE]** limitación conocida del alcance.

---

## 1. Estado del proyecto

| Elemento | Estado |
|---|---|
| Código de la aplicación | Solo los archivos base de la Fase 1; sin lógica de negocio |
| `index.html`, `vite.config.js`, `src/css/main.css`, `src/js/main.js`, `.gitignore`, `README.md` | Existen (creados el 29/10/2026) |
| `src/js/data/`, `src/js/modules/`, `src/js/utils/`, `public/` | No existen todavía |
| Dependencias | Instalación **incompleta y no verificada**: no hay `package-lock.json` y `node_modules/` quedó parcial |
| `npm run dev` / `npm run build` | **No ejecutados**; no hay evidencia de que funcionen |
| Repositorio Git | No inicializado |
| Documentación | PRD, guía, este documento, plan, decisiones, System Prompt y bitácora |
| Fase actual | Fase 0 lista para cierre documental; Fase 1 **en curso** y pendiente de reinstalar y verificar |

Este documento **no reemplaza** al PRD ni a la guía. Si hay conflicto, mandan los documentos originales.

---

## 2. Alcance

La guía y el PRD piden secciones distintas. Se adopta la unión porque el propio navbar del PRD menciona Testimonios y Contacto (PRD, línea 9), aunque el mapa del sitio no los desarrolle.

| Sección | Fuente | Estado |
|---|---|---|
| Header / Navbar con logo, enlaces y CTA | PRD §2.1 + Guía p. 3 | Confirmado |
| Hero con titular, subtexto, métricas e imagen | PRD §2.2 | Confirmado |
| **Formulario rápido en el Hero** | Guía p. 3, consigna 2 | **Decisión D1: formulario corto + modal** |
| Grid de 4 especialidades | PRD §2.3 + Guía p. 3 | Confirmado |
| Directorio médico | PRD §2.4 | Confirmado |
| Testimonios | Guía p. 3 + PRD línea 9 | Confirmado |
| Credenciales médicas | Guía p. 3 | **Pendiente D9** |
| Modal de agendamiento | PRD §2.5 + Guía p. 4 | Confirmado |
| Formulario de contacto | Guía p. 3 | Confirmado; comportamiento pendiente D7 |
| Footer con horarios, dirección y geolocalización | PRD §2.6 + Guía p. 3 | Horarios D2; geolocalización pendiente D8 |
| Política de tratamiento de datos | PRD §2.6 | Contenido pendiente D15 |

**Flujo de citas aprobado (D1):** el Hero tiene un formulario corto con especialidad y fecha. Al enviarlo, se abre el modal con esos datos precargados; el usuario elige la franja, completa sus datos y confirma. Los botones "Agendar cita" del navbar y de las tarjetas también abren el modal.

---

## 3. Decisiones vigentes

| ID | Tema | Decisión | Fuente |
|---|---|---|---|
| D1 | Formulario del Hero | Formulario corto (especialidad + fecha) que abre el modal precargado | Guía p. 3; el PRD no lo exige |
| D2 | Disponibilidad | L–V 08:00–12:00 y 14:00–18:00; sábado 08:00–12:00; domingo cerrado; 30 min; hasta 90 días | Propuesta aprobada; las fuentes no la definen |
| D3 | Validaciones | Reglas de la sección 12 | Propuesta aprobada; las fuentes solo nombran los campos |
| D4 | Zona horaria | Guardar UTC real; mostrar en `America/Bogota` | Decisión técnica; el PRD solo muestra un ejemplo |
| D5 | Almacenamiento | Array bajo `medicareplus.citas.v1` | Decisión técnica; el PRD muestra una cita, no una lista |
| D12 | Renderizado | Secciones institucionales **estáticas en HTML**; JavaScript solo para modal, disponibilidad, validación, almacenamiento, IDs y navegación | Decisión de implementación; ninguna fuente exige renderizado por JS |
| D17 | Borde de campos | `#64748b` (4,76:1 sobre blanco) | Corrección de accesibilidad; WCAG 1.4.11; no es un requisito de las fuentes |

El detalle completo, las alternativas descartadas y las decisiones pendientes están en `docs/DECISIONES.md`.

---

## 4. Stack y versiones

| Elemento | Elección | Origen |
|---|---|---|
| HTML | HTML5 semántico | Guía p. 3 |
| CSS | Tailwind CSS | Guía p. 3 |
| JavaScript | Vanilla JS con módulos ES | Guía p. 3 |
| Entorno | Node.js + Vite | Guía p. 3 (permite CDN o Vite) |
| Persistencia | `localStorage` | PRD §2.5 |
| Control de versiones | Git + GitHub | Guía p. 5 |
| Framework adicional | Ninguno | Restricción del proyecto |

### Versiones detectadas en el entorno

| Herramienta | Versión | Estado real |
|---|---|---|
| Node.js | `22.19.0` | Detectada con `node --version` |
| npm | `10.9.3` | Detectada con `npm --version` |
| Git | `2.56.0` | Detectada con `git --version` |
| Vite | `8.3.5` (motor: Node `^20.19.0 \|\| >=22.12.0`) | Consultada en el registro; **no instalada**: falta `node_modules/vite/package.json` |
| Tailwind CSS | `4.3.3` | Extraída parcialmente en `node_modules/tailwindcss` |
| `@tailwindcss/vite` | `4.3.3` | Extraída parcialmente; instalación sin terminar |

**Compatibilidad:** Node `22.19.0` cumple el rango declarado por Vite `8.3.5`. Tailwind `4.3.3` y `@tailwindcss/vite` `4.3.3` están alineados entre sí. La **compatibilidad en ejecución no está verificada**: requiere una instalación completa, `npm ls --depth=0` y un build real. Hasta entonces no puede afirmarse que el entorno funcione.

**Nota:** las fuentes no fijan versiones. Fijarlas es una decisión de reproducibilidad (D20, pendiente). Tailwind 4 se configura principalmente desde CSS (`@theme`), no con un `tailwind.config.js` extenso.

---

## 5. Estructura de carpetas (provisional)

La estructura puede ajustarse según D13 (granularidad de módulos). **D12 está aprobada:** el contenido institucional (navbar, Hero, especialidades, equipo, testimonios, contacto, footer y política) se escribe directamente en `index.html`; JavaScript se reserva para modal, disponibilidad, validación, almacenamiento, IDs, navegación y poblado de catálogos del formulario.

```text
MediCarePlus/
├─ docs/
│  ├─ Doc Requisitos del Producto PRD.md
│  ├─ Guía de Aprendizaje VibeCoding.pdf
│  ├─ ARQUITECTURA.md
│  ├─ PLAN-DE-TRABAJO.md
│  ├─ DECISIONES.md
│  ├─ SYSTEM-PROMPT.md
│  ├─ BITACORA-PROMPTS.md
│  ├─ INFORME-PRUEBAS.md
│  └─ evidencias/
│     └─ capturas/
├─ public/
│  ├─ favicon.svg
│  └─ img/
│     ├─ logo.svg
│     ├─ hero-clinica.*
│     ├─ especialidades/
│     │  ├─ medicina-general.svg
│     │  ├─ pediatria.svg
│     │  ├─ cardiologia.svg
│     │  └─ odontologia.svg
│     ├─ equipo/
│     │  └─ (retratos generados con Gemini)
│     └─ servicios/
│        └─ (renders de equipos y salas)
├─ src/
│  ├─ css/
│  │  └─ main.css
│  ├─ js/
│  │  ├─ main.js
│  │  ├─ config.js
│  │  ├─ data/
│  │  │  ├─ especialidades.js
│  │  │  └─ medicos.js
│  │  ├─ modules/
│  │  │  ├─ almacenamiento.js
│  │  │  ├─ disponibilidad.js
│  │  │  ├─ validacion.js
│  │  │  ├─ modal.js
│  │  │  ├─ agenda.js
│  │  │  ├─ contacto.js
│  │  │  ├─ navegacion.js
│  │  │  └─ render.js
│  │  └─ utils/
│  │     ├─ fechas.js
│  │     ├─ formato.js
│  │     └─ id.js
├─ index.html
├─ package.json
├─ vite.config.js
├─ .gitignore
└─ README.md
```

### Responsabilidad de cada archivo

| Archivo | Responsabilidad |
|---|---|
| `index.html` | Contenido institucional **estático** (D12): navbar, Hero, especialidades, equipo, testimonios, contacto, footer, política y estructura del modal. |
| `src/css/main.css` | Importación de Tailwind, tokens de color y estilos personalizados (foco, animaciones, reduced motion). |
| `src/js/main.js` | Punto de entrada; inicializa módulos cuando el DOM está listo. |
| `src/js/config.js` | Horarios, duración, límites de validación, clave de almacenamiento y zona horaria. |
| `src/js/data/especialidades.js` | Las cuatro especialidades y sus descripciones; alimenta el catálogo del formulario. |
| `src/js/data/medicos.js` | **Fuente de verdad** del catálogo médico: `id`, nombre, especialidad, registro, horario e imagen. Alimenta la asignación de `medicoAsignado`. |
| `src/js/modules/render.js` | Solo puebla las opciones del selector de especialidades del modal desde `especialidades.js`. No construye secciones institucionales. |
| `src/js/modules/almacenamiento.js` | Lee, valida y guarda citas en `localStorage`. |
| `src/js/modules/disponibilidad.js` | Genera franjas y detecta conflictos. Funciones puras. |
| `src/js/modules/validacion.js` | Reglas y conexión de errores con los campos. |
| `src/js/modules/modal.js` | Apertura, foco atrapado, `Esc`, retorno de foco y bloqueo del fondo. |
| `src/js/modules/agenda.js` | Orquesta el flujo: validar → disponibilidad → médico → guardar → confirmar. |
| `src/js/modules/contacto.js` | Validación del contacto y éxito simulado. |
| `src/js/modules/navegacion.js` | Menú móvil, desplazamiento suave y sección activa. |
| `src/js/utils/fechas.js` | Conversión local ↔ UTC y formato en español. |
| `src/js/utils/formato.js` | Formato de documento, teléfono y textos. |
| `src/js/utils/id.js` | Generación del `idCita`. |
| `public/` | Imágenes, logo y favicon que se copian al build. |
| `docs/` | Requisitos, decisiones, bitácora, pruebas y evidencias. |

### Coherencia entre `medicos.js` y el directorio visible (D12)

Con D12 el directorio médico visible vive en `index.html`, pero la asignación de citas necesita datos confiables. Para evitar que se desincronicen:

1. Cada tarjeta del directorio lleva `data-medico-id` con el mismo `id` de `medicos.js`.
2. `medicos.js` es la **única fuente** de nombre, especialidad, registro y horario usados por la lógica; el HTML **no** se lee para asignar un médico.
3. Los valores visibles (nombre, especialidad, registro, horario) deben coincidir textualmente con `medicos.js`.
4. La coherencia se comprueba con la prueba **T-36**: recorrer las tarjetas y comparar cada `data-medico-id` con el catálogo, avisando en consola si falta un id, sobra una tarjeta o cambia un valor.
5. Al agregar o retirar un médico se editan **ambos** archivos. Si se olvida uno, T-36 falla.

Esta duplicación es el costo de D12. La alternativa —renderizar el directorio con JavaScript— se descartó para mantener el contenido institucional en HTML, como pediste.

---

## 6. Estructura semántica

```text
body
├─ a.skip-link                     → "Saltar al contenido"
├─ header
│  └─ nav[aria-label="Navegación principal"]
│     ├─ logo
│     ├─ button[aria-expanded]     → menú móvil
│     ├─ ul (Servicios, Especialistas, Testimonios, Contacto)
│     └─ button (Agendar cita)
├─ main#contenido
│  ├─ section#inicio
│  │  ├─ h1 + subtexto + métricas
│  │  └─ form#form-rapido
│  │     ├─ select especialidad
│  │     ├─ input date
│  │     └─ button "Ver disponibilidad"
│  ├─ section#servicios            → grid de 4 especialidades
│  ├─ section#especialistas        → directorio médico
│  ├─ section#testimonios          → testimonios
│  └─ section#contacto             → formulario de contacto
├─ footer
│  └─ horarios, dirección, geolocalización, política, créditos
└─ dialog#modal-cita[aria-modal="true"]   → provisional (D11)
   ├─ encabezado + botón cerrar
   ├─ form (cita)
   └─ panel de confirmación
```

Reglas:
- Un solo `<h1>`.
- Landmarks reales: `header`, `nav`, `main`, `footer`.
- Cada sección tiene un `id` que coincide con su enlace.
- Los íconos decorativos llevan `aria-hidden="true"`.
- Las imágenes informativas llevan `alt` descriptivo.
- El modal puede ser `<dialog>` nativo o un `div[role="dialog"]`; se decide en D11.

---

## 7. Flujo de agendamiento

```text
[Hero: especialidad + fecha]
        │  submit
        ▼
[Validar fecha y especialidad]
        │
        ▼
[Abrir modal con datos precargados]
        │  foco en el grupo de franjas
        ▼
[Generar franjas según horario y citas ocupadas]
        │
        ▼
[Elegir franja]
        │
        ▼
[Completar datos del paciente]
        │
        ▼
[Enviar]
        ├─ error → mensajes inline + resumen + foco al primer error
        └─ ok    → verificar conflicto
                   → asignar médico (D6)
                   → guardar cita
                   → confirmar
```

Al cerrar el modal, el foco vuelve al elemento que lo abrió: el botón del Hero, el CTA del navbar o el botón "Consultar" de una tarjeta.

---

## 8. Modelo de datos y almacenamiento

### Clave

```text
medicareplus.citas.v1
```

### Contenedor (D5)

Un **array** de citas. Cada cita conserva exactamente los campos internos del PRD:

```json
[
  {
    "idCita": "MED-2026-001",
    "paciente": {
      "nombreCompleto": "Ana María Gómez",
      "documento": "1020304050",
      "telefono": "3101234567",
      "correo": "ana@ejemplo.com"
    },
    "servicio": {
      "especialidad": "Cardiología",
      "medicoAsignado": "Dra. Camila Herrera"
    },
    "fechaHora": "2026-11-15T14:30:00.000Z",
    "estado": "confirmada"
  }
]
```

El array y la clave son decisiones técnicas (D5); no son campos adicionales dentro de la cita.

### Generación del `idCita`

Formato: `MED-AAAA-NNN` (por ejemplo `MED-2026-001`), ampliable a 4 dígitos si se supera 999.

Procedimiento **sobre el array existente**, sin claves adicionales:

1. Leer todas las citas de `medicareplus.citas.v1`.
2. Tomar solo las del año en curso y validar el formato con la expresión regular `^MED-(\d{4})-(\d{3,})$`.
3. **Ignorar los IDs malformados** (nulos, sin prefijo, con letras, año distinto) y emitir una advertencia en consola. No deben romper el cálculo ni impedir la reserva.
4. Calcular el mayor consecutivo del año.
5. Generar el candidato `MED-AAAA-(mayor + 1)` y comprobar que **no exista** ya en el array.
6. **Releer** el array justo antes de guardar y repetir la comprobación. Si el candidato aparece, incrementar hasta encontrar uno libre y volver a comprobar.
7. Guardar el array completo una sola vez.

**IDs duplicados preexistentes:** si el array ya contiene un duplicado, la generación sigue funcionando (toma el máximo), pero el duplicado se reporta en consola para corregirlo manualmente. No se renumeran citas existentes de forma automática.

**Reutilización:** con "máximo + 1", si se borra la cita de mayor consecutivo, su número puede reutilizarse. Para el alcance académico se acepta; evitar la reutilización histórica exigiría un contador en una segunda clave de almacenamiento, lo que **no se hará sin justificación y aprobación explícita**.

**Limitación de concurrencia (declarada):** dos pestañas pueden leer el mismo array y generar el mismo ID antes de que la otra guarde. La relectura reduce la ventana pero **no la elimina**, porque `localStorage` no ofrece bloqueo atómico ni transacciones. El proyecto no incluye backend; esta limitación se documenta en el README y no se mitiga con `storage` events ni bloqueos.

### Fechas y zona horaria (D4)

- El usuario elige una fecha y hora **local de Bogotá**.
- Se construye un `Date` local y se guarda con `toISOString()` en UTC.
- Se muestra con `Intl.DateTimeFormat('es-CO', { timeZone: 'America/Bogota' })`.
- Ejemplo: 09:30 en Bogotá → `14:30:00.000Z` → se muestra 09:30.

**Ejemplo del PRD:** `2026-11-15T09:30:00Z` corresponde a **domingo 15 de noviembre de 2026, 04:30 a. m. en Bogotá**. Se documenta como ejemplo de formato, no como cita válida. Si la intención era 09:30 local, el ISO correcto sería `2026-11-15T14:30:00Z`.

---

## 9. Disponibilidad (D2)

| Regla | Valor |
|---|---|
| Días | Lunes a viernes y sábado |
| Horario L–V | 08:00–12:00 y 14:00–18:00 |
| Horario sábado | 08:00–12:00 |
| Domingo | Cerrado |
| Duración | 30 minutos |
| Franjas L–V | 16 |
| Franjas sábado | 8 |
| Rango de reserva | Hoy hasta 90 días |
| Franjas pasadas | No se muestran si la fecha es hoy |
| Capacidad | 1 paciente por médico por franja |
| Festivos | No modelados (limitación) |

Estas reglas **no están en las fuentes**; son una simulación aprobada. Si el instructor entrega horarios reales, se cambian en `config.js` sin modificar la lógica.

La asignación de médico (D6) se decide en Fase 4. Propuesta: primer médico de la especialidad sin conflicto en esa franja.

---

## 10. Validación (D3)

| Campo | Regla propuesta | Mensaje |
|---|---|---|
| Nombre completo | 3–80 caracteres; letras, tildes, ñ, espacios, guion y apóstrofo | "Escribe tu nombre completo (mínimo 3 caracteres)." |
| Documento | 6–10 dígitos, sin puntos ni espacios | "El documento debe tener entre 6 y 10 dígitos." |
| Teléfono | 10 dígitos; empieza por 3 (móvil) o 7 (fijo) | "Escribe un teléfono colombiano de 10 dígitos." |
| Correo | Formato válido, máximo 120 caracteres | "Escribe un correo válido, por ejemplo nombre@correo.com." |
| Especialidad | Obligatoria y del catálogo | "Selecciona una especialidad." |
| Fecha | No anterior a hoy; máximo 90 días | "Selecciona una fecha entre hoy y los próximos 90 días." |
| Franja | Obligatoria y disponible | "Selecciona una franja disponible." |
| Política de datos | Casilla obligatoria | "Debes aceptar la política de tratamiento de datos." |

**Comportamiento:**
- Validar al enviar y, tras el primer intento, al corregir.
- `aria-invalid="true"` y `aria-describedby` en cada campo con error.
- Resumen de errores con `role="alert"` y enlaces a los campos.
- Foco en el primer error.
- Nunca comunicar el error solo con color.

---

## 11. Accesibilidad (WCAG 2.1 AA)

| Criterio | Implementación |
|---|---|
| 1.3.1 | Landmarks, encabezados jerárquicos, `fieldset`/`legend`, listas |
| 1.4.1 | Errores con texto e ícono, no solo color |
| 1.4.3 | Paleta verificada (sección 12) |
| 1.4.11 | Bordes de campos `#64748b` (4,76:1) |
| 1.4.4 / 1.4.10 | Zoom 200 % y reflujo hasta 320 px |
| 2.1.1 | Todo operable con teclado; foco atrapado en el modal |
| 2.4.1 | Enlace "Saltar al contenido" |
| 2.4.3 | Orden lógico, sin `tabindex` positivos |
| 2.4.7 | Foco visible de alto contraste |
| 3.3.1 / 3.3.2 | `<label>` visible y ayudas con `aria-describedby` |
| 3.3.3 | Mensajes que explican cómo corregir |
| 3.3.4 | Resumen antes de confirmar y opción de volver |
| 4.1.2 | Roles nativos; `aria-expanded`; diálogo con nombre |
| 4.1.3 | `role="status"` para confirmación y `role="alert"` para errores |
| 2.3.3 | `prefers-reduced-motion: reduce` |
| 3.1.1 | `<html lang="es">` |

**Modal (D11 pendiente):**
- Si se usa `<dialog>` nativo: `showModal()`, `Esc`, foco y backdrop con menos código manual.
- Si se usa `div[role="dialog"]`: `aria-modal`, trampa de foco, `Esc`, retorno de foco e `inert` en el fondo.
- En ambos casos: botón de cierre ≥ 44 × 44 px y foco inicial en el título o primer campo.

---

## 12. Paleta y contraste

Ratios calculados con la fórmula de luminancia relativa de WCAG 2.1.

| Token | Color | Uso | Contraste |
|---|---|---|---|
| `--color-brand` | `#0369a1` | Texto, enlaces, botón principal | 5,93:1 sobre blanco ✅ |
| `--color-brand-strong` | `#075985` | Hover | 7,56:1 sobre blanco ✅ |
| `--color-brand-light` | `#e0f2fe` | Fondos suaves | Texto `#0369a1` = 5,17:1 ✅ |
| `--color-accent` | `#10b981` | Decoración, líneas, íconos | **No usar con texto blanco** (2,54:1 ❌) |
| `--color-accent-text` | `#047857` | Texto verde | 5,48:1 sobre blanco ✅ |
| `--color-text` | `#0f172a` | Texto principal | 17,85:1 sobre blanco ✅ |
| `--color-text-muted` | `#475569` | Texto secundario | 7,58:1 sobre blanco ✅ |
| `--color-danger` | `#b91c1c` | Errores | 6,47:1 sobre blanco ✅ |
| `--color-success` | `#047857` | Confirmaciones | 5,48:1 sobre blanco ✅ |
| `--color-border` | `#64748b` | Bordes de campos | 4,76:1 sobre blanco ✅ |
| `--color-border-soft` | `#cbd5e1` | Separadores decorativos | 1,48:1; **no usar en controles** |

**Regla:** `#0284c7` y `#10b981` se conservan como marca y decoración; el texto y los botones usan las variantes oscuras verificadas. El verde `#10b981` solo puede llevar texto oscuro (`#0f172a` = 7,04:1), nunca blanco.

### Tipografía

- Stack del sistema: `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`.
- Base 16 px; interlineado ≥ 1,5; ancho de lectura ~70 caracteres.

---

## 13. Responsive

| Rango | Comportamiento |
|---|---|
| < 640 px | Una columna; menú hamburguesa; modal a pantalla completa |
| 640–767 px | Dos columnas en especialidades; modal centrado |
| 768–1023 px | Dos columnas; directorio 2×2 |
| ≥ 1024 px | Cuatro columnas; directorio 4×1; navbar horizontal |

Pruebas en 320, 375, 768, 1024 y 1440 px.

---

## 14. Estados de la interfaz

| Estado | Dónde | Comportamiento |
|---|---|---|
| Vacío | Franjas | "Selecciona especialidad y fecha para ver las horas." |
| Sin disponibilidad | Franjas | Mensaje y sugerencia de cambiar de fecha |
| Error de campo | Formularios | Inline + resumen + foco |
| Error de almacenamiento | Al guardar | Aviso de cuota o modo privado |
| Éxito | Modal | Resumen y `role="status"` |
| Éxito simulado | Contacto | Aviso de que **no** se envía un correo |
| Carga de assets | Imágenes | `width`/`height` para evitar saltos |

---

## 15. Ecosistema de IA y evidencias

La guía exige usar al menos **3 herramientas** del ecosistema (rúbrica, p. 4–5).

| Herramienta | Uso previsto | Evidencia |
|---|---|---|
| ChatGPT | System Prompt, PRD y directrices | `docs/SYSTEM-PROMPT.md` + captura |
| Gemini | Logo, banner, retratos y renders | Imágenes + prompts en la bitácora |
| OpenCode | Asistencia de código y refactorización | Bitácora + commits |
| Ollama (opcional) | Modelo local para refactorización | Nota de configuración y modelo usado |
| OpenRouter (opcional) | Modelo remoto de apoyo | Nota de configuración, **sin claves** |

**Reglas:**
- No subir API keys, tokens ni capturas con credenciales.
- La bitácora se alimenta desde la Fase 1, no al final.
- Cada registro: fecha, herramienta, objetivo, prompt, resultado, corrección y evidencia.

---

## 16. Activos visuales

| Activo | Fuente exigida | Estado |
|---|---|---|
| Logo | Gemini / SVG institucional | Pendiente D10 |
| Banner del Hero | Gemini | Pendiente D10 |
| Retratos de doctores | Gemini | Pendiente D10 |
| Renders de servicios | Gemini | Pendiente D10 |
| Íconos de especialidades | SVG | Propuesta |

Los SVG de reemplazo son **temporales**. La entrega final debe incluir los activos de Gemini para cumplir el PRD y la rúbrica. Toda imagen debe tener `alt`, `width` y `height`; las de debajo del pliegue pueden usar `loading="lazy"`.

---

## 17. Contenido institucional y legal

| Elemento | Estado |
|---|---|
| Horarios | D2 (simulados) |
| Dirección | Ficticia; pendiente D16 |
| Teléfono y correo | Ficticios; pendientes D16 |
| Geolocalización | Pendiente D8: mapa estático, SVG o enlace |
| Credenciales médicas | Pendiente D9: registro, habilitación o ambos |
| Política de datos | Pendiente D15: texto simulado y enlace |
| Créditos | Pendiente D16 |
| Métricas del Hero | Ejemplos del PRD, marcados como ficticios |

**Contacto (D7):** propuesta recomendada: validar en cliente y mostrar un éxito simulado con aviso visible de que no se envía un correo. No hay backend. Si se usa un servicio externo, requiere cuenta, clave y política de privacidad; no se recomienda para el alcance actual.

---

## 18. Riesgos y límites

| Riesgo | Impacto | Mitigación |
|---|---|---|
| `localStorage` borrado o modo privado | Se pierden citas | Aviso; datos simulados |
| Sin backend | Sin concurrencia ni autenticación | Documentado |
| Datos de salud reales | Privacidad | Aviso de usar datos ficticios |
| Assets de Gemini pendientes | Rúbrica incompleta | SVG temporales + generación en Fase 2 |
| Festivos no modelados | Disponibilidad irreal | Limitación documentada |
| Zona horaria mal interpretada | Citas desplazadas 5 h | D4 + prueba **T-19** |
| Cita de ejemplo del PRD cargada como reserva | Datos falsos en el array | Se documenta solo como ejemplo; T-19 verifica que no se siembre |
| IDs duplicados entre pestañas | Dos citas con el mismo `idCita` | Relectura antes de guardar + limitación declarada (T-18) |
| `node_modules/` parcial tras una instalación interrumpida | Fallos de arranque o de build | Reinstalar limpio **con aprobación**; no se borra sin explicar antes |
| Build no verificado | No se puede afirmar que el entorno funcione | Mantener el estado como "en curso" hasta ejecutar `npm ls` y `npm run build` |
| `base` de Vite en GitHub Pages | Rutas rotas | Configurar `base` en Fase 7 |
| Tailwind 4 difiere de tutoriales | Errores de configuración | Documentación oficial de la versión |
| API keys en el repo | Fuga de credenciales | `.gitignore` + revisión |
| Alcance ampliado | Retrasos | Priorizar requisitos y aprobar cada fase |

### Fuera de alcance

- Backend, base de datos o API.
- Autenticación, pagos, historia clínica.
- Envío real de correos.
- Cancelación o reprogramación (no está en las fuentes).
- Panel administrativo.

---

## 19. Criterios de aceptación de la arquitectura

1. Cada requisito de la matriz tiene fuente y estado.
2. D1–D5, D12 y D17 están registradas en `DECISIONES.md`.
3. El flujo del Hero y el modal está definido.
4. El contrato de datos, la política de IDs y la zona horaria están definidos.
5. La paleta cumple contraste.
6. Las decisiones D6–D11 y D13–D16, D18–D20 tienen fase asignada.
7. Ninguna prueba se marca como aprobada sin ejecutarse.

---

## 20. Decisiones pendientes

| ID | Tema | Fase |
|---|---|---|
| D6 | Asignación de médico | 4 |
| D7 | Comportamiento del contacto | 6 |
| D8 | Método de geolocalización | 3 |
| D9 | Significado de credenciales | 3 |
| D10 | Assets de Gemini y evidencia | 2 |
| D11 | `<dialog>` nativo o `div[role="dialog"]` | 5 |
| D12 | Contenido estático o renderizado por JS | 3 |
| D13 | Granularidad y nombres de módulos | 4 |
| D14 | Plataforma de despliegue | 7 |
| D15 | Texto de la política de datos | 6 |
| D16 | Datos ficticios de contenido | 3 |
| D18 | Uso de `@tailwindcss/forms` | 1 |
| D19 | Meta de Lighthouse | 7 |
| D20 | Versiones exactas | 1 |

---

*Documento actualizado en Fase 0. No se escribió código, no se instalaron dependencias y no se inicializó Git.*
