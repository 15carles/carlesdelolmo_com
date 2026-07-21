# Plan: optimización de copy e imágenes de la Home

> Objetivo: reducir el volumen de texto de la portada (~1.600 → ~750 palabras, −53 %),
> romper la linealidad visual (28 bloques numerados clónicos hacia más variedad) y
> aumentar las imágenes de contenido, **sin perder entidad SEO ni enlazado interno**.
>
> Estado: copy aprobado por Carles (con la corrección de estilo de abajo). Pendiente
> solo el visto bueno para implementar. **El hero NO se toca en este plan** (ver §3.1).
>
> **Regla de estilo de marca:** el copy de la web **nunca** usa guion largo (—).
> Aplicada a todo el copy propuesto en este documento.

---

## 1. Estructura: de 12 a 9 secciones

| Actual (12) | Nueva (9) | Acción |
|---|---|---|
| 1. Hero | 1. Hero | **Sin cambios** (la foto es tarea futura de Carles) |
| 2. Credibilidad | (eliminada) | **Fusionar** en (7) |
| 3. Qué resuelvo | 2. Qué resuelvo | Recortar + mejor imagen |
| 4. Servicios | 3. Servicios **+ mosaico mockups** | Recortar + añadir visual |
| 5. Caso destacado | 4. Caso destacado | Recortar + **métricas reales** |
| 10. Reseñas | 5. Reseñas | **Subir** (prueba social temprana) |
| 6. Método ORBITA | 6. Método ORBITA | Recortar (solo titulares + diagrama) |
| 7. Diferenciadores | 7. Por qué conmigo | **Fusión** de Credibilidad + Diferenciadores + Para quién |
| 9. Para quién | (eliminada) | **Fusionar** en (7) |
| 8. Insights | 8. Insights | Sin cambios |
| 11. CTA final | (eliminada) | **Fusionar** en (9) |
| 12. Contacto | 9. Contacto | Fusión con CTA final + arreglar H2 |

**Flujo resultante:** hook, problema, solución, prueba (caso + reseñas), método,
por qué yo, autoridad (blog) y cierre. Patrón estándar de conversión:
problema, solución, prueba, oferta, CTA.

---

## 2. Restricciones no negociables (verificadas en código)

- **Conservar `id="inicio"`** en Hero → lo enlazan Navbar y Footer (`/#inicio`).
- **Conservar `id="servicios"`** en Servicios → lo enlazan Footer (`/#servicios`) y `/demos-interactivas`.
- **Conservar `id="contacto"`** en Contacto → lo enlazan todos los CTA de `/pricing`, `/proyectos/[slug]` y el default de Keystatic (`/#contacto`).
- **Un H1 (Hero) + un H2 por sección** con las entidades clave repartidas: diseño web, SEO, IA/GEO, Valencia, ChatGPT/Gemini/Perplexity.
- **Preservar todos los destinos de enlace interno** (ver mapa en §4). Al fusionar, los enlaces se reubican, no se borran.
- **Actualizar `lib/seo/schemas.ts`** (`HOME_SECTION_DEFINITIONS`) para que las anclas del `ItemList`/`WebPageElement` coincidan con las 9 secciones nuevas. Anclas libres (solo las usa el JSON-LD): `#credibilidad`, `#que-resuelvo`, `#caso-destacado`, `#metodo-orbita`, `#diferenciadores`, `#insights`, `#para-quien`, `#cta-final`.
- **El JSON-LD de entidad (Person + ProfessionalService + catálogo de 10 servicios) no depende del texto visible** → se puede recortar copy sin afectar a lo que Google/IA usan para entender la marca.
- **Estilo:** ningún texto visible usa guion largo (—). Usar punto, coma, dos puntos o paréntesis.

---

## 3. Cambios sección por sección (copy definitivo)

### 3.1 Hero: sin cambios en este plan
- El hero **no se toca**: H1, subtítulo, CTAs, checklist y el canvas de la columna derecha se mantienen. Conserva `id="inicio"`.
- 📌 **Futuro (fuera de este alcance):** cuando Carles tenga una foto profesional que le convenza, sustituirá él mismo el canvas de la columna derecha por la foto. Ese cambio queda fuera de este plan.

### 3.2 Qué resuelvo: recortar + mejor imagen
- **Subtítulo** (de 3 frases a 1):
  > «Muchas empresas ya tienen web, pero si no explica bien lo que haces ni guía al usuario, difícilmente te traerá clientes.»
