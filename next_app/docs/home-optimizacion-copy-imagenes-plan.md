# Plan: optimización de copy e imágenes de la Home

> Objetivo: reducir el volumen de texto de la portada (~1.600 → ~750 palabras, −53 %),
> romper la linealidad visual (28 bloques numerados clónicos → variedad), y pasar de
> 3 a 7–8 imágenes de contenido, **sin perder entidad SEO ni enlazado interno**.
>
> Estado: propuesta pendiente de aprobación. **No implementar hasta validar copy y
> resolver las 2 dependencias de la sección 6.**

---

## 1. Estructura: de 12 a 9 secciones

| Actual (12) | Nueva (9) | Acción |
|---|---|---|
| 1. Hero | 1. Hero **+ franja de logos** | Editar (añadir tira de logos) |
| 2. Credibilidad | — | **Fusionar** en (7) |
| 3. Qué resuelvo | 2. Qué resuelvo | Recortar + mejor imagen |
| 4. Servicios | 3. Servicios **+ mosaico mockups** | Recortar + añadir visual |
| 5. Caso destacado | 4. Caso destacado | Recortar + añadir métrica |
| 10. Reseñas | 5. Reseñas | **Subir** (prueba social temprana) |
| 6. Método ORBITA | 6. Método ORBITA | Recortar (solo titulares + diagrama) |
| 7. Diferenciadores | 7. Por qué conmigo | **Fusión** de Credibilidad + Diferenciadores + Para quién |
| 9. Para quién | — | **Fusionar** en (7) |
| 8. Insights | 8. Insights | Sin cambios |
| 11. CTA final | — | **Fusionar** en (9) |
| 12. Contacto | 9. Contacto | Fusión con CTA final + arreglar H2 + añadir foto |

**Flujo resultante:** hook → prueba visual → problema → solución → prueba (caso + reseñas) →
método → por qué yo → autoridad (blog) → cierre. Patrón estándar de conversión
problema → solución → prueba → oferta → CTA.

---

## 2. Restricciones no negociables (verificadas en código)

- **Conservar `id="inicio"`** en Hero → lo enlazan Navbar y Footer (`/#inicio`).
- **Conservar `id="servicios"`** en Servicios → lo enlazan Footer (`/#servicios`) y `/demos-interactivas`.
- **Conservar `id="contacto"`** en Contacto → lo enlazan todos los CTA de `/pricing`, `/proyectos/[slug]` y el default de Keystatic (`/#contacto`).
- **Un H1 (Hero) + un H2 por sección** con las entidades clave repartidas: diseño web, SEO, IA/GEO, Valencia, ChatGPT/Gemini/Perplexity.
- **Preservar todos los destinos de enlace interno** (ver mapa en §4). Al fusionar, los enlaces se reubican, no se borran.
- **Actualizar `lib/seo/schemas.ts`** (`HOME_SECTION_DEFINITIONS`) para que las anclas del `ItemList`/`WebPageElement` coincidan con las 9 secciones nuevas. Anclas libres (solo las usa el JSON-LD): `#credibilidad`, `#que-resuelvo`, `#caso-destacado`, `#metodo-orbita`, `#diferenciadores`, `#insights`, `#para-quien`, `#cta-final`.
- **El JSON-LD de entidad (Person + ProfessionalService + catálogo de 10 servicios) no depende del texto visible** → se puede recortar copy sin afectar a lo que Google/IA usan para entender la marca.

---

## 3. Cambios sección por sección (copy definitivo)

### 3.1 Hero — editar (añadir franja de logos)
- H1, subtítulo, CTAs y checklist: **se mantienen** (ya son concisos).
- **Añadir bajo el hero** una franja horizontal de logos (cero texto de argumentario, credibilidad visual instantánea). Assets ya disponibles en `public/assets/images/logos-herramientas/` (versión color + blanca): Google, Search Console, GA4, Ahrefs, Semrush, ChatGPT, Claude, Gemini, Looker, Rank Math.
- Eyebrow mínimo: `Trabajo con` (o sin texto).
- Mantener `id="inicio"`. Franja `loading="lazy"` salvo que quede above-the-fold en desktop.

### 3.2 Qué resuelvo — recortar + mejor imagen
- **Subtítulo** (de 3 frases → 1):
  > «Muchas empresas ya tienen web, pero si no explica bien lo que haces ni guía al usuario, difícilmente te traerá clientes.»
- **Ítems** (mantener 4, títulos igual, descripciones ≤12 palabras):
  1. *Mensajes poco claros* — «No queda claro qué haces, para quién ni por qué elegirte.»
  2. *Diseño sin dirección* — «Bonito pero desordenado: no genera confianza ni guía al siguiente paso.»
  3. *Estructura que ni Google ni las IAs entienden* — «Sin base semántica, cuesta posicionar y que la IA te cite.»
  4. *Poca utilidad comercial* — «No presenta bien tu propuesta ni facilita el contacto.»
