# MEMORY.md — MediCare Plus



Memoria del proyecto entre sesiones. Máximo \~50 líneas: resume o elimina lo que ya no aporte.



## Estado actual

- Landing completa y desplegada en Vercel: https://medi-care-plus-six.vercel.app

- Repositorio: https://github.com/matiasserrato156-dotcom/MediCarePlus (rama `main`; cada push redespliega).

- Implementado: Hero, especialidades, equipo, testimonios, contacto con validación, footer, modal de agendamiento en 3 pasos, "Mis citas" y `localStorage`.

- Auditoría de accesibilidad aplicada (commit `71156be`): desborde móvil, contraste, foco y ARIA.



## Decisiones (y por qué)

- Sin backend: datos ficticios en `localStorage`, por ser un proyecto académico.

- `package.json` sin dependencias de plataforma: `@tailwindcss/oxide-win32-x64-msvc` rompía el build en Linux (Vercel).

- Nombres de imagen por rol y especialidad: `hero-recepcion-clinica.jpg` y `equipo/doctora-medicina-general.jpg`, `doctor-pediatria.jpg`, `doctora-cardiologia.jpg`, `doctor-odontologia.jpg`.



## Aprendizajes y errores a evitar

- Hubo una copia antigua del proyecto en otro disco y el editor llegó a modificarla. Verificar `git log --oneline -1` antes de editar.

- `findstr` en CMD falla con tildes: buscar sin tildes.



## Próximos pasos

- Generar con Gemini e integrar las imágenes (banner del Hero y 4 retratos).

- Capturas de evidencia en `docs/evidencias/capturas/`.

- Completar los `PENDIENTE` de `docs/BITACORA-PROMPTS.md`.

- Opcional: desplegar también en Render.

