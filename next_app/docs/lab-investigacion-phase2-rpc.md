# Laboratorio de visibilidad en IA — Fase 2: RPC de ingesta

- **Estado:** aplicada y probada (2026-07-22)
- **Migración:** `next_app/supabase/migrations/20260722101000_ai_visibility_lab_rpc.sql`
- **Función:** `public.ai_visibility_lab_submit_snapshot(payload jsonb)`

## Contrato

Recibe el **snapshot estadístico completo** de una sesión y lo reconcilia de forma
idempotente. `SECURITY DEFINER` con `search_path` fijado; `EXECUTE` solo para
`anon` (a través de `/api/lab-research`) y `service_role`. Las tablas siguen
denegando todo acceso directo.

Estructura del payload (cualquier clave no prevista se descarta — nunca se lee):

```jsonc
{
  "public_session_id": "uuid",           // id de sincronización del navegador
  "domain_hash": "hex de 64",            // SHA-256 del hostname normalizado
  "methodology_version": "mvp-1.1",
  "sector": "slug",                      // catálogos: se validan contra is_active
  "service_category": "slug",
  "province": "slug",
  "known_competitors_registered": 0-10,
  "started_at": "ISO",                   // 2026-01-01 ≤ t ≤ now()+1h
  "completed_at": "ISO | null",
  "queries": [ { "position": 1-8, "query_type": "...", "is_custom": bool } ],
  "results": [ { "query_position", "engine", "evaluation_status", ...valores } ]
}
```

## Reglas implementadas

- **Creación**: la sesión remota solo se crea si el snapshot trae ≥ 1 resultado
  registrado (`no_recorded_results` en caso contrario). Ni visitas ni «Empezar»
  generan filas.
- **Derivación en servidor**: contadores, `status` (`partial`/`completed`),
  `is_complete` y `completed_at` se calculan de las filas del snapshot; el
  cliente no puede introducir incoherencias. `submitted_at` solo se fija al crear.
- **Reconciliación**: upsert por `public_session_id` / `(session, position)` /
  `(session, query, engine)` + **poda** de filas ausentes (consultas podadas
  arrastran sus resultados por cascade).
- **Concurrencia**: `pg_advisory_xact_lock` por sesión serializa envíos
  simultáneos (doble pestaña, reintentos cruzados).
- **Validación estricta**: uuid, hash `^[0-9a-f]{64}$`, slugs activos en
  catálogo, tipos JSON exactos (números/booleanos), listas cerradas para todos
  los enums, coherencias (§13 del prompt): `pending` sin valores; `non_evaluable`
  ⇒ `unknown`/`not_applicable`; `not_present` ⇒ fuente/exactitud `not_applicable`;
  aparición ⇒ fuente/exactitud reales; competidores coherentes con el recuento y
  con `known_competitors_registered` (0 registrados ⇒ `not_applicable`); fechas
  en rango y `completed_at ≥ started_at`. Los CHECK de tabla actúan de segunda
  barrera.

## Pruebas ejecutadas (datos ficticios `deadbeef…`, eliminados al final)

| Caso | Resultado |
|---|---|
| Creación con 3 consultas / 9 pruebas (2 evaluables + 1 no evaluable + 6 pendientes) | `created:true`, contadores exactos, `submitted_at` fijado |
| Reenvío idéntico (idempotencia) | `created:false`, mismas 9 filas con **mismos ids** |
| Edición de un resultado + alta de consulta personalizada | Fila actualizada (`recommended/partially_incorrect/2`), 4 consultas / 12 pruebas |
| Poda (retirar la personalizada) | Vuelve a 3 consultas / 9 pruebas (cascade) |
| Finalización | `completed`, `completed_at` respetado, 7 evaluables + 2 no evaluables |
| Reapertura (una prueba vuelve a pendiente) | `partial`, `completed_at` anulado |
| 9 payloads inválidos (sector, hash, uuid, tipo de consulta, duplicado, competidores, fuente, sin resultados, motor) | Rechazados con el error exacto esperado |
| Caso de control válido | Aceptado |
| Permisos | `anon` EXECUTE ✔, `authenticated` EXECUTE ✘ |
| Limpieza | 0 sesiones/consultas/resultados restantes; cascade verificado |

## Nota de verificación

Al comprobar efectos de la función dentro de la misma sentencia (CTE), el SELECT
externo ve el snapshot MVCC previo: las verificaciones deben hacerse en una
sentencia posterior. Documentado para futuras pruebas.
