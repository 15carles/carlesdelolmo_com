# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

## [v3.5.0] - 2026-05-02
### Añadido
- **Servicios:** Nueva landing `/migraciones-web` con enfoque de continuidad técnica, protección SEO/GEO, proceso de trabajo y FAQ.
- **Servicios:** Nueva landing `/desarrollo-web-a-medida` orientada a soluciones de negocio (herramientas, plataformas, integraciones y captación avanzada) con FAQ.
- **SEO Estructurado:** Implementación de JSON-LD (`WebPage`, `Service`, `Offer`, `BreadcrumbList`, `FAQPage`) en las nuevas páginas de servicio.

### Cambiado
- **/servicio-seo/autoridad-digital-ias:** Reescritura y ampliación completa del copy con estructura de secciones más sólida, CTAs distribuidos e interlinks estratégicos.
- **UI/UX Servicios:** Ajustes visuales para reutilizar patrones existentes (`hero-service`, `section-problem`, `section-services`, `section-fit`, `section-process`, `section-scope`, `section-contact`) y mejorar consistencia entre landings.
- **Navegación y arquitectura interna:** Actualización de naming y enlaces en Navbar/Footer, además de nuevas rutas en banner contextual y mejoras de coherencia entre servicios.
- **Sitemap:** Alta de `/migraciones-web` y `/desarrollo-web-a-medida`.

### Corregido
- **Enlaces internos:** Corrección de enlace roto en `/mantenimiento-web-valencia` hacia auditoría SEO + GEO.
- **Copy/estilo:** Corrección ortográfica y ajuste de voz editorial en `/desarrollo-web-a-medida` para mantener tono en singular.

### Control de versionado
- Sincronización de `VERSION`, `CHANGELOG.md`, `README.md`, `next_app/package.json`, `next_app/package-lock.json`, `next_app/public/llms.txt` y `next_app/public/humans.txt`.

## [v3.4.1] - 2026-05-01
### Añadido
- **Entidad local (GBP):** Enlace visible al Perfil de Empresa en Google en el footer (`Ver perfil en Google`).
- **Contacto:** Bloque editorial de confianza en `/contacto` con NAP, área de servicio y enlace `Ver reseñas en Google`.
- **Configuración SEO:** Nueva fuente centralizada de entidad/NAP/perfiles en `next_app/lib/seo/entity.ts`.

### Cambiado
- **Schema.org:** Refuerzo de `Person` y `ProfessionalService` con datos centralizados, `sameAs` ampliado y `hasMap` hacia la URL oficial de GBP.
- **Reseñas:** Actualización del enlace de Google Reviews para usar la URL oficial del GBP.
- **Consistencia de perfiles:** Unificación de LinkedIn (`/in/delolmocarles/`) en author metadata y archivos públicos.
- **Coherencia técnica:** Alineación del `@id` de breadcrumbs en `diseno-web/valencia`.

### Control de versionado
- Sincronización de `VERSION`, `CHANGELOG.md`, `README.md`, `next_app/package.json`, `next_app/package-lock.json`, `next_app/public/llms.txt` y `next_app/public/humans.txt`.

## [v3.4.0] - 2026-04-26
### Añadido
- **feat(pages):** Creación de la página "Sobre Mí" (`/sobre-carles-del-olmo`) integrando componentes de diseño premium (terminal, cards, grid) alineados con la identidad visual.
- **feat(pages):** Implementación de la página "Demos Interactivas" (`/demos-interactivas`) para centralizar el portfolio de aplicaciones de prueba.
- **feat(components):** Modificación en `DemoCard` para incluir enlaces directos a las demostraciones en vivo al interactuar con las imágenes de los proyectos.

## [v3.3.0] - 2026-03-23
### Añadido
- **Home (Arquitectura):** Incorporación de nuevas secciones modulares en `app/(site)/page.tsx` para reforzar narrativa y conversión: `CredibilidadSection`, `QueResuelvoSection`, `CasoDestacadoSection`, `MetodoOrbitaSection`, `DiferenciadoresSection`, `InsightsSection`, `ParaQuienSection` y `CtaFinalSection`.
- **SEO Técnico (Home):** Nuevo generador `generateHomeSchema()` en `lib/seo/schemas.ts` e inyección JSON-LD específica de portada (`WebSite`, `WebPage`, `ItemList` y `WebPageElement` por sección).