- **Imagen:** sustituir `mockups/mockup_multi.webp` (genérico, al final) por `images/blog/comparativa-web-mala-vs-web-optimizada.webp` (encaja literalmente con «problema»). Moverla a lateral en vez de a pie de sección.
- Enlaces: conservar `/blog/estructura-ideal-pagina-web-empresas` y `/diseno-web/valencia`. Quitar `/pricing` (se repite en Servicios y Contacto).

### 3.3 Servicios — recortar + mosaico de mockups
- Mantener `id="servicios"` y el H2 (contiene la keyword). **Subtítulo → 1 frase.**
- **Ítems:** mantener los 4, recortar cada descripción a ~1 línea. Conservar los términos únicos: ChatGPT/Gemini/Perplexity (ítem GEO) y automatización (ítem 4).
- **Visual nuevo:** mosaico de 3–4 mockups reales (sin uso hoy en la home): `mockups/mockup_colorvibe.webp`, `mockups/mockup_ecohoagr.webp`, `mockups/mockup_synapse_ops.webp` y/o `demos/demo-*.webp`. Convierte la sección más textual en prueba visual.
- **Enlaces:** consolidar de 5 a 2–3. Conservar `/pricing`, `/diseno-web`, `/servicio-seo/autoridad-digital-ias`. Quitar duplicados de `/contacto` y `/proyectos/ledescaparate` (ya están en Caso).

### 3.4 Caso destacado — recortar + métrica
- **Eliminar** el formato Situación / Intervención / Resultado (es estructura de página de detalle; `/proyectos/ledescaparate` ya existe para eso).
- Dejar: imagen `muestras/ledescaparate_muestra.webp` + intro de 2 frases + **1 dato duro** + CTA «Ver caso completo» (`/proyectos/ledescaparate`) + «Ver más proyectos» (`/proyectos`).
- ⚠️ **Dependencia:** necesito una métrica real del proyecto (p. ej. mejora de velocidad, % más leads/consultas, posiciones ganadas). **No inventar.** Si no hay dato disponible, mantener frase cualitativa pero más corta.

### 3.5 Reseñas — subir de posición (sin cambio de contenido)
- Mover el componente `GoogleReviewsSection` justo detrás del Caso destacado.
- **Añadir `id="opiniones"`** al `<section>` (hoy solo tiene `aria-labelledby`) para el ancla del JSON-LD.

### 3.6 Método ORBITA — recortar
- Intro de 1 frase + **diagrama existente** (`blog/metodo-orbita/diagrama-metodo-ORBITA.webp`).
- Las 6 letras (O-R-B-I-T-A): **solo titular, sin descripción** (la explicación completa vive en `/blog/metodo-orbita`, que queda enlazado). De ~195 → ~50 palabras.
- CTA: conservar `/blog/metodo-orbita`.

### 3.7 Por qué conmigo — FUSIÓN (Credibilidad + Diferenciadores + Para quién)
- Una sola sección, eyebrow «Por qué conmigo», **máx. 4 ítems** (≤15 palabras cada uno). Ningún mensaje único se pierde: las 3 secciones originales dicen lo mismo repartido en ~545 palabras.
- Ítems propuestos (sintetizan los 14 originales):
  1. *Claridad desde el primer vistazo* — «Se entiende qué haces, para quién y por qué elegirte.»
  2. *SEO y GEO desde la base, no como parche* — «Estructura pensada para Google y para que la IA te cite.»
  3. *Base técnica preparada para crecer* — «Rápida, ordenada y fácil de mantener y ampliar.»
  4. *Enfoque estratégico, no solo estético* — «Diseño, contenido y negocio empujando en la misma dirección.»
- **Enlaces:** conservar `/diseno-web/valencia` y `/contacto` (uno de cada). Opcional: enlace a `/sobre-carles-del-olmo` (refuerza entidad Person).
- Nueva ancla `id="por-que-conmigo"`.

### 3.8 Insights — sin cambios
- Se mantiene tal cual (3 miniaturas de blog, ya equilibrada texto/imagen). Conserva `/blog` + los 3 posts enlazados.