- **Ítems** (mantener 4, títulos igual, descripciones ≤12 palabras):
  1. *Mensajes poco claros*: «No queda claro qué haces, para quién ni por qué elegirte.»
  2. *Diseño sin dirección*: «Bonito pero desordenado: no genera confianza ni guía al siguiente paso.»
  3. *Estructura que ni Google ni las IAs entienden*: «Sin base semántica, cuesta posicionar y que la IA te cite.»
  4. *Poca utilidad comercial*: «No presenta bien tu propuesta ni facilita el contacto.»
- **Imagen:** sustituir `mockups/mockup_multi.webp` (genérico, al final) por `images/blog/comparativa-web-mala-vs-web-optimizada.webp` (encaja literalmente con «problema»). Moverla a lateral en vez de a pie de sección.
- Enlaces: conservar `/blog/estructura-ideal-pagina-web-empresas` y `/diseno-web/valencia`. Quitar `/pricing` (se repite en Servicios y Contacto).

### 3.3 Servicios: recortar + mosaico de mockups
- Mantener `id="servicios"` y el H2 (contiene la keyword). **Subtítulo a 1 frase.**
- **Ítems:** mantener los 4, recortar cada descripción a ~1 línea. Conservar los términos únicos: ChatGPT/Gemini/Perplexity (ítem GEO) y automatización (ítem 4).
- **Visual nuevo:** mosaico de 3–4 mockups reales (sin uso hoy en la home): `mockups/mockup_colorvibe.webp`, `mockups/mockup_ecohoagr.webp`, `mockups/mockup_synapse_ops.webp` y/o `demos/demo-*.webp`. Convierte la sección más textual en prueba visual.
- **Enlaces:** consolidar de 5 a 2–3. Conservar `/pricing`, `/diseno-web`, `/servicio-seo/autoridad-digital-ias`. Quitar duplicados de `/contacto` y `/proyectos/ledescaparate` (ya están en Caso).

### 3.4 Caso destacado: recortar + métricas reales
- **Eliminar** el formato Situación / Intervención / Resultado (es estructura de página de detalle; `/proyectos/ledescaparate` ya existe para eso).
- Dejar: imagen `muestras/ledescaparate_muestra.webp` + intro de 2 frases + **panel de métricas reales** + CTA «Ver caso completo» (`/proyectos/ledescaparate`) + «Ver más proyectos» (`/proyectos`).
- **Intro (2 frases):**
  > «LEDescaparate partía de un dominio nuevo en un sector muy competitivo. En unos 30 días construimos un ecosistema digital que lo convirtió en referencia, tanto en Google como en las respuestas de IA.»
- **Métricas reales** (documentadas en `content/projects/ledescaparate.mdoc` + captura aportada). Mostrar 3:
  1. **+250 %** tráfico orgánico desde IA (primeros 30 días).
  2. **Entre los puestos 1 y 2 de Google** para sus keywords principales (escaparates LED, digital signage) en varias ciudades (Valencia, Madrid, Barcelona, Alicante, Castellón).
  3. **100 / 100 / 98 / 97** en Lighthouse (SEO, Rendimiento, Buenas prácticas, Accesibilidad).
- Refuerzo opcional (4.ª métrica): **+32 %** leads cualificados.
- Nota: son cifras del caso de estudio publicado; se muestran **atribuidas a LEDescaparate**, no como promesa genérica. El componente `metricsPanel` del `.mdoc` sirve de referencia visual.

### 3.5 Reseñas: subir de posición (sin cambio de contenido)
- Mover el componente `GoogleReviewsSection` justo detrás del Caso destacado.
- **Añadir `id="opiniones"`** al `<section>` (hoy solo tiene `aria-labelledby`) para el ancla del JSON-LD.

### 3.6 Método ORBITA: recortar
- Intro de 1 frase + **diagrama existente** (`blog/metodo-orbita/diagrama-metodo-ORBITA.webp`).
- Las 6 letras (O-R-B-I-T-A): **solo titular, sin descripción** (la explicación completa vive en `/blog/metodo-orbita`, que queda enlazado). De ~195 a ~50 palabras.
- CTA: conservar `/blog/metodo-orbita`.

### 3.7 Por qué conmigo: fusión (Credibilidad + Diferenciadores + Para quién)
- Una sola sección, eyebrow «Por qué conmigo», **máx. 4 ítems** (≤15 palabras cada uno). Ningún mensaje único se pierde: las 3 secciones originales dicen lo mismo repartido en ~545 palabras.
- Ítems propuestos (sintetizan los 14 originales):
  1. *Claridad desde el primer vistazo*: «Se entiende qué haces, para quién y por qué elegirte.»
  2. *SEO y GEO desde la base, no como parche*: «Estructura pensada para Google y para que la IA te cite.»
  3. *Base técnica preparada para crecer*: «Rápida, ordenada y fácil de mantener y ampliar.»
  4. *Enfoque estratégico, no solo estético*: «Diseño, contenido y negocio empujando en la misma dirección.»
