# Auditoría de clases muertas

Fecha: 2026-07-29 · Rama: `claude/highlight-post-interlinks-iphju4`

Cruce de tres fuentes: clases en markup (`.tsx` + `.mdoc`), clases definidas en `styles/*.css`,
y clases usadas como gancho desde JS (`classList`, `querySelector`, `closest`).
Los CSS Modules quedan fuera: se referencian por objeto, no por nombre literal.

Verificado antes de empezar: **el proyecto no usa Tailwind ni PostCSS**, y no hay `@tailwind`
ni `@apply` en el CSS. Las clases con sintaxis de Tailwind no las genera nadie en build.

| Dirección | Detectadas | Reales tras verificar |
|---|---|---|
| Markup usa clase que **no existe en CSS** | 113 | 107 |
| CSS define clase que **nadie usa** | 84 | ~73 |

---

## Estado

### ✅ Ejecutado — commit `67d5735`

Retiradas **243 apariciones de 47 clases** en 26 ficheros. Sin efecto visual.

- **Redundantes (~138).** `section-heading` iba siempre junto a `section-header`, y
  `section-eyebrow` junto a `badge`, ambas con estilos propios. Igual con `section-intro`,
  `section-problem`, `problem-grid`, `hero`, `hero-service`, `hero-features` y
  `hero-highlights`. Verificado: cero casos en que fueran solas.
- **Huérfanas semánticas (~15).** `article-main`, `article-aside__toc`, `cookie-modal__info`,
  `cookie-modal__item-title`, `project-card__icon-container`, `pricing-grid--2col`,
  `orbita-mobile-container`, `has-submenu`, `vitals`, `hero-migraciones__figure`,
  `hero-eyebrow`, `hero-subtitle`, `hero-description`.
- **Utilidades tipo Tailwind (~90).** `font-bold`, `font-semibold`, `relative`, `absolute`,
  `italic`, `transition-*`, `duration-*`, `group-hover:*`, prefijos `md:` / `lg:` / `sm:`,
  colores y efectos (`blur-xl`, `rounded-*`, `shadow-md`, `drop-shadow-glow-*`)…

**Verificación:** firma de estilos computados antes y después sobre 16 rutas, 8.375 elementos
y 33 propiedades cada uno. **276.375 valores comparados, cero diferencias.**

---

## ⏳ Pendiente de decisión

### 1. Huecos de la escala propia — *completar, no borrar*

La convención es de la casa, no de Tailwind: los tokens `--spacing-xs` y `--spacing-3xl`
existen, pero la utilidad nunca se generó.

`mb-xs` (6) · `mt-xs` (6) · `pb-3xl` (7) · `my-lg` (2) · `my-md` · `my-xl` · `mt-3xl` ·
`gap-2xl` · `p-2xl` · `px-xl` · `py-2xl` · `pb-md` · `space-y-md` · `text-2xl` (8) ·
`mb-2` (5) · `mb-3` (2) · `h-full` (10) · `flex-wrap` (4)

Existen `.mb-sm/md/lg/xl`, `.text-lg/xl/sm/xs`, `.w-full`, `.flex-col`, `.gap-1..4`, `.mb-1`.
Son ~18 reglas de una línea. **Aviso: al aplicarse, el espaciado cambiará donde hoy no hay nada.**

### 2. `bg-dark-soft` (24 usos) — decisión de diseño

22 de los 24 son literalmente `className="section bg-dark-soft"`. Existen `.bg-dark`,
`.bg-glass`, `.bg-gradient` y `.bg-secondary`, pero **no** `.bg-dark-soft`: parece una
variante retirada en el rediseño «Minimalismo cálido» sin actualizar el markup.

**22 secciones que deberían tener fondo oscuro suave salen sin fondo.** Afecta a `/diseno-web`
y sus tres variantes provinciales, `/auditoria-gratuita`, `/demos-interactivas` y más.

Opciones: aceptar el diseño actual y borrar la clase, o definir `.bg-dark-soft` / mapear a `.bg-dark`.

### 3. Tres bloques decorativos que nunca se han renderizado

`app/(site)/diseno-web/page.tsx`, líneas ~456-522. Cada tarjeta tiene un `<div>` con
`absolute inset-0 bg-purple-500/20 blur-xl rounded-full group-hover:…`. Ninguna de esas
clases existe, así que el resplandor de color no se ha visto nunca.