### 3.9 Contacto — FUSIÓN con CTA final + arreglar H2 + foto
- **Fusionar** `CtaFinalSection` dentro de `ContactSection`: hoy el CTA final («Si tu web no está ayudando…») va inmediatamente antes del formulario con mensaje duplicado.
- **Arreglar H2 legacy:** «¿Listo para dominar el GEO?» → propuesta: **«Hablemos de tu proyecto web»** (coherente con el hero «…sea la respuesta»; el actual es copy huérfano de la etapa GEO-first).
- **Recortar** el párrafo introductorio del formulario a 1–2 frases.
- Mantener `id="contacto"`, el bloque NAP (ubicación, email, teléfono, WhatsApp) y el formulario.
- ⚠️ **Dependencia / mayor ROI:** insertar **una foto profesional de Carles** junto al formulario (o en «Por qué conmigo»). No existe ninguna en el sitio. Es la imagen más rentable para una marca personal: sube conversión, humaniza, refuerza la entidad `Person` (hoy el schema usa el logo como `image`) y sirve para el Perfil de Empresa de Google. **Requiere que Carles aporte la foto.**

---

## 4. Mapa de enlaces internos (garantía de preservación)

Cada destino actual debe seguir teniendo ≥1 enlace en la home nueva:

| Destino | Dónde queda en la home nueva |
|---|---|
| `/contacto` | Hero, Por qué conmigo, Contacto |
| `/proyectos` | Caso destacado |
| `/proyectos/ledescaparate` | Caso destacado |
| `/diseno-web` | Servicios |
| `/diseno-web/valencia` | Qué resuelvo, Por qué conmigo |
| `/servicio-seo/autoridad-digital-ias` | Servicios |
| `/pricing` | Servicios, Contacto |
| `/blog` | Insights |
| `/blog/metodo-orbita` | Método ORBITA |
| `/blog/estructura-ideal-pagina-web-empresas` | Qué resuelvo |
| 3 posts de Insights | Insights |

Reducción de CTAs totales: de ~25 a ~12 (1–2 por sección) → mejor reparto de autoridad y decisión más clara para el usuario.

---

## 5. Cambios de archivos

**Editar:**
- `app/(site)/page.tsx` — nuevo orden de imports/render (9 secciones).
- `components/Hero.tsx` — franja de logos (o nuevo subcomponente `HeroLogos`).
- `components/QueResuelvoSection.tsx` — copy + imagen.
- `components/ServicesSection.tsx` — copy + mosaico + enlaces.
- `components/CasoDestacadoSection.tsx` — quitar 3 bloques + métrica.
- `components/MetodoOrbitaSection.tsx` — solo titulares.
- `components/GoogleReviewsSection.tsx` — añadir `id="opiniones"`.
- `components/ContactSection.tsx` — fusión CTA final + H2 + foto + recorte.
- `lib/seo/schemas.ts` — `HOME_SECTION_DEFINITIONS` (11 → 9 con nuevas ids).

**Crear:**
- `components/PorQueConmigoSection.tsx` — sección fusionada.
- (Opcional) `components/HeroLogos.tsx` y componente/patrón de mosaico de Servicios.
- CSS nuevo en `styles/components.css` (o `shared.css`): franja de logos, mosaico, foto de contacto.

**Eliminar (tras fusionar):**
- `components/CredibilidadSection.tsx`
- `components/DiferenciadoresSection.tsx`
- `components/ParaQuienSection.tsx`
- `components/CtaFinalSection.tsx`

**Nuevas ids de sección para el schema:** `hero`, `que-resuelvo`, `servicios`, `caso-destacado`, `opiniones`, `metodo-orbita`, `por-que-conmigo`, `insights`, `contacto`.

---

## 6. Dependencias / bloqueadores (requieren a Carles)

1. **Foto profesional** de Carles (§3.9) — la aporta él. Mayor impacto en conversión y entidad.
2. **Métrica real** del caso LEDescaparate (§3.4) — dato concreto o se deja cualitativo.
3. **Validación del copy** propuesto (§3) antes de tocar componentes.

---

## 7. Fases de implementación (una vez aprobado)

- **Fase A — Copy y estructura (sin assets nuevos):** recortes de texto, fusiones (Por qué conmigo, Contacto), reorden, `schemas.ts`. Reutiliza imágenes ya existentes (comparativa, mockups, logos, diagrama). Es el 80 % del efecto «respira».
- **Fase B — Imágenes que faltan:** foto de Carles + métrica del caso. Se despliega cuando estén disponibles.
- **QA:** anclas `#inicio` / `#servicios` / `#contacto` funcionando; JSON-LD válido (Rich Results Test); LCP móvil (si entra imagen al hero, `priority` + peso controlado); `npm run build` y `lint` OK; revisar `alt` con entidad y nombres de archivo semánticos.

---

## 8. Medición (antes/después)

Sin API de Ahrefs disponible en el plan actual → usar **GA4 (G-196PEE2941)** y **Search Console**.
- Guardar **4 semanas de referencia** antes de desplegar (la home se tocó hoy en v4.1.0).
- Comparar: scroll depth 50 %/90 %, engagement time, conversión del formulario (`leads_contacto` en Supabase), e impresiones/clics de la home separando marca vs. no-marca.
