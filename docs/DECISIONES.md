# Registro de decisiones — MediCare Plus

> Creado en la **Fase 0**, 29 de octubre de 2026.
> Este documento separa lo que exigen las fuentes de lo que decidimos nosotros.
> **Prioridad:** PRD y guía académica > decisiones > propuestas.

---

## 1. Cómo leer este registro

| Etiqueta | Significado |
|---|---|
| **Requisito** | Está escrito explícitamente en el PRD o en la guía |
| **Decisión** | El estudiante aprobó una forma de implementarlo |
| **Propuesta** | Recomendación técnica que aún no se aprueba |
| **Supuesto** | Dato ficticio o simplificación académica, documentada |

Una decisión no convierte una propuesta en requisito. Si el instructor cambia una regla, se actualiza este registro y se avisa en la bitácora.

---

## 2. Decisiones aprobadas

| ID | Tema | Fuente | Decisión | Alternativas descartadas | Justificación | Impacto |
|---|---|---|---|---|---|---|
| **D1** | Formulario del Hero | Guía p. 3: "formulario rápido de agendamiento"; PRD solo pide CTA | Formulario corto con **especialidad + fecha** que abre el modal precargado | Solo CTA; formulario completo en el Hero | Cumple la guía sin duplicar validaciones ni lógica | Hero, modal, HTML, flujo |
| **D2** | Disponibilidad | Las fuentes no la definen | L–V 08:00–12:00 y 14:00–18:00; sábado 08:00–12:00; domingo cerrado; 30 min; hasta 90 días | Horarios reales del consultorio; otra duración | Simulación académica simple y demostrable | Franjas, footer, pruebas |
| **D3** | Validaciones | Guía p. 4 solo nombra cédula/DNI, correo, teléfono y especialidad | Reglas de la sección 4 de este documento | Validación mínima del navegador; reglas del instructor | Da criterios verificables y mensajes claros | Formularios, pruebas |
| **D4** | Zona horaria | PRD usa `Z` en el ejemplo, sin explicar | Guardar **UTC real** y mostrar en `America/Bogota` | Guardar la hora local con `Z` | Evita el desfase de 5 horas y es semánticamente correcto | Datos, presentación, pruebas |
| **D5** | Almacenamiento | PRD muestra una cita como objeto | **Array** bajo `medicareplus.citas.v1` | Una clave por cita; objeto índice | Permite listar y contar citas con poco código | Persistencia, disponibilidad |
| **D17** | Borde de campos | WCAG 1.4.11 exige 3:1 | `#64748b` (4,76:1 sobre blanco) | `#cbd5e1` (1,48:1, falla); `#94a3b8` (2,56:1, falla) | Corrige un fallo real de contraste | Formularios, foco |

**Fecha de aprobación:** 29 de octubre de 2026.

---

## 3. Decisiones pendientes

| ID | Tema | Pregunta | Recomendación | Fase |
|---|---|---|---|---|
| D6 | Asignación de médico | ¿Cómo se llena `medicoAsignado`? | Primer médico de la especialidad sin conflicto en la franja | 4 |
| D7 | Contacto | ¿Envío simulado o servicio externo? | Simulado, con aviso visible; sin backend | 6 |
| D8 | Geolocalización | ¿Mapa estático, SVG o enlace? | SVG estático + dirección + enlace "Cómo llegar" | 3 |
| D9 | Credenciales | ¿Registro médico, habilitación o ambos? | Registro del PRD + sello de habilitación | 3 |
| D10 | Assets Gemini | ¿Quién genera y cómo se evidencia? | El estudiante genera logo, banner, retratos y renders; se registran prompts | 2 |
| D11 | Modal | ¿`<dialog>` nativo o `div[role="dialog"]`? | `<dialog>` nativo con respaldo si se requiere | 5 |
| D12 | Renderizado | ¿HTML estático o tarjetas por JS? | HTML estático para contenido; JS solo para catálogos del modal | 3 |
| D13 | Módulos | ¿Cuántos archivos y con qué nombres? | 6–8 módulos, nombres en español consistentes | 4 |
| D14 | Despliegue | ¿GitHub Pages, Vercel o Netlify? | GitHub Pages si el repositorio es público; Vercel si se quiere URL inmediata | 7 |
| D15 | Política de datos | ¿Qué texto y dónde? | Modal o sección con texto simulado, enlazado desde el footer | 6 |
| D16 | Datos ficticios | Nombres, dirección, teléfono, métricas y testimonios | Datos claramente ficticios y coherentes | 3 |
| D18 | `@tailwindcss/forms` | ¿Instalar el plugin? | Omitirlo; estilizar los campos con Tailwind y CSS propio | 1 |
| D19 | Lighthouse | ¿Meta de auditoría? | ≥ 90 en accesibilidad y buenas prácticas, como objetivo | 7 |
| D20 | Versiones | ¿Fijar Vite/Tailwind/Node? | Node 22, Vite 8.3.5, Tailwind 4.3.3 | 1 |

---