No basta con borrar las clases: quedarían tres `<div>` vacíos. O se borran enteros, o se
implementa el efecto. **Estas líneas están excluidas a propósito de la limpieza ya aplicada.**

### 4. Arreglos pequeños con efecto visual

- `text-accent-purple` (`gracias/page.tsx:23`, `components/ContactSection.tsx:22`). Existe
  `.text-accent`, no `.text-accent-purple`: ese texto sale en color heredado en vez de acento.
  **Es un error tipográfico, no una clase muerta.**
- `cursor-pointer` (15 usos, todos en `<label>` de formularios). El cursor no cambia al pasar
  por encima. Una regla de 3 líneas lo arregla.

### 5. Bolsa residual dentro de interpolaciones

Ni la auditoría ni el codemod entran en el contenido de `${...}`, para no romper las clases
compuestas. Ahí quedan clases muertas sin cuantificar: confirmadas `text-neutral-200`,
`text-neutral-500` y `font-normal` en `WorkflowTimeline.tsx`. Requiere un barrido aparte.

---

## ⚠️ CSS definido que nadie usa — NO borrar a ciegas

**84 detectadas, ~73 reales.** Aquí la evidencia es más débil que en el markup: allí había
prueba (la clase no aparece en ningún selector, luego no puede pintar nada); aquí solo hay
*ausencia de pruebas* — una búsqueda de texto que no encuentra el nombre.

**Esa búsqueda ya falló: de las 84, al menos 7 sí se usaban**, compuestas por interpolación:

- `notice--info`, `notice--tip`, `notice--warning` → `blog/[slug]/page.tsx:260`
- `workflow-timeline__node--purple/blue/cyan/teal` → `WorkflowTimeline.tsx:65`

Un 8% de error verificado, y solo se revisaron las sospechosas. **El error real es desconocido.**
Aplicar el barrido a ciegas habría roto los avisos del blog y los nodos del timeline.

Lo detectado, agrupado por bloque de componente (restos del rediseño):

| Bloque | Clases | Ubicación en `components.css` |
|---|---|---|
| `servicio-item*` + `servicios-grid` | 7 | 1548-1590 |
| `insight-card*` + `insights-grid` | 8 | 2500-2576 |
| `diferenciador*` | 7 | 2425-2490 |
| `problema-item*` + `problemas-grid` | 6 | 2083-2130 |
| `promo-banner*` + `has-promo-banner` | 6 | 4820-4893 |
| `orbita-home-*` | 5 | 2305-2355 |
| `contact-info-card__icon*` | 5 | 1648-1676 |
| `credibilidad-*` | 4 | 2032-2045 |
| `fit-shell` / `fit-item*` | 4 | 2591-2638 |
| `pricing-contact__*` | 3 | 3682-3698 |
| Sueltas | ~18 | `card__footer`, `img--hero`, `badge--authority`, `notification--success/info`, `pricing-grid--4col`, `service-card--featured`, `testimonial__name`, `py-md`, `py-lg`, `px-sm/md/lg`, `space-y-2`, `text-green-400`, `hero__content`, `list-inside`, `post-item__tags` |

Son ~700-900 líneas sobre las 5.614 de `components.css`.

**Si algún día se hace, un commit por bloque**, no un borrado único: diez diffs pequeños y
revertibles por separado, cada uno con su comprobación. Y **cuidado con `promo-banner`**: la
variable `--promo-banner-height` se usa en cálculos de posicionamiento sticky de reglas vivas.

### Por qué puede no merecer la pena

Son ~800 líneas de 5.614 (14%) en un fichero que se sirve una vez y comprimido: **no hay
ganancia de rendimiento perceptible**. El beneficio es de mantenibilidad. Es un *nice to have*.

---

## Cómo reproducir

Los scripts de la auditoría no están en el repo (eran de sesión). El método:

1. Extraer clases de `className="…"`, `className={\`…\`}` y `class="…"` en `.tsx` y `.mdoc`,
   descartando el contenido de `${…}`.
2. Extraer clases de los **selectores** de `styles/*.css` (vaciando los bloques de declaraciones
   para no capturar valores).
3. Extraer ganchos de JS: `classList.*`, `querySelector*`, `closest`, `getElementsByClassName`.
4. Cruzar en ambas direcciones.
5. **Revisar a mano toda clase con `--` o `__`**: son las candidatas a componerse por interpolación.
