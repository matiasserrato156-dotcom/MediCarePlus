# MediCare Plus

Landing page académica de agendamiento de citas médicas para el programa **ADSO** del SENA. El proyecto usa datos ficticios y `localStorage`; **no es un sistema clínico real**.

## Estado

**Fase 1 — entorno configurado.** La interfaz y la lógica de citas se construyen en las fases siguientes.

## Tecnologías

- HTML5 semántico.
- Tailwind CSS 4.
- JavaScript Vanilla con módulos ES.
- Vite 8.
- Node.js 22.
- `localStorage` para las citas.
- Git y GitHub.

## Requisitos

- Node.js `^20.19.0` o `>=22.12.0`.
- npm 10 o superior.
- Git.

Verificado en este equipo:

```text
Node.js 22.19.0
npm 10.9.3
Git 2.56.0
```

## Instalación

```powershell
npm install
```

## Desarrollo

```powershell
npm run dev
```

Abre la URL que muestra Vite, normalmente `http://localhost:5173/`.

## Compilación y vista previa

```powershell
npm run build
npm run preview
```

El build se genera en `dist/`.

## Estructura

```text
MediCarePlus/
├─ docs/                  Requisitos, decisiones, plan, bitácora y pruebas
├─ public/                Imágenes y favicon
├─ src/
│  ├─ css/                Tailwind y estilos base
│  └─ js/
│     ├─ data/            Catálogos (especialidades, médicos, testimonios)
│     ├─ modules/         Lógica de citas, modal, validación y contacto
│     └─ utils/           Fechas, formato e IDs
├─ index.html
├─ vite.config.js
└─ package.json
```

## Documentación

- [`docs/DECISIONES.md`](docs/DECISIONES.md): requisitos vs. decisiones.
- [`docs/ARQUITECTURA.md`](docs/ARQUITECTURA.md): alcance, flujo, datos y accesibilidad.
- [`docs/PLAN-DE-TRABAJO.md`](docs/PLAN-DE-TRABAJO.md): fases y pruebas.
- [`docs/BITACORA-PROMPTS.md`](docs/BITACORA-PROMPTS.md): evidencia de uso de IA.
- [`docs/SYSTEM-PROMPT.md`](docs/SYSTEM-PROMPT.md): directrices del proyecto.

## Accesibilidad

Objetivo: **WCAG 2.1 AA**. Incluye HTML semántico, navegación por teclado, etiquetas visibles, foco claro, contraste verificado y respeto por `prefers-reduced-motion`.

## Aviso

- Todos los datos son ficticios.
- `localStorage` no es seguro ni cifrado.
- No se deben ingresar datos reales de pacientes.
- El formulario de contacto será simulado: no envía correos.

## Créditos

Proyecto académico de Análisis y Desarrollo de Software (ADSO). Las herramientas de IA utilizadas se documentan en la bitácora.