### Cambiado
- **Hero Home:** Actualización de copy y CTAs, eliminación del bloque de estadísticas legacy y ajuste de estructura para mantener coherencia visual con el nuevo flujo de la portada.
- **Home (Contenido):** Eliminación del bloque reutilizable de "Proyectos destacados" únicamente en la Home para evitar duplicidad con el nuevo caso destacado.
- **UI Home:** Diferenciación visual entre secciones para reducir linealidad (jerarquía de tarjetas, bloques de oferta y cierre de CTA final).
- **Control de Versionado:** Sincronización de `VERSION`, `README.md`, `CHANGELOG.md`, `next_app/public/llms.txt`, `next_app/public/humans.txt`, `next_app/public/sitemap.xml`, `next_app/components/Footer.tsx`, `next_app/package.json` y `next_app/package-lock.json`.

### Corregido
- **Sitemap:** Actualización de `lastmod` a `2026-03-23`, corrección del slug de `por-que-webs-no-aparecen-respuestas-ia` y alta de `/blog/metodo-orbita`.

## [v3.2.2] - 2026-03-22
### Añadido
- **404 Personalizada:** Nueva página `not-found.tsx` con mensaje de "Página no encontrada", CTA visible para volver al inicio y mini-juego runner integrado.
- **Game Logic:** Separación de lógica del mini-juego en `lib/notFoundRunnerGame.ts` y componente cliente dedicado `components/NotFoundRunnerGame.tsx`.

### Corregido
- **Layout/UX:** Ajuste del espaciado superior en la 404 para compensar correctamente la `navbar` fija (4rem móvil / 5rem desktop).
- **SEO Técnico:** Captura de rutas inexistentes mediante `app/(site)/[...missing]/page.tsx` con `notFound()` para garantizar respuesta HTTP 404 real.

### Cambiado
- **Control de Versionado:** Sincronización de `VERSION`, `README.md`, `llms.txt`, `humans.txt`, `sitemap.xml` y el texto "Last Updated" del footer con fecha 2026-03-22.

## [Cambios Recientes] - 2026-03-20
### Añadido
- **Diseño Web:** Nuevos componentes interactivos `OrbitaMethod` (visualización del ecosistema digital) y `WorkflowTimeline` (línea de tiempo del proceso de trabajo).
- **Diseño Web:** Implementación de la landing page de servicio local `/diseno-web/valencia` con contenido optimizado para SEO y GEO.
- **UI/UX:** Nuevas tarjetas de proyectos con efectos glassmorphism y micro-animaciones en la sección de diseño web.
- **Assets:** Generación de mockups visuales premium para muestras de proyectos (`EcoHogar`, `ColorVibe`, etc.).

### Cambiado
- **Refactorización (Diseño Web):** Traslado de la lógica a componentes modulares TSX para mejorar la mantenibilidad y paridad con Next.js.
- **Estilos:** Optimización de `components.css` y `main.css` para soportar las nuevas secciones interactivas y efectos visuales.
- **SEO:** Actualización de metadatos y esquemas JSON-LD en las nuevas rutas de diseño web.
- **Sitemap:** Sincronización de rutas de diseño web y unificación de archivos de control de sitemap.


## [v3.2.0] - 2026-03-12
### Añadido
- **CMS (Keystatic):** Integración completa de Keystatic como CMS basado en Git. Configuración de panel de administración y API ruta dedicada.
- **Rutas Admin:** Panel de administración renderizado en `app/keystatic/` para visual-editing local.
- **Renderizado Dinámico:** Implementación de `DocumentRenderer` de `@keystatic/core/renderer` en `app/blog/[slug]/page.tsx` garantizando conversión de MDX/Markdoc a HTML e integración completa con Next.js App Router (SSG).
- **Custom Blocks:** Soporte para componentes MDX dinámicos "articleBox" y "ctaSection" con parámetros editables mediante la UI de Keystatic.

### Cambiado
- **Migración Markdown:** Transformación de los 3 posts clave de blog (arrays hardcodeados) a archivos Markdoc (`.mdoc`) físicos en `/content/posts/` listos para ser versionados en GitHub.
- **Automatización SEO:** Reconfiguración de `generateMetadata`, `generateStaticParams` y constructores de JSON-LD en los posts para leer dinámicamente propiedades (slug, metadatos, categorías, autor) usando `reader` nativo de Keystatic.


