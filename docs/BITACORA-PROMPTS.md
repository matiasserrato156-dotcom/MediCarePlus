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

No se registran prompts inventados ni resultados no verificados.

---

## 2. Índice

| Fecha | Herramienta | Fase | Objetivo | Evidencia |
|---|---|---|---|---|
| 29/10/2026 | OpenCode | 0 | Inspeccionar requisitos y corregir documentación | `docs/ARQUITECTURA.md`, `docs/DECISIONES.md` |
| 29/10/2026 | OpenCode | 1 | Configurar Vite + Tailwind | `package.json`, `vite.config.js` |

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
- **Corrección:** pendiente de registrar si aparece algún error.
- **Evidencia:** `package.json`, `vite.config.js`, commit inicial.

---

## 4. Pendientes de registrar

- **ChatGPT:** System Prompt y PRD. El estudiante debe aportar la captura o el texto usado.
- **Gemini:** logo, banner, retratos y renders. Se registran en la Fase 2.
- **Ollama / OpenRouter:** solo si se usan; incluir modelo y configuración, **sin claves**.
- **Iteraciones:** cada corrección de prompt debe quedar con su motivo.

---

## 5. Herramientas utilizadas hasta ahora

| Herramienta | ¿Usada? | Evidencia |
|---|---|---|
| OpenCode | Sí | Este proyecto y la bitácora |
| ChatGPT | Pendiente | El PRD fue aportado por el estudiante |
| Gemini | Pendiente | Fase 2 |
| Ollama | No | Opcional |
| OpenRouter | No | Opcional |

> La rúbrica exige al menos 3 herramientas. Antes de la entrega debe completarse esta tabla con evidencia real.