- **Enlaces:** conservar `/diseno-web/valencia` y `/contacto` (uno de cada). Opcional: enlace a `/sobre-carles-del-olmo` (refuerza entidad Person).
- Nueva ancla `id="por-que-conmigo"`.

### 3.8 Insights: sin cambios
- Se mantiene tal cual (3 miniaturas de blog, ya equilibrada texto/imagen). Conserva `/blog` + los 3 posts enlazados.

### 3.9 Contacto: fusión con CTA final + arreglar H2
- **Fusionar** `CtaFinalSection` dentro de `ContactSection`: hoy el CTA final («Si tu web no está ayudando…») va inmediatamente antes del formulario con mensaje duplicado.
- **Arreglar H2 legacy:** «¿Listo para dominar el GEO?» → propuesta: **«Hablemos de tu proyecto web»** (coherente con el hero «…sea la respuesta»; el actual es copy huérfano de la etapa GEO-first).
- **Recortar** el párrafo introductorio del formulario a 1–2 frases.
- Mantener `id="contacto"`, el bloque NAP (ubicación, email, teléfono, WhatsApp) y el formulario.

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
- `app/(site)/page.tsx`: nuevo orden de imports/render (9 secciones).
- `components/QueResuelvoSection.tsx`: copy + imagen.
- `components/ServicesSection.tsx`: copy + mosaico + enlaces.
- `components/CasoDestacadoSection.tsx`: quitar 3 bloques + métricas reales.
- `components/MetodoOrbitaSection.tsx`: solo titulares.
- `components/GoogleReviewsSection.tsx`: añadir `id="opiniones"`.
- `components/ContactSection.tsx`: fusión CTA final + H2 + recorte.
- `lib/seo/schemas.ts`: `HOME_SECTION_DEFINITIONS` (11 a 9, con nuevas ids).

> **`components/Hero.tsx` NO se toca.**

**Crear:**
- `components/PorQueConmigoSection.tsx`: sección fusionada.
- (Opcional) componente/patrón de mosaico de Servicios.
- CSS nuevo en `styles/components.css` (o `shared.css`): mosaico y panel de métricas del caso.

**Eliminar (tras fusionar):**
- `components/CredibilidadSection.tsx`
- `components/DiferenciadoresSection.tsx`
- `components/ParaQuienSection.tsx`
- `components/CtaFinalSection.tsx`

**Nuevas ids de sección para el schema:** `hero`, `que-resuelvo`, `servicios`, `caso-destacado`, `opiniones`, `metodo-orbita`, `por-que-conmigo`, `insights`, `contacto`.

---

## 6. Dependencias / decisiones pendientes

1. **Visto bueno para implementar** (§3): copy ya aprobado; solo falta la señal de arranque.
- ✅ **Resuelto, copy:** aprobado con la corrección de guion largo aplicada.
- ✅ **Resuelto, métricas del caso:** cifras reales ya disponibles (§3.4).
- ✅ **Descartado, franja de logos:** no se incluye.
- 📌 **Fuera de alcance, foto del hero:** cambio futuro que hará Carles cuando tenga la foto. El hero no se toca aquí.

---

## 7. Implementación (una vez aprobado)

- **Todo en una sola fase** (ya no hay dependencia de assets externos): recortes de copy, fusiones (Por qué conmigo, Contacto), reorden, métricas reales del caso, mejor imagen en Qué resuelvo, mosaico de Servicios y `schemas.ts`. Reutiliza solo imágenes ya presentes en el repo.
- **Fuera de esta fase:** foto del hero (tarea futura de Carles).
- **QA:** anclas `#inicio` / `#servicios` / `#contacto` funcionando; JSON-LD válido (Rich Results Test); `npm run build` y `lint` OK; `alt` con entidad y nombres de archivo semánticos; ningún texto visible con guion largo (—); verificar que las landings que usan `HeroCanvas`/`GenerativeCanvas` siguen intactas.

---

## 8. Medición (antes/después)

Sin API de Ahrefs disponible en el plan actual → usar **GA4 (G-196PEE2941)** y **Search Console**.
- Guardar **4 semanas de referencia** antes de desplegar (la home se tocó hoy en v4.1.0).
- Comparar: scroll depth 50 %/90 %, engagement time, conversión del formulario (`leads_contacto` en Supabase), e impresiones/clics de la home separando marca vs. no-marca.