## [v3.1.0] - 2026-03-12
### Añadido
- **Archivos Base de Configuración SEO:** Creado `lib/seo/schemas.ts` para centralizar objetos globales `PERSON_SCHEMA` y `BUSINESS_SCHEMA` (incluyendo su catálogo completo de ofertas `OfferCatalog`) y generar de forma modular el Schema.org dinámico por plantilla.
- **Utilidad de Metadatos Core:** Creado `lib/seo/metadata.ts` para abstraer la función generadora `constructMetadata()` y manejar la metainformación predeterminada (etiquetas canonicals, robots de indexación genérica y los meta-parámetros unificados de OpenGraph).

### Eliminado
- **Cierre HTML Legacy:** Purgados integralmente los archivos estáticos en formato `.html` iniciales del directorio principal (`index.html`, `pricing.html`, `.html` en /blog y /diseno-web) y la carpeta de utilitarios JS directos (`assets/js`). Migración purista a la arquitectura Server-Side/App Router de Next.js finalizada.

### Cambiado
- **Refactor General JSON-LD:** Sustituidos los JSON hardcodeados masivos por los enrutadores dinámicos de `schemas.ts` en `app/blog/[slug]/page.tsx`, `app/diseno-web/valencia/page.tsx`, `app/diseno-web/alicante/page.tsx`, `app/diseno-web/castellon/page.tsx` y `app/proyectos/ledescaparate/page.tsx`.
- **Refactor General Metadatos Next.js:** Todos los archivos `page.tsx` principales y dinámicos conectan ahora con `constructMetadata` centralizado para garantizar etiquetas meta completas.


## [v3.0.0] - 2026-03-12
### Añadido
- **Next.js Migration (Fase 8.5):** Migración integral de contenidos críticos desde HTML a la aplicación Next.js, asegurando paridad visual y semántica (Pixel-Perfect).
- **Servicios:** Actualización profunda de `/diseno-web/valencia` en Next.js con todas las secciones originales (Sección Proyectos, Keywords Cloud, Herramientas SEO).
- **Blog:** Migración de artículos de alto valor estratégico (`el-fin-del-seo-la-era-del-geo` y `semantica-avanzada-motores-ia`) con tablas de datos, CTAs y esquemas de BlogPosting/FAQPage.
- **Proyectos:** Validación y sincronización de `ledescaparate` como caso de estudio principal en el ecosistema Next.js.

### Cambiado
- **SEO/GEO:** Implementación de metadatos dinámicos básicos y marcado Schema JSON-LD avanzado en todas las nuevas páginas migradas.
- **Sitemap:** Actualización de `sitemap.xml` para reflejar el estado actual de las rutas en Next.js.

## [v2.9.3] - 2026-03-08
### Añadido
- **Legal:** Implementación integral de la página de Política de Cookies (`politica-cookies.html`) con diseño premium, integración de componentes globales (Navbar/Footer) y cumplimiento de Consent Mode v2.
- **Sitemap:** Inclusión automática de la nueva página legal en el mapa del sitio.

### Cambiado
- **SEO:** Optimización de metadatos y conversión a URLs limpias (eliminación de `.html` en canonical y OG Tags) en la página de política de cookies.
- **UI:** Aplicación de arquitectura visual coherente utilizando clases de `shared.css` y `components.css`.

## [v2.9.1] - 2026-03-04
### Añadido
- **Contacto:** Integración de nuevo formulario de contacto modular (`formulario.html`) en la página principal (`index.html`) y en la nueva página dedicada (`contacto.html`).
- **UI:** Rediseño de las etiquetas "Keywords Cloud" con estética glassmorphism premium.
- **Iconos:** Mejoras en SVG de Autoridad y Seguridad adaptando trazos y layout general al ecosistema de la marca.

### Corregido
- **UI:** Estandarización de las dimensiones de logos de herramientas en tarjetas usando contenedores fijos y `object-fit: contain`.
Solucionado el problema de ancho insuficiente del navbar en dispositivos móviles. Ahora el fondo se extiende al 100% del viewport (`100vw`) y se han eliminado redundancias estructurales en `navbar.html`.
- **UI/UX:** Solucionado el problema de parpadeo (flicker) en elementos con animaciones de scroll al entrar en la pantalla (`.animate-on-scroll`, `.animate-fade-in-up`).
- **UX:** Eliminado el desbordamiento horizontal (scrollbars no deseadas) en vista móvil de la landing "Diseño web en Valencia" y otras áreas.
- **CSS:** Refuerzo del reseteo de márgenes globales en `body` y `html` para garantizar consistencia en todos los navegadores móviles.