## 4. Reglas de validación aprobadas (D3)

Estas reglas son **académicas y simuladas**. No sustituyen una validación real de identidad ni una norma legal.

| Campo | Regla | Mensaje |
|---|---|---|
| Nombre completo | 3–80 caracteres; letras, tildes, ñ, espacios, guion y apóstrofo | "Escribe tu nombre completo (mínimo 3 caracteres)." |
| Documento | 6–10 dígitos, sin puntos ni espacios | "El documento debe tener entre 6 y 10 dígitos." |
| Teléfono | 10 dígitos; empieza por 3 (móvil) o 7 (fijo) | "Escribe un teléfono colombiano de 10 dígitos." |
| Correo | Formato válido; máximo 120 caracteres | "Escribe un correo válido, por ejemplo nombre@correo.com." |
| Especialidad | Obligatoria y del catálogo | "Selecciona una especialidad." |
| Fecha | No anterior a hoy; máximo 90 días | "Selecciona una fecha entre hoy y los próximos 90 días." |
| Franja | Obligatoria y disponible | "Selecciona una franja disponible." |
| Política de datos | Casilla obligatoria | "Debes aceptar la política de tratamiento de datos." |

**Comportamiento:** validar al enviar; después del primer error, validar al corregir; `aria-invalid`; `aria-describedby`; resumen con `role="alert"`; foco en el primer error; nunca usar solo color.

---

## 5. Decisiones que ya vienen de las fuentes

No se someten a votación porque están escritas:

- HTML5 semántico, Tailwind CSS y Vanilla JS.
- Node.js y Vite como herramientas de desarrollo.
- `localStorage` para las citas.
- Cuatro especialidades: Medicina General, Pediatría, Cardiología y Odontología.
- Campos del paciente: nombre completo, documento, teléfono y correo.
- Modal con especialidad, fecha, franja y confirmación.
- Directorio médico con foto, nombre, especialidad, registro y horario.
- Footer con horarios, dirección simulada, política de datos y créditos.
- Testimonios y formulario de contacto.
- Responsive, contraste WCAG AA, ARIA y teclado.
- Bitácora de prompts, repositorio Git y demo pública.
- Al menos 3 herramientas de IA.

---

## 6. Trazabilidad requisito → decisión

| Requisito | Decisión relacionada |
|---|---|
| Hero con formulario rápido | D1 |
| Modal y disponibilidad | D1, D2, D6 |
| Persistencia de citas | D4, D5 |
| Validaciones | D3 |
| Directorio y credenciales | D9, D16 |
| Contacto | D7 |
| Footer y geolocalización | D8, D15, D16 |
| Accesibilidad | D11, D17 |
| Assets visuales | D10 |
| Repositorio y demo | D14 |
| Evidencia de IA | D10, bitácora |
| Versiones y entorno | D18, D20 |

---

## 7. Nota sobre el ejemplo del PRD

El PRD usa:

```json
"fechaHora": "2026-11-15T09:30:00Z"
```

Verificación:

- `2026-11-15` es **domingo**.
- `09:30Z` equivale a **04:30 a. m. en Bogotá** (UTC−5).
- Si la intención era 09:30 a. m. en Bogotá, el valor correcto sería `2026-11-15T14:30:00Z`.

**Conclusión:** se toma como ejemplo de **formato ISO**, no como una cita real. La simulación cierra los domingos (D2). Esta decisión se documenta para la sustentación.

---

## 8. Cómo se cambia una decisión

1. Se discute la alternativa y el impacto.
2. Se actualiza este registro con fecha y motivo.
3. Se actualizan `ARQUITECTURA.md` y `PLAN-DE-TRABAJO.md` si cambia el alcance.
4. Se anota en `BITACORA-PROMPTS.md` si el cambio vino de una herramienta de IA.
5. Se hace un commit descriptivo, por ejemplo:
   `docs: actualiza decisión de disponibilidad`.

No se cambia una decisión en el código sin actualizar este registro.

---

## 9. Riesgos de las decisiones

| Decisión | Riesgo | Mitigación |
|---|---|---|
| D2 | Horarios irreales para el consultorio | Se presentan como simulación; se cambian en `config.js` |
| D3 | Reglas demasiado estrictas para casos reales | Se documentan como académicas |
| D4 | Desfase si se interpreta mal la `Z` | Prueba T-19 y ejemplo en la documentación |
| D5 | Crecimiento del array | Suficiente para el alcance; se documenta el límite |
| D11 | Foco mal atrapado | Pruebas de teclado T-06 a T-08 |
| D10 | Assets no generados a tiempo | SVG temporales y generación antes de la entrega |

---

## 10. Seguridad y privacidad

- No se deben ingresar datos reales de pacientes.
- `localStorage` no es seguro ni cifrado; es una simulación académica.
- No se suben API keys, tokens ni capturas con credenciales.
- La política de datos será un texto simulado, revisable por el instructor.

---

*Registro creado en Fase 0. No se modificó código, no se instalaron dependencias y no se inicializó Git.*
