# Prompts de imágenes — Landing MediCare Plus

Especificación de las 5 imágenes fotográficas de la landing. Los prompts están en inglés porque los modelos de imagen responden con mayor fidelidad a ese idioma; los nombres de archivo y las rutas coinciden con `docs/ARQUITECTURA.md` y con `src/js/data/medicos.js`.

## Estilo compartido (incluir en todos los prompts)

```
photorealistic editorial healthcare photography, modern private clinic in Bogotá,
soft medical blue (#2E6F95) and sage green (#7FA99B) palette, warm natural clinical lighting,
clean and calm atmosphere, high resolution, 8k, sharp focus on the subject,
natural skin texture with visible pores, shallow depth of field, 50mm lens, f/2.0,
no text, no logos, no watermarks, no brands, no signage, no name badges
```

## Negative prompt compartido

```
text, letters, logo, watermark, brand, badge, deformed hands, extra fingers, missing fingers,
mutated hands, hands in frame, plastic skin, over-smoothed skin, waxy skin, distorted face,
asymmetric eyes, crossed eyes, duplicate person, extra limbs, cartoon, illustration, 3d render,
oversaturated colors, harsh flash, blurry face
```

> Para garantizar que no haya manos ni dedos deformados, todos los encuadres se cierran a la altura del busto (hombros y parte superior del torso): las manos quedan fuera de cuadro.

---

## Imagen 1 — Banner hero (16:9)

- **Archivo:** `public/img/hero-recepcion-clinica.jpg`
- **Uso:** hero de `index.html`, sustituye la ilustración SVG `doctor-illustration`
- **Relación de aspecto:** 16:9 (recomendado 1920×1080)

```
Wide interior photograph of a modern, bright medical clinic reception.
Light oak wood reception desk with a curved counter, soft blue accent wall,
potted monstera and eucalyptus plants, floor-to-ceiling windows with diffused daylight,
light gray polished concrete floor, sage green upholstered waiting chairs,
warm sunlight casting soft shadows, welcoming and calm atmosphere,
no people in the foreground, empty and pristine space, architectural editorial photography.
```

## Imagen 2 — Dra. Valentina Ríos · Medicina general (4:5)

- **Archivo:** `public/img/equipo/doctora-medicina-general.jpg`
- **Uso:** tarjeta del directorio `#equipo` (primer perfil)
- **Relación de aspecto:** 4:5 (recomendado 1024×1280)

```
Bust-length portrait of a Latina female doctor, about 38 years old,
brown hair pulled back in a low bun, warm brown eyes, subtle natural makeup,
white medical coat with soft blue trim, stethoscope around her neck,
serene smile, confident and approachable expression, looking at the camera,
blurred background of a general medicine consultation room with light oak furniture,
soft green plant out of focus, warm daylight from the side.
```

## Imagen 3 — Dr. Mateo Salazar · Pediatría (4:5)

- **Archivo:** `public/img/equipo/doctor-pediatria.jpg`
- **Uso:** tarjeta del directorio `#equipo` (segundo perfil)
- **Relación de aspecto:** 4:5 (recomendado 1024×1280)

```
Bust-length portrait of a Latino male doctor, about 45 years old,
short salt-and-pepper beard, receding hairline, dark hair with gray at the temples,
white medical coat over a light blue shirt, no tie,
kind and warm expression, gentle smile, looking at the camera,
blurred background of a pediatric consultation room with soft pastel colors,
mint green and pale yellow accents, children's drawings out of focus on the wall,
warm natural light, friendly and trustworthy mood.
```

## Imagen 4 — Dra. Camila Torres · Cardiología (4:5)

- **Archivo:** `public/img/equipo/doctora-cardiologia.jpg`
- **Uso:** tarjeta del directorio `#equipo` (tercer perfil)
- **Relación de aspecto:** 4:5 (recomendado 1024×1280)

```
Bust-length portrait of a female doctor, about 50 years old,
short dark hair with subtle gray, black rectangular glasses,
medium skin tone, minimal makeup, small silver stud earrings,
white medical coat over a navy blouse,
calm, secure and reassuring expression, subtle closed-lip smile, looking at the camera,
blurred background of a modern cardiology office with a light blue wall,
medical equipment and a monitor out of focus, cool-warm balanced lighting.
```

## Imagen 5 — Dr. Nicolás Vega · Odontología (4:5)

- **Archivo:** `public/img/equipo/doctor-odontologia.jpg`
- **Uso:** tarjeta del directorio `#equipo` (cuarto perfil)
- **Relación de aspecto:** 4:5 (recomendado 1024×1280)

```
Bust-length portrait of a young Latino male doctor, about 33 years old,
short black hair, clean-shaven, light olive skin,
white medical coat over a sage green scrubs top,
friendly open smile, approachable and energetic expression, looking at the camera,
blurred background of a modern dental office with white and light wood surfaces,
dental chair and lamp out of focus, soft blue accent light, bright and clean.
```

---

## Verificación antes de publicar

| # | Archivo | Comprobación |
|---|---------|--------------|
| 1 | `hero-recepcion-clinica.jpg` | Sin personas en primer plano · sin texto en paredes o carteles |
| 2 | `doctora-medicina-general.jpg` | Manos fuera de cuadro · rostro nítido · bata con detalles azules |
| 3 | `doctor-pediatria.jpg` | Manos fuera de cuadro · barba canosa visible · fondo pastel |
| 4 | `doctora-cardiologia.jpg` | Manos fuera de cuadro · gafas sin reflejos deformes |
| 5 | `doctor-odontologia.jpg` | Manos fuera de cuadro · sonrisa sin dientes deformados |

- [ ] Los 4 rostros son claramente distintos entre sí (edad, rasgos, complexión).
- [ ] Ninguna imagen contiene texto, logotipos, marcas de agua ni insignias con nombre.
- [ ] Manos y dedos: no aparecen en cuadro; si aparecen, se descarta la imagen.
- [ ] Paleta coherente: azul médico + verde suave + madera clara.
- [ ] Peso final optimizado (< 400 KB por retrato, < 700 KB el banner) en WebP o JPEG.

## Integración en el código

Correspondencia con el catálogo de `src/js/data/medicos.js` (campo `imagen`):

| `id` en `medicos.js` | Archivo |
|----------------------|---------|
| `valentina-rios` | `/img/equipo/doctora-medicina-general.jpg` |
| `mateo-salazar` | `/img/equipo/doctor-pediatria.jpg` |
| `camila-torres` | `/img/equipo/doctora-cardiologia.jpg` |
| `nicolas-vega` | `/img/equipo/doctor-odontologia.jpg` |

- Los retratos se referencian desde `index.html` (tarjetas con `data-medico-id`) y desde `src/js/data/medicos.js` si se añade el campo `imagen`.
- Usar `width`/`height` explícitos y `loading="lazy"` en los retratos, `fetchpriority="high"` en el banner.
- `alt` descriptivo sin datos clínicos: p. ej. `Dra. Valentina Ríos, medicina general`.