## [v2.9.0] - 2026-02-28
### Añadido
- **SEO/GEO:** Nueva landing page de servicio local "Diseño web en Valencia" (`diseno-web/diseno-web-valencia.html`).
- **Contenido:** Implementación de 14 secciones optimizadas siguiendo el perfil de competencia y adaptadas a la autoridad de Carles del Olmo.
- **Componentes:** Integración de acordeones FAQ interactivos relacionados con servicios locales.

### Cambiado
- **Documentación:** Sincronización de `sitemap.xml`, `README.md` y `VERSION`.

## [Cambios Recientes] - 2026-02-24
### Añadido
- **Blog:** Nuevo artículo "El fin del SEO tal como lo conocemos: La era del GEO" (`el-fin-del-seo-la-era-del-geo.html`).
- **UI:** Implementación de clase `.article-box` en `shared.css` para agrupar párrafos bajo el efecto glassmorphism oscuro.
- **Formulario:** Nueva opción de checkbox "Auditoría SEO/GEO" en `formulario.html`.

### Cambiado
- **Blog:** Actualización de `blog/index.html` para enlazar el nuevo artículo.
- **Plantilla:** Refactorización de `plantilla-post.html` utilizando contenedores `.article-box`.
- **Sitemap:** Sincronización de `sitemap.xml` con la nueva URL del artículo.
- **UI:** Añadido `theme-toggle.js` en las páginas del blog.
- **README:** Actualización del esquema de árbol en `README.md`.

## [v2.8.0] - 2026-02-23
### Añadido
- **Feature (Pricing):** Implementación integral de `pricing.html` con sistema de pestañas sticky y acordeones FAQ.
- **Backend:** Conexión del formulario de presupuesto con **Supabase** para gestión de leads en tiempo real.
- **Formulario:** Nuevo componente modular `formulario.html` con diseño optimizado en dos columnas y lógica de validación avanzada (`form.js`).

### Cambiado
- **SEO/GEO:** Sincronización de `sitemap.xml` con nuevas rutas y actualización de `README.md` para reflejar la versión v2.8.0.

## [v2.7.10] - 2026-02-23
### Añadido
- **UX:** Implementación de auto-scroll suave (`scrollIntoView`) en las pestañas de `pricing.html`. Ahora la pestaña activa se centra automáticamente en móviles cuando desborda horizontalmente, mejorando la navegación y visibilidad.

## [v2.7.9] - 2026-02-23
### Cambiado
- **UI:** Adaptación estética del SVG de "Autoridad Digital para IAs" en `pricing.html`. Ahora usa una cuadrícula de 64x64 y `stroke-width="2"` para ser consistente con el resto de ilustraciones del sitio.

## [v2.7.6] - 2026-02-13
### Añadido
- **SEO/GEO:** Implementación integral de marcado de datos estructurados (Schema.org) mediante JSON-LD.
- **Entidad Central:** Definición de "Carles del Olmo" como `Person` y `LocalBusiness` (Valencia) en la página de inicio.
- **Catálogo de Servicios:** Estructuración de los 4 pilares de servicios con rangos de precios reales y descripciones optimizadas para motores de respuesta.
- **Semántica de Blog:** Implementación de `ItemList` en el índice de blog y `BlogPosting` en la plantilla de artículos.
- **Casos de Éxito:** Estructuración de proyectos como `CaseStudy` para mejorar la citabilidad por LLMs.
- **IA Readiness:** Actualización de `llms.txt` con un resumen semántico de autoridad y servicios.

### Cambiado
- **Refactorización:** Centralización de entidades para evitar duplicidad y mejorar la coherencia del grafo de conocimiento.
- **Limpieza:** Eliminación de marcado redundante en proyectos específicos para unificar la fuente de verdad.

## [v2.7.5] - 2026-02-12
### Fixed
- **CRÍTICO:** Restaurada la carga de `components.css` que había roto los estilos de botones, badges y terminal en móvil.
- **Visual:** Corregido el centrado del Hero en móvil combinando `main.css` (helpers) con los estilos base de componentes.
- **Layout (Móvil):** Ocultados bloques de Estadísticas y Terminal en pantallas pequeñas para limpiar la interfaz y priorizar los botones CTA.
- **Estilo:** Ajustado tamaño de botones CTA en móvil y forzada alineación izquierda en código del terminal.
- **Corrección:** Eliminada restricción de ancho en el grid de escritorio (`justify-items: start`) que afectaba al formulario de contacto.
- **Móvil:** Formulario de contacto ajustado a ancho completo (100%) con márgenes accesibles y botón centrado.
- **Build:** Eliminada duplicación de códigos CSS en `main.css`.

## [2.7.4] - 12-02-2026

### Visual
- **Navbar Edge-to-Edge**: Implementación de ancho completo real (`width: 100%`) para la barra de navegación en móviles, eliminando restricciones de `max-width` en el contenedor interno.
- **Centrado Absoluto en Móvil**: Unificación del eje visual en viewports < 768px.
  - Textos del Hero (`h1`, `p`, badge) centrados mediante `text-align: center`.
  - Botones CTA alineados al centro mediante `justify-content: center`.
  - Terminal de código centrado con `margin: 0 auto`.
- **Restauración Desktop**: Mantenimiento de la alineación izquierda estándar en pantallas grandes para preservar la jerarquía visual original.

## [2.7.3] - 12-02-2026

### Visual y Simetría
- **Navbar**: Ajuste del padding interno del contenedor de navegación para coincidir con el layout del cuerpo (16px en móvil, 24px en desktop). Eliminada la desalineación visual entre el logo/menú y el contenido principal.
- **Hero**: Refuerzo de estilos en `.hero-right-col` para asegurar `width: 100%` y eliminar cualquier margen negativo residual que pudiera causar contacto con los bordes de la pantalla.

## [2.7.2] - 12-02-2026

### Optimización UI
- **Layout Móvil**: Implementación de diseño "borde a borde" para maximizar el espacio útil en pantallas pequeñas.
  - Reducción del padding lateral en `.container` de 24px a 16px (1rem) en móvil.
  - Reducción del padding interno en `.terminal` de 32px a 16px (1rem) en móvil.
  - Restauración automática de espaciados originales en tablets y desktop (min-width: 768px).

## [2.7.1] - 12-02-2026

### fix
- **Desbordamiento Horizontal Móvil**: Corregido overflow de 76px en viewport de 375px que afectaba a la sección Hero.
  - Aplicado `white-space: pre-wrap` y `word-break: break-word` en `.terminal__code` para permitir ajuste de línea del código.
  - Reforzado `max-width: 100%` en sistema de grid (`.grid-cols-1`, `.grid-cols-2`, `.grid-cols-3`) para móvil.
  - Añadido `max-width: 100%` y `width: 100%` en `.stats` y `.stat` para prevenir expansión.
  - Aplicado `word-break: break-word` en `.stat__value` para prevenir overflow en números largos.
  - Añadido `overflow-x: hidden` en `body` y `.container` como medida preventiva global.

## [2.7.0] - 11-02-2026

### Añadido
- **Integración Backend**: Conexión del formulario de contacto con Supabase para almacenamiento real de leads.
- **Página de Gracias**: Nueva página `gracias.html` para confirmación de envíos exitosos con diseño consistente.

### Cambiado
- **Lógica de Formulario**: Reemplazo de simulación por inserción directa en tabla `leads_contacto`.
- **Navegación**: Redirección automática a `gracias.html` tras envío exitoso.


## [2.6.0] - 10-02-2026

### Cambiado
- **URLs Limpias**: Eliminación de la extensión `.html` en todas las URLs del sitio para mejorar SEO y experiencia de usuario.
  - Actualización de todos los enlaces internos en archivos HTML (`index.html`, `proyectos/ledescaparate.html`, `blog/index.html`, `blog/plantilla-post.html`)
  - Actualización de componentes compartidos (`components/navbar.html`)
  - Modificación de `sitemap.xml` para reflejar las nuevas URLs limpias
  - Compatible con GitHub Pages (funcionalidad nativa de servir archivos sin extensión)

### Técnico
- **Compatibilidad**: Las URLs antiguas con `.html` seguirán funcionando en GitHub Pages, pero se recomienda configurar redirección 301 en Cloudflare para evitar contenido duplicado.

## [2.5.0] - 09-02-2026

### Añadido
- **Estándares de Transparencia**: Implementación de `llms.txt` (perfil para IA), `humans.txt` (créditos humanos) y `.well-known/security.txt` (política de seguridad).
- **Sindicación**: Creación de `blog/rss.xml` para la distribución de contenidos de Insights.
- **SEO & Auth**: Configuración completa de `robots.txt` vinculada al sitemap.

### Cambiado
- **Documentación**: Refactorización de la estructura de archivos en el README para reflejar la nueva arquitectura de autoridad.

## [2.4.1] - 09-02-2026

### SEO
- **Robots.txt**: Adición del archivo de configuración para rastreadores.
- **Sitemap**: Actualización de fechas de modificación (`lastmod`) en `sitemap.xml`.

## [2.4.0] - 09-02-2026

### Estructural
- **Renombrado de Repositorio**: Cambio oficial del nombre del proyecto a `carlesdelolmo_web` en GitHub y sincronización de remotos locales.
- **Documentación**: Actualización de la estructura de archivos en el README y referencias internas.

## [2.3.9] - 07-02-2026

### Documentación
- **Sincronización:** Auditoría y unificación de referencias de versión en README y archivos de control. Alineación con formato semántico vX.Y.Z en VERSION.

## [2.3.8] - 02-02-2026

### Diseño y UI
- **Legibilidad Tags (Modo Claro)**: Ajuste de colores en las etiquetas (`badges`) para el tema claro. Se ha invertido la lógica de contraste, utilizando fondos pastel muy suaves y textos oscuros saturados para garantizar la lectura sin perder la identidad de color.

## [2.3.7] - 02-02-2026

### Diseño y UI
- **Rediseño Radical Chat (Modo Claro)**: Transformación visual completa de la simulación de chat para parecer una app nativa premium.
    - **User**: Burbuja "Glass" sólida (100% opacidad) con gradiente de marca, sombra de elevación y borde "bocadillo" asimétrico.
    - **IA**: Efecto "Frost" mejorado (Blanco 85%, Blur 15px) para máxima legibilidad sin perder el contexto del fondo.
    - **Layout**: Aumento del espaciado entre mensajes para mejorar la jerarquía visual de la conversación.

### Corregido
- **Soporte de Temas**: Se inyectaron los scripts `theme-toggle.js` y el script inline de prevención FOUC en `ledescaparate.html` y `plantilla-proyecto.html` para habilitar el cambio de modo claro/oscuro que faltaba.

## [2.3.6] - 02-02-2026

### Diseño y UI
- **Simulación Chat (Modo Claro)**: Mejora de contraste y legibilidad en las burbujas de diálogo.
    - **Usuario**: Aplicación de gradiente de marca (`var(--gradient-button)`) con opacidad optimizada (`0.9`) y texto blanco.
    - **IA**: Fondo blanco translúcido (`rgba(255, 255, 255, 0.4)`) con borde sutil para destacar sobre el fondo claro.

## [2.3.5] - 02-02-2026

### Diseño y UI
- **Layout Móvil (Compactación)**: Reducción significativa de espaciados verticales en Hero, Secciones y Tarjetas para maximizar la densidad de información en pantallas pequeñas.
- **Tipografía**: Ajuste de la escala tipográfica (`h1`, `p`) en móvil para evitar ocupación excesiva de pantalla.
- **Micro-ajustes**: Reducción de `padding` en tarjetas y contenedores para eliminar "aire" innecesario en visión móvil.

## [2.3.4] - 02-02-2026

### Diseño y UI
- **Botones Secundarios (Mejora)**: Optimización del contraste y visibilidad en modo claro con bordes sutiles y estados hover más perceptibles.
- **Transiciones**: Unificación de transiciones suaves (`all 0.3s ease`) en botones secundarios para una experiencia de usuario premium.

## [2.3.3] - 02-02-2026

### Diseño y UI
- **Botones (Suavizado)**: Ajuste del degradado en modo claro a tonos más suaves (#a78bfa -> #60a5fa) para una estética más difuminada y premium.

## [2.3.2] - 02-02-2026

### Diseño y UI
- **Botones (Optimización)**: Nuevos gradientes diferenciados por tema.
    - **Modo Claro**: Gradiente vibrante (Morado -> Cian -> Azul) con texto blanco para máxima legibilidad.
    - **Modo Oscuro**: Gradiente profundo (Morado -> Azul Oscuro) para integración nocturna.
- **Variables CSS**: Introducción de `--color-text-btn` para control específico del color de texto en botones.

## [2.3.1] - 02-02-2026

### Diseño y UI
- **Glassmorphism (Modo Claro)**: Ajuste de opacidad en tarjetas (`rgba(255, 255, 255, 0.25)`) para habilitar el efecto de desenfoque real.
- **Contraste de Fondo**: Aumento de opacidad en ondas SVG (`0.10`) para mejorar la visibilidad y vibrancia en modo claro.

## [2.3.0] - 02-02-2026

### Refactorización Mayor
- **Arquitectura Mobile-First**: Migración completa de todos los archivos CSS (`main.css`, `shared.css`, `components.css`) a arquitectura mobile-first.
- **Media Queries**: Eliminación de todas las media queries `max-width` en favor de `min-width` para una progresión lógica de estilos desde móvil hacia desktop.
- **Navbar Responsive**: Refactorización del menú de navegación con lógica invertida: menú hamburguesa como base (móvil) y navegación horizontal activada desde `min-width: 1024px`.
- **Componentes Optimizados**: Todos los componentes (Stats, Terminal, Footer, Notificaciones, PageSpeed, Testimonial) ahora siguen el patrón mobile-first.

### Mejorado
- **Rendimiento**: Mejora en la carga y renderizado en dispositivos móviles al aplicar estilos base optimizados.
- **SEO**: Mejor puntuación en Core Web Vitals gracias a la optimización mobile-first.
- **Mantenibilidad**: Código CSS más limpio y predecible con progresión lógica de breakpoints.

### Verificado
- ✅ Auditoría completa de media queries residuales
- ✅ Verificación visual en móvil (375px) y desktop (1440px)
- ✅ Comprobación de funcionalidad del theme toggle
- ✅ Consistencia visual en todas las páginas del proyecto

## [2.2.0] - 02-02-2026

### Refactorización
- **Theme Toggle**: Refactorización profunda de `theme-toggle.js` para exponer `initThemeToggle` globalmente, permitiendo su reinicialización tras la carga dinámica de componentes.
- **CSS Cleanup**: Eliminación de bloques duplicados en `components.css` relacionados con el modo claro.

### Cambiado
- **Arquitectura de Reglas**: Eliminación de reglas internas redundantes en favor de la documentación global del proyecto.

## [2.1.0] - 26-01-2026

### Estructural
- **Reorganización de Archivos**: Migración de páginas a carpetas raíz (`blog/`, `proyectos/`) para una estructura más lógica y limpia.
- **Rutas Relativas**: Actualización masiva de enlaces e imports (CSS/JS) para soportar la nueva anidación utilizando rutas relativas dinámicas.

### Modularización
- **Navbar Componente**: Extracción del menú de navegación a `components/navbar.html`.
- **Carga Inteligente**: `components.js` ahora detecta automáticamente si se ejecuta desde una subcarpeta y corrige los enlaces del navbar al vuelo.
- **Globalización JS**: Refactorización de `main.js` para exponer `window.DevGEO`, permitiendo reinicializar eventos (menú móvil, scroll) tras la carga dinámica de componentes.

## [2.0.0] - 26-01-2026

### Mayor
- **Sistema de Temas Dual**: Implementación completa de Modo Claro (inspirado en macOS) como tema predeterminado y Modo Oscuro como alternativo.
- **Toggle de Tema**: Funcionalidad de cambio de tema con persistencia de preferencia y animaciones suaves.
- **Modularización**: Arquitectura de componentes dinámicos empezando por el Footer, eliminando duplicidad de código.

### Añadido
- **Glassmorphism Theme-Aware**: Nuevo sistema de fondos semi-transparentes y desenfoques que se adapta dinámicamente al tema claro y oscuro.
- **Footer Rediseñado**: Nueva estructura vertical centrada (Nav arriba, Copyright abajo) optimizada para todos los dispositivos.
- **Animaciones UI**: Transiciones suaves de color y fondo en todo el sitio al cambiar de tema.

### Corregido
- **Navbar Scroll**: Solucionado conflicto de estilos que oscurecía el navbar al hacer scroll en modo claro.
- **Visibilidad Footer**: Resuelto problema de carga de componentes dinámicos ajustando estilos base como fallback.

## [1.2.0] - 18-01-2026

### Añadido
- **Sección de Servicios Profesionalizada**: Reestructuración completa con nuevo enfoque en "Soluciones de Autoridad Digital".
- **Ecosistema Digital Pro**: Servicio destacado con diseño premium y tags de autoridad técnica (SIR 62%, Arquitectura de Entidades, Escalabilidad Total).
- **Tres Pilares Técnicos**: Arquitectura Performance-First, Visibilidad Local y Generativa, e Ingeniería de Flujos y Agentes IA.
- **Footer de Sección**: Hook de cierre con mensaje de autoridad y credibilidad técnica.

### Cambiado
- **Componentes CSS**: Nuevas clases `.service-card--featured`, `.service-card__tags`, `.service-card__tag` y `.services-footer` en `components.css`.
- **Copy Estratégico**: Textos orientados a alto valor técnico y estratégico, destacando métricas reales y tecnologías específicas.

## [1.1.0] - 18-01-2026
### Añadido
- **Schema Avanzado**: Implementación de JSON-LD para `Service` y `Review` en el caso de estudio.
- **Utilidades CSS**: Nuevas clases de espaciado (`.mb-xl`, `.pt-sm`) y bordes (`.border-t`) en `main.css`.

### Cambiado
- **Refactorización Integral (Section 3)**: Nuevo diseño de "3 Pilares" para la sección de Contexto, mejorando la legibilidad con un grid de 3 columnas.
- **Espaciado (Section 4)**: Ajuste vertical correctivo en tarjetas de Diagnóstico mediante utilidades `!important` para forzar el centrado visual.
- **Arquitectura CSS**: Reordenamiento de imports en `proyecto-ledescaparate.html` para garantizar la especificidad de las utilidades sobre los componentes.
- **Unificación UI**: Estandarización de `section-header` y títulos de tarjetas en todas las secciones.
## [1.3.1] - 18-01-2026

### Añadido
- **Reingeniería de Chat**: Interfaz de mensajería moderna con alineación diferenciada y lógica de IA generativa visualmente optimizada.
- **Testimonio Premium**: Refinamiento estético de la tarjeta "Mención de Honor" con glassmorphism profundo y jerarquía tipográfica corregida.

**Versión**: v3.5.0
**Última actualización**: 2 Mayo 2026 (Nuevas páginas de servicios, refuerzo de copy/estructura y sincronización de versionado)

## [1.3.0] - 18-01-2026

### Añadido
- **Autoridad GEO**: Integración de Badge SIR (62%) con diseño glassmorphism en la terminal de IA.
- **Automatización**: Nueva sección "Gestión Inteligente de la Autoridad" detallando flujos de leads y monitorización de SEO Local autónomo.
- **Testimonio Premium**: Rediseño completo de la sección de testimonios ("Mención de Honor") con estética corporativa, logo integrado y tipografía refinada.

### Cambiado
- **Refactorización Técnica**: Actualización del copy de rendimiento (LCP) a un tono de alta consultoría técnica.

## [1.2.0] - 18-01-2026

### Añadido
- **Caso de Estudio**: Transformación completa de `proyecto-ledescaparate.html` en un caso de éxito real enfocado en la autoridad en IA.
- **Componentes UI**: Implementación de Anillos PageSpeed (Lighthouse style) y Terminal de IA (Efecto Hook) en `components.css`.
- **Contenido**: Estructura de 7 secciones con narrativa de "Arquitectura de Entidades" y testimonios reales.

### Corregido
- **Bug de Anillos PageSpeed**: Se han corregido las dimensiones de los SVGs y el color de relleno del círculo para evitar que cubrieran toda la pantalla.
- **Enlace de Inicio**: El proyecto LEDescaparate en `index.html` ahora apunta correctamente al nuevo caso de estudio.

## [1.0.0] - 08-01-2026

### Añadido
- **Diseño General**: Implementación de estética dark-tech con glassmorphism.
- **Hero Section**: Alineación horizontal de botones CTA y terminal de código interactiva con efectos hover.
- **Fondos**: Sistema de ondas SVG animadas con optimización de "overscale" para evitar bordes visibles.
- **Componentes**: Navbar dinámico, cards de proyectos/servicios y footer responsive.
- **Formulario**: Validación en tiempo real y sistema de notificaciones.
- **Plantilla**: Creación de `plantilla-proyecto.html` para casos de estudio GEO/SEO.
- **Documentación**: README detallado, `.gitignore`, `VERSION` y este `CHANGELOG`.

### Cambiado
- **Refactorización**: Migración completa de clases inline y Tailwind CDN a arquitectura CSS modular propia (`main.css`, `components.css`, `shared.css`).
- **Comentarios**: Unificación de todos los comentarios de código a español de España.

### Corregido
- Alineación vertical del contenido en la columna derecha del Hero.
- Visibilidad de bordes en animaciones de fondo mediante zoom SVG selectivo.
- **Bug de fondo en cabeceras**: Eliminación de degradados conflictivos en `.page-header` y ajuste de espaciados para asegurar consistencia visual con la página de inicio.
