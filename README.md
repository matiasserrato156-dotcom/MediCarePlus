# MediCare Plus

Landing page académica de agendamiento de citas médicas para el programa **ADSO** del SENA. El proyecto usa datos ficticios y `localStorage`; **no es un sistema clínico real**.

## Estado

La landing está implementada con:

- **Hero** con formulario corto de especialidad y fecha.
- **Especialidades**: cuatro tarjetas (Medicina general, Pediatría, Cardiología y Odontología).
- **Equipo**: cuatro perfiles con nombre, especialidad, registro y horario.
- **Testimonios**: tres tarjetas de opinión con calificación demostrativa.
- **Contacto** con formulario y validación en cliente.
- **Footer** con navegación, horarios, contacto simulado y créditos.
- **Modal de agendamiento en 3 pasos** (especialidad y fecha → franja horaria → datos del paciente).
- **“Mis citas”**: consulta de las citas guardadas en el navegador.
- **Validaciones** de fechas, disponibilidad, datos del paciente y formulario de contacto.
- **`localStorage`** para guardar y leer las citas de la demostración.

Las imágenes fotográficas del hero y del equipo están pendientes: `public/img/` y `public/img/equipo/` existen pero están vacías. Los prompts están documentados en [`docs/PROMPTS-IMAGENES.md`](docs/PROMPTS-IMAGENES.md). Mientras tanto, el hero usa una ilustración SVG.

## Demo

PENDIENTE: URL pública de Vercel (aún no registrada en el repositorio).

Para probar el proyecto localmente, usa `npm run dev` (ver [Cómo ejecutarlo](#cómo-ejecutarlo)).

## Herramientas de IA usadas

El detalle de prompts, resultados, correcciones y evidencia está en [`docs/BITACORA-PROMPTS.md`](docs/BITACORA-PROMPTS.md).

## Tecnologías

- HTML5 semántico.
- Tailwind CSS 4.
- JavaScript Vanilla con módulos ES.
- Vite 8.
- Node.js 22.
- `localStorage` para las citas.
- Git y GitHub.

## Requisitos

- Node.js `>=22.12.0` (según `package.json` y `.nvmrc`).
- npm 10 o superior.
- Git.

Verificado en este equipo:

```text
Node.js 22.19.0
npm 10.9.3
Git 2.56.0.windows.4
```

## Cómo ejecutarlo

```powershell
npm install
npm run dev
npm run build
```

- `npm install`: instala las dependencias.
- `npm run dev`: inicia el servidor de desarrollo; abre la URL que muestra Vite, normalmente `http://localhost:5173/`.
- `npm run build`: genera la versión de producción en `dist/`.

Opcional: `npm run preview` sirve localmente el contenido de `dist/`.

## Estructura

```text
MediCarePlus/
├─ docs/                       Requisitos, decisiones, plan, bitácora y prompts
│  ├─ evidencias/capturas/     Capturas de evidencia
│  ├─ ARQUITECTURA.md
│  ├─ BITACORA-PROMPTS.md
│  ├─ DECISIONES.md
│  ├─ Doc Requisitos del Producto PRD.md
│  ├─ Guía de Aprendizaje VibeCoding.pdf
│  ├─ PLAN-DE-TRABAJO.md
│  ├─ PROMPTS-IMAGENES.md
│  └─ SYSTEM-PROMPT.md
├─ public/
│  ├─ img/                     Imágenes de la landing
│  │  └─ equipo/               Retratos del equipo (vacía; pendiente)
│  ├─ favicon.svg
│  └─ robots.txt
├─ src/
│  ├─ css/
│  │  └─ main.css              Tailwind y estilos de la landing
│  └─ js/
│     ├─ data/                 Catálogos: especialidades.js y medicos.js
│     ├─ modules/              Agenda, almacenamiento, modal, validación, contacto, etc.
│     ├─ utils/                Calendario, fechas, formato e IDs
│     ├─ config.js             Configuración central
│     └─ main.js               Punto de entrada
├─ dist/                       Generado por npm run build
├─ index.html
├─ package.json
├─ package-lock.json
├─ vite.config.js
├─ .nvmrc
└─ README.md
```

## Documentación

- [`docs/DECISIONES.md`](docs/DECISIONES.md): requisitos vs. decisiones.
- [`docs/ARQUITECTURA.md`](docs/ARQUITECTURA.md): alcance, flujo, datos y accesibilidad.
- [`docs/PLAN-DE-TRABAJO.md`](docs/PLAN-DE-TRABAJO.md): fases y pruebas.
- [`docs/BITACORA-PROMPTS.md`](docs/BITACORA-PROMPTS.md): evidencia de uso de IA.
- [`docs/SYSTEM-PROMPT.md`](docs/SYSTEM-PROMPT.md): directrices del proyecto.
- [`docs/PROMPTS-IMAGENES.md`](docs/PROMPTS-IMAGENES.md): prompts de las imágenes pendientes.

## Accesibilidad

Objetivo: **WCAG 2.1 AA**. Incluye HTML semántico, navegación por teclado, etiquetas visibles, foco claro, contraste verificado y respeto por `prefers-reduced-motion`.

## Aviso

- Todos los datos son ficticios.
- `localStorage` no es seguro ni cifrado.
- No se deben ingresar datos reales de pacientes.
- El formulario de contacto es simulado: no envía correos.
- El proyecto no es un sistema clínico real.

## Créditos

Proyecto académico de Análisis y Desarrollo de Software (ADSO). Las herramientas de IA utilizadas se documentan en la bitácora.
