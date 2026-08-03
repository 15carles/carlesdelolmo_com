# Índice de documentación técnica

Esta carpeta mezcla dos cosas muy distintas: unos pocos documentos **vigentes**, que describen cómo funciona algo hoy, y un **histórico** de fichas de fase que registran cómo se implementó cada trabajo en su momento.

Antes de dar por buena cualquier ficha, comprueba en qué grupo está. Las del histórico describen el estado del proyecto en la fecha que indican, no el actual.

## Documentos vigentes

| Documento | Contenido | Estado |
|---|---|---|
| [`lab-investigacion-lia.md`](./lab-investigacion-lia.md) | Evaluación de interés legítimo del Laboratorio de visibilidad en IA | **Borrador pendiente de revisión profesional.** Consultar antes de tocar el laboratorio o las políticas de privacidad y cookies |
| [`keystatic-projects-qa-checklist.md`](./keystatic-projects-qa-checklist.md) | Checklist de QA para contenido de proyectos | Vigente |
| [`keystatic-projects-compatibility.md`](./keystatic-projects-compatibility.md) | Compatibilidad del esquema de proyectos | Vigente |
| [`auditoria-clases-muertas.md`](./auditoria-clases-muertas.md) | Auditoría de clases CSS sin uso y trabajo pendiente | Vigente, con pendientes |

## Histórico de implementación

Fichas cerradas. Sirven para entender por qué algo está como está; no son instrucciones a seguir.

- **Banner contextual** (fases 0–22): `banner-contextual-phase*.md`. Contrato, pilotos por ruta, copy por página y endurecimiento. La lógica viva está en `lib/contextualLeadBanner.ts`.
- **Laboratorio de visibilidad en IA** (fases 0–4): `lab-investigacion-phase*.md`. Plan, esquema, RPC, vistas y endpoint. El esquema vivo está en `supabase/migrations/`.
- **Higiene y estética**: `higiene-lint-phase1.md`, `keystatic-auditoria-estetica.md`.
- **`archivo/`**: documentos obsoletos que se conservan solo como registro. Ver [`archivo/README.md`](./archivo/README.md).

## Avisos

- Varias fichas de fase referencian `next_app/reports/` (capturas de baseline visual). **Ese directorio no existe en el repositorio**; las capturas no se versionaron.
- Algunas fichas incluyen rutas locales de la máquina del autor. Son artefactos de redacción, no rutas del proyecto.
