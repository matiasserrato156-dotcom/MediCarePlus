# Product Requirement Document (PRD) - Landing Page MediCare Plus

## 1. Visión General del Producto
- **Objetivo:** Convertir visitantes en pacientes potenciales mediante una interfaz clara, confiable y un flujo ágil de agendamiento de citas médicas.
- **Público Objetivo:** Pacientes particulares que buscan atención médica especializada (medicina general, pediatría, cardiología, odontología) con tiempos de espera mínimos.

## 2. Mapa del Sitio y Arquitectura de Componentes
1. **Header / Navbar:** 
   - Logotipo institucional y enlaces de navegación suave (Servicios, Especialistas, Testimonios, Contacto).
   - Botón de llamada a la acción (CTA): "Agendar Cita" (abre modal interactivo).
2. **Hero Section:**
   - Titular de alto valor orientado a la confianza clínica.
   - Subtexto con propuesta de valor.
   - Métricas de confianza (ej. "+15 años de experiencia", "99% satisfacción", "Atención prioritaria").
   - Imagen de portada generada por IA.
3. **Sección de Especialidades (Grid de 4 columnas):**
   - Tarjetas interactivas con ícono, nombre de la especialidad, descripción concisa y botón "Consultar".
4. **Equipo Médico (Directorio):**
   - Tarjetas con fotografía generada con Gemini, nombre del doctor, especialidad, número de registro médico y horarios.
5. **Modal Interactivo de Agendamiento (Lógica JS):**
   - Selector dinámico de especialidad.
   - Input de fecha y selección de franja horaria.
   - Datos del paciente: Nombre completo, identificación, teléfono y correo electrónico.
   - Confirmación visual con resumen de cita guardado temporalmente en `localStorage`.
6. **Footer:**
   - Horarios de atención, dirección física simulada, enlaces legales (Política de Tratamiento de Datos de Salud) y créditos.

## 3. Especificación Técnica y Contratos de Datos

### Modelo de Datos del Agendamiento (Formato JSON esperado en cliente)
```json
{
  "idCita": "MED-2026-001",
  "paciente": {
    "nombreCompleto": "string",
    "documento": "string",
    "telefono": "string",
    "correo": "string"
  },
  "servicio": {
    "especialidad": "Medicina General | Pediatría | Cardiología | Odontología",
    "medicoAsignado": "string"
  },
  "fechaHora": "2026-11-15T09:30:00Z",
  "estado": "confirmada"
}