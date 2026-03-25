# Banner Contextual - Fase 1 (Contrato Funcional)

Fecha: 2026-03-25  
Branch: `codex/banner-contextual`

## Objetivo de esta fase

Cerrar reglas funcionales y tecnicas del banner contextual para evitar ambiguedades antes de implementar el componente.

## Scope funcional

- Componente unico reutilizable (misma estructura visual + misma logica base).
- Contenido configurable por pagina.
- Activacion solo en landings comerciales de servicio (no global en todo el sitio).

## Allowlist inicial de rutas (activas)

- `/diseno-web/valencia`
- `/mantenimiento-web-valencia`
- `/servicio-seo/auditoria-seo-geo`
- `/servicio-seo/posicionamiento-seo-geo`
- `/servicio-seo/autoridad-digital-ias`

## Rutas excluidas explicitamente

- `/contacto`
- `/blog` y `app/(site)/blog/**`
- `/politica-cookies`
- `/politica-privacidad`
- `/terminos-y-condiciones`
- Rutas informativas no comerciales o con foco de cierre final

## Contexto de "Automatizaciones"

- No existe ruta `/automatizaciones` en la base actual.
- Se deja previsto el contexto de configuracion para activarlo cuando exista una landing real.
- En esta iteracion no se activa ninguna ruta inexistente.

## Contrato de activacion

El banner puede mostrarse solo si se cumple todo lo siguiente:

- La ruta actual pertenece a la allowlist.
- No hay marca de sesion que indique banner ya mostrado/interactuado/cerrado.
- No hay interaccion previa con CTA principal.
- No hay inicio de interaccion con formulario.

Disparadores de apertura (primer evento que ocurra):

- Temporizador: `45s` desde carga de la pagina.
- Scroll: `55%` de profundidad de scroll aproximada.
- Exit intent desktop: preparado pero desactivado por defecto en v1.

## Contrato de no repeticion por sesion

Persistencia en `sessionStorage` con claves namespaced:

- `cdo:contextual-lead-banner:shown`
- `cdo:contextual-lead-banner:dismissed`
- `cdo:contextual-lead-banner:cta-interacted`
- `cdo:contextual-lead-banner:form-interacted`

Regla:

- Si alguna clave de cierre/interaccion aplica, el banner no reaparece en la misma sesion.

## Contrato de CTA principal

- Los CTAs comerciales principales se marcaran explicitamente con `data-primary-cta="true"`.
- La interaccion valida para bloquear banner sera al menos `click`.
- No se inferira CTA principal por clase visual (`btn--primary`) ni por `href` para evitar falsos positivos.

## Contrato de formulario iniciado

Se considera "formulario iniciado" al primer evento dentro de cualquier `form`:

- `focusin`
- `input`
- `change`
- `submit`

Con cualquiera de estos eventos:

- se registra `form-interacted` en sesion
- el banner no se muestra o se cierra si estuviera visible

## Contrato de configuracion por pagina

Cada pagina podra definir:

- `title`
- `description`
- `ctaLabel`
- `ctaHref`
- `enabled`
- `contextKey` (identificador semantico de contexto)

Nota:

- En esta fase no se cierra copy final. Se permiten placeholders claramente identificados.

## Criterios UX/visuales obligatorios

- Banner flotante discreto (sin overlay ni bloqueo de pantalla).
- Cierre facil y visible.
- Mobile-first: compacto en movil, sin ocupar media pantalla.
- Desktop: caja flotante en esquina.
- Sin estilos inline.
- Integracion visual con el sistema de tokens existente.

## Accesibilidad minima obligatoria

- Estructura semantica adecuada.
- Boton de cierre con nombre accesible (`aria-label`).
- Navegacion por teclado correcta.
- Estado de foco visible.
- Contraste correcto en texto y controles.

## Riesgos identificados y mitigacion

- Solape con cookie banner fijo: resolver con offsets/z-index y reglas de posicion.
- Rutas legacy inconsistentes en otras zonas del sitio: no ampliar scope en esta fase; solo deuda directa del area tocada.
- Falsos positivos de CTA por clases globales: usar solo convencion `data-primary-cta`.

## Definicion de cierre de Fase 1

- Contrato funcional cerrado y versionado en repo.
- Rutas objetivo y exclusiones definidas.
- Convenciones de CTA/formulario y `sessionStorage` definidas.
- Sin cambios de implementacion de UI o logica de runtime todavia.
