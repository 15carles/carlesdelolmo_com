# Laboratorio de visibilidad en IA — Fase 0: plan de evolución a base de investigación

- **Estado:** aprobado por Carles (2026-07-22). Fases 1-9 en ejecución. Decisiones D5, D6, D7, D8, D9 y las de arquitectura confirmadas; **D10 condicionada a documentar una LIA** (interés legítimo, necesidad, ponderación, garantías, oposición y comparación con consentimiento/contrato) marcada para revisión profesional antes del despliegue definitivo. El copy no debe afirmar que el envío es estrictamente necesario para generar el informe individual.
- **Rama de trabajo:** `claude/ia-visibility-lab-plan-yml5i3`
- **Fecha:** 2026-07-22
- **Referencia:** prompt original de requisitos (documento PROMPT adjunto a la sesión)
- **Objetivo global:** que los resultados estadísticos de cada análisis del laboratorio se envíen automáticamente a una base de investigación en Supabase, manteniendo los datos privados exclusivamente en el navegador, con transparencia previa, seguridad (RLS), idempotencia y documentación reproducible.

---

## 1. Resumen ejecutivo

El laboratorio actual funciona al 100 % en el navegador (localStorage) y así seguirá para los datos privados. La evolución añade una **segunda capa de datos de investigación**: un subconjunto estrictamente estadístico y normalizado (sin nombre de empresa, sin dominio en claro, sin competidores, sin textos libres) que se sincroniza con Supabase mediante un endpoint propio y una función RPC segura.

Principios de diseño elegidos:

1. **Ampliar, no rehacer.** El flujo de 5 etapas, el modelo local y el informe no cambian. Se añade un módulo `research` paralelo.
2. **Snapshot idempotente.** Cada sincronización envía el estado estadístico completo de la sesión (sesión + consultas + resultados). El servidor reconcilia (upsert + poda). Reintentos y duplicados dejan de ser un problema por diseño.
3. **El dominio nunca sale del navegador.** El hash SHA-256 del hostname normalizado se calcula en el cliente.
4. **Denegación por defecto en base de datos.** RLS activado sin políticas para `anon`; la única puerta de entrada es una función RPC `SECURITY DEFINER` que valida todo.
5. **Sin texto libre en la capa de investigación.** Solo slugs de catálogo, enums y contadores.
6. **Transparencia antes de recoger.** Copy, desplegable de datos compartidos y política de privacidad se despliegan junto con la activación de la recogida (misma release).

---

## 2. Auditoría de la implementación actual

### 2.1 Laboratorio

| Área | Estado actual |
|---|---|
| Orquestador | `components/aiVisibilityLab/VisibilityLab.tsx` — 5 etapas (`stage` 1-5), mutaciones vía `mutate()`, persistencia automática en cada cambio |
| Etapas | `StageIntro`, `StageBusiness` (formulario), `StageQueries`, `StageFieldwork` (guardado por prueba), `StageReport` |
| Modelo | `lib/aiVisibilityLab/types.ts` — `LabSession { localId, version, createdISO, updatedISO, stage, business, queries, results, … }` |
| Persistencia | `lib/aiVisibilityLab/storage.ts` — localStorage, clave `ai_visibility_lab_session_v1`, validación tolerante `isLabSession` |
| Configuración | `lib/aiVisibilityLab/config.ts` — motores (`chatgpt`, `gemini`, `perplexity`), plantillas, opciones, límites, `METHODOLOGY_VERSION = 'Laboratorio MVP 1.0'` |
| Consultas | `q1` descubrimiento, `q2` recomendación, `q3` necesidad, `q4` personalizada (opcional). Matriz pruebas = consultas × 3 motores (9-12) |
| Resultado por prueba | `aparicion` (no_aparece/mencionada/recomendada/no_evaluable), `fuente` (si/no/no_seguro, **solo si aparece**), `exactitud` (5 valores, **solo si aparece**), competidores conocidos marcados, flags (`otrasEmpresasFlag`, `ningunCompetidor`, `competidorNoSeguro`), texto libre `otrasEmpresas`, `notas` |
| Informe | `lib/aiVisibilityLab/report.ts` — métricas, diagnósticos y prioridades calculados en cliente |
| Analítica | `lib/aiVisibilityLab/analytics.ts` — GA4 solo con consentimiento (`cookie_consent_settings`), sin datos identificativos |
| Contacto | `contactPrefill.ts` → sessionStorage → formulario `/contacto` (capa comercial, separada) |
| Acciones clave | `handleCommit` (guardar/editar prueba), `handleGoReport` (fin), `handleRepeat` (repite pruebas, mismos datos), `confirmReset` (borrado local) |

### 2.2 Integración Supabase existente

- Proyecto: **`gzrgxkjvxaflteilmjuq` (Carles_del_Olmo, eu-central-1, UE)** — verificado por MCP. El otro proyecto (`LEDescaparate`) no se toca.
- Tablas existentes: `leads_contacto` (formulario, RLS con política INSERT endurecida) + tablas del ERP personal (`User`, `Cliente`, `Factura`, …, todas con RLS). **No hay colisión** con los nombres `ai_visibility_lab_*`.
- Migraciones registradas: 2 (`enable_rls_on_all_erp_tables`, `harden_leads_contacto_insert_policy`). El repositorio **no tiene carpeta de migraciones** → se creará `next_app/supabase/migrations/` para reproducibilidad.
- Patrón de escritura existente: `app/api/contact/route.ts` — **edge runtime**, validación espejo de RLS, rate limit en memoria por IP, clave publishable leída en servidor. Este patrón se replica.

### 2.3 Despliegue y restricciones técnicas

- Despliegue: **Cloudflare Pages** (`pages:build` con `@cloudflare/next-on-pages`) → toda ruta API nueva debe declarar `runtime = 'edge'`.
- CSP (report-only) ya permite `connect-src` a Supabase; el nuevo endpoint es `self` → sin cambios de CSP.
- Web Crypto (`crypto.subtle`) disponible en navegador (contexto seguro) y edge → viable para SHA-256 en cliente.
- Rate limit en memoria en edge: efímero por isolate (misma limitación documentada en `/api/contact`); se recomienda regla WAF de Cloudflare como refuerzo.

### 2.4 Copy y legal que quedará obsoleto (inventario a corregir)

1. `config.ts` → `LIMITATION_TEXTS.privacyNotice` («Los datos del análisis se guardan únicamente en este dispositivo…»).
2. `StageBusiness.tsx` → «Estos datos se guardan solo en este dispositivo.»
3. `laboratorio-visibilidad-ia/page.tsx` → FAQ «¿Se guardan los datos introducidos?» (+ JSON-LD de FAQ derivado).
4. `VisibilityLab.tsx` → diálogo `ResetConfirm` (borrado local).
5. Comentarios de cabecera en `types.ts`, `storage.ts`, `analytics.ts` («ningún dato se envía al servidor»).
6. `politica-privacidad/page.tsx` → sin mención al laboratorio.
7. `politica-cookies/page.tsx` → revisar mención de almacenamiento local funcional (la sincronización de investigación **no** usa cookies).

---

## 3. Arquitectura propuesta

### 3.1 Dos capas de datos

```
┌────────────────────────── Navegador (privado) ──────────────────────────┐
│ localStorage: nombre, dominio en claro, servicio libre, ubicación libre, │
│ tipo de cliente, necesidad, competidores, consultas completas, notas,    │
│ otras empresas, informe, progreso, publicSessionId, estado de sync       │
└──────────────┬───────────────────────────────────────────────────────────┘
               │ snapshot estadístico (sin textos libres, sin dominio)
               ▼
┌── POST /api/lab-research (edge) ──┐    ┌──────── Supabase (UE) ────────┐
│ · límites de tamaño               │    │ RPC ai_visibility_lab_submit… │
│ · rate limit por IP               │───▶│ SECURITY DEFINER: valida,     │
│ · validación estricta (enums)     │    │ resuelve catálogos, upsert    │
│ · clave publishable solo servidor │    │ idempotente + poda, deriva    │
└───────────────────────────────────┘    │ contadores. RLS deny-all.     │
                                         └───────────────────────────────┘
```

### 3.2 Hash del dominio (seudonimización)

- Nueva utilidad `normalizeDomainForHash(raw)`: minúsculas → sin protocolo → sin `www.` → sin ruta/parámetros/barra final → **solo hostname** (`https://www.Ejemplo.com/contacto/?utm=x` → `ejemplo.com`).
  - Nota: la utilidad existente `normalizeDomain` conserva ruta y `www.` (uso de presentación); se mantiene intacta y se añade la nueva, específica para el hash.
- `sha256Hex(hostname)` con Web Crypto **en el cliente** → el dominio original nunca se envía a ningún servidor propio.
- Sin *pepper*: un secreto en el bundle no aporta nada y un secreto en servidor obligaría a enviar el dominio. **Consecuencia asumida:** un tercero con acceso a la base podría verificar por diccionario si un dominio concreto está presente. Por eso el copy y la política hablarán de **datos seudonimizados / identificador irreversible**, nunca de «anónimos».
- Usos permitidos: detectar repeticiones, recurrencia, evolución temporal, deduplicación. Prohibido: contacto comercial o cruce con leads.

### 3.3 Sincronización por snapshot (idempotencia por diseño)

- **Disparadores:** primer resultado guardado (crea la sesión remota), cada guardado/edición posterior (debounce ~1,5 s), finalización (marca `completed`), reanudación de sesión y evento `online` (reintentos).
- **Contenido del snapshot:** datos de sesión + **todas** las filas de la matriz de pruebas con su estado (`pending` incluidas una vez existe la sesión remota). Ventajas: los contadores se derivan en servidor de las mismas filas (imposible incoherencia), la edición y el caso «volver a dejar pendiente» quedan cubiertos, y el reintento es simplemente «reenviar el último snapshot».
- **Reconciliación en servidor:** upsert de sesión por `public_session_id`, de consultas por `(session, position)`, de resultados por `(session, query, engine)`; **poda** de filas de esa sesión ausentes del snapshot (p. ej. si se retira la consulta personalizada).
- **Reglas de identidad:**
  - `publicSessionId` (UUID v4 generado en cliente) = identificador de sincronización. No contiene información personal.
  - **Editar resultados** (misma medición) → mismo `publicSessionId`.
  - **«Repetir el análisis»** (`handleRepeat`) → **nuevo `publicSessionId`** (nueva sesión remota). Así una repetición no sobrescribe la medición anterior y el estudio longitudinal se conserva. La anterior queda `completed` (o `partial` según estuviera).
  - **Borrado local** → no toca la base de investigación (ver §7 del prompt / fase 8).
  - **Sesiones legacy** (creadas antes del despliegue, sin sector/categoría/provincia): no sincronizan. Solo participan sesiones nuevas con clasificación completa.
- **Fallos:** nunca bloquean el laboratorio. Estado local `pendingSync` + aviso discreto («Los resultados estadísticos se enviarán automáticamente cuando se recupere la conexión»); reintentos con backoff aprovechando los disparadores anteriores.

### 3.4 Seguridad

- RLS **activado** en las 7 tablas; **cero políticas** para `anon`/`authenticated` (denegación total de lectura/escritura directa) + `REVOKE` de privilegios directos.
- Única vía de escritura: función RPC `SECURITY DEFINER` (owner `postgres`, `search_path` fijado) con `GRANT EXECUTE` a `anon`. Valida enums, formatos (hash = 64 hex), topes (≤ 8 consultas, ≤ consultas × motores resultados), coherencia de fechas y descarta cualquier campo no permitido. Devuelve lo mínimo (`ok`).
- `public_session_id` actúa como token de escritura no adivinable de **esa** sesión. Sin lectura pública de ningún registro individual. Riesgo residual asumido (MVP): quien posea el UUID podría alterar las estadísticas de su propia sesión — sin PII y sin lectura, impacto limitado.
- Endpoint `/api/lab-research`: cap de tamaño (~32 KB), rate limit en memoria por IP, validación previa espejo de la RPC, clave publishable solo en servidor (patrón `/api/contact`). Refuerzo recomendado: regla de rate-limit WAF en Cloudflare.
- Vistas estadísticas: sin `GRANT` a roles públicos (consulta solo desde dashboard/MCP con `service_role`).

### 3.5 Catálogos: fuente de verdad

- La configuración local (TypeScript) sigue siendo la fuente de verdad de la UI (sin fetch a Supabase, sin estados de carga → «no complicar el MVP»).
- Las tablas de catálogo se **siembran con los mismos slugs** que usa el cliente; la RPC valida el slug contra el catálogo (`is_active`).
- Añadir un sector/motor = editar config local + migración de seed (documentado en la guía).

---

## 4. Esquema de base de datos propuesto

Prefijo común `ai_visibility_lab_`. Todas con `id uuid PK default gen_random_uuid()`, `created_at`/`updated_at timestamptz default now()` (trigger de `updated_at` compartido).

### 4.1 Catálogos

| Tabla | Campos | Seed inicial |
|---|---|---|
| `…_engines` | `slug unique, name, is_active, sort_order` | `chatgpt`, `gemini`, `perplexity` (slugs = ids de `config.ts`) |
| `…_sectors` | ídem | 16 sectores del prompt (`servicios-profesionales`, `salud-bienestar`, `construccion-reformas`, `inmobiliario`, `industria-fabricacion`, `comercio`, `hosteleria-restauracion`, `turismo-ocio`, `educacion-formacion`, `tecnologia`, `marketing-comunicacion`, `finanzas-seguros`, `legal`, `automocion`, `hogar-decoracion`, `otros`) |
| `…_service_categories` | ídem | Catálogo **global funcional** (~17): `venta-de-productos`, `fabricacion-o-produccion`, `instalacion-o-montaje`, `reparacion-o-mantenimiento`, `obra-o-reforma`, `consultoria-o-asesoria`, `diseno-o-creatividad`, `desarrollo-o-software`, `marketing-o-publicidad`, `formacion-o-ensenanza`, `salud-o-tratamientos`, `estetica-o-cuidado-personal`, `alojamiento-o-restauracion`, `transporte-o-logistica`, `alquiler-de-bienes-o-espacios`, `gestion-o-tramitacion`, `otros` (lista borrador; se cierra en Fase 1) |
| `…_provinces` | ídem | 50 provincias + `ceuta` + `melilla` + `toda-espana` + `varias-provincias` + `internacional` + `no-aplicable` |

Decisión sobre categorías de servicio: **catálogo global de tipo funcional** (qué hace la empresa) en lugar de categorías por sector. Combinado con el sector da una clasificación en dos ejes suficiente para el estudio, evita una taxonomía de 16×N y cumple la preferencia del prompt (categoría normalizada en Supabase + descripción libre solo local + `otros`).

### 4.2 `ai_visibility_lab_sessions` (una fila por análisis)

```
public_session_id uuid UNIQUE NOT NULL      -- id de sincronización (cliente)
domain_hash text NOT NULL CHECK (~ '^[0-9a-f]{64}$')
methodology_version text NOT NULL           -- p. ej. 'mvp-1.1'
status text CHECK IN ('started','partial','completed','abandoned')
sector_id / service_category_id / province_id  → FK a catálogos (NOT NULL)
known_competitors_registered smallint CHECK (0..10)
started_at timestamptz NOT NULL             -- createdISO local
completed_at timestamptz NULL
submitted_at timestamptz NOT NULL default now()  -- primer envío
total_queries / total_tests / completed_tests / evaluable_tests /
pending_tests / non_evaluable_tests  smallint CHECK (>= 0)  -- derivados por la RPC
is_complete boolean NOT NULL default false
is_excluded boolean NOT NULL default false  -- QA/spam/obsoleto (interno, futuro)
```

- Índices: `domain_hash`, `sector_id`, `province_id`, `service_category_id`, `status`, `created_at`.
- La sesión remota **solo se crea con el primer resultado guardado** (nunca por visitar la página ni por pulsar «Empezar»).
- `abandoned` no se establece activamente en el MVP: se deriva en vistas (parcial sin actividad > 30 días). El CHECK lo admite para el futuro.
- Contadores y `status`/`is_complete` los **recalcula la RPC** a partir de las filas del snapshot (el cliente no puede introducir incoherencias).

### 4.3 `ai_visibility_lab_queries` (una fila por consulta de la sesión)

```
session_id FK → sessions ON DELETE CASCADE
position smallint CHECK (1..8)      -- q1→1 … q4→4
query_type text CHECK IN ('discovery','recommendation','specific_need','custom')
is_custom boolean
UNIQUE (session_id, position)
```

Sin texto de consulta. De la personalizada solo consta su existencia.

### 4.4 `ai_visibility_lab_results` (una fila por consulta × motor)

```
session_id FK, query_id FK, engine_id FK (ON DELETE CASCADE vía sesión)
evaluation_status text CHECK IN ('evaluable','non_evaluable','pending')
appearance_level text NULL CHECK IN ('not_present','mentioned','recommended','unknown')
appeared_as_source text NULL CHECK IN ('yes','no','unknown','not_applicable')
information_accuracy text NULL CHECK IN ('correct','partially_incorrect','incorrect',
                                         'insufficient_information','unknown','not_applicable')
known_competitor_appeared text NULL CHECK IN ('yes','no','unknown','not_applicable')
known_competitors_count smallint NULL CHECK (0..10)
other_companies_appeared boolean NULL
recorded_at timestamptz NULL
UNIQUE (session_id, query_id, engine_id)   -- idempotencia
CHECK: si evaluation_status='pending' → campos de resultado NULL;
       si no → appearance_level NOT NULL (y coherencias not_applicable)
```

Nunca se guarda **qué** competidor apareció (solo recuento y presencia).

### 4.5 Mapeo de valores local (ES) → investigación (EN)

| Local | Investigación |
|---|---|
| `descubrimiento` / `recomendacion` / `necesidad` / `personalizada` | `discovery` / `recommendation` / `specific_need` / `custom` |
| prueba `pendiente` | `evaluation_status='pending'`, resto NULL |
| guardada + `no_evaluable` | `non_evaluable`, `appearance='unknown'`, fuente/exactitud `not_applicable` |
| guardada + `no_aparece` | `evaluable`, `not_present`, fuente/exactitud `not_applicable` (la UI no las pregunta) |
| guardada + `mencionada`/`recomendada` | `evaluable`, `mentioned`/`recommended` |
| fuente `si`/`no`/`no_seguro`/sin responder | `yes`/`no`/`unknown`/`unknown` |
| exactitud `correcta`/`parcial`/`incorrecta`/`insuficiente`/`no_seguro`/sin responder | `correct`/`partially_incorrect`/`incorrect`/`insufficient_information`/`unknown`/`unknown` |
| competidores: marcados > 0 | `known_competitor_appeared='yes'` + `count` |
| «ningún competidor» | `'no'`, count 0 |
| «no estoy seguro» | `'unknown'` |
| sin competidores registrados en el negocio | `'not_applicable'` |
| `otrasEmpresasFlag` | `other_companies_appeared` (boolean; el texto libre no viaja) |

### 4.6 Estadísticas y comprobación (§5 y §14 del prompt)

- **Vista `ai_visibility_lab_statistics`** (vista normal, no materializada: el volumen esperado a 1-2 años no lo justifica y evita jobs de refresco; migrar a materializada es trivial si hiciera falta): `sessions_total`, `sessions_completed`, `sessions_partial`, `queries_total`, `results_total`, `results_evaluable`, `first_session_at`, `last_session_at`, `distinct_sectors`, `distinct_provinces`, `distinct_domain_hashes`, `repeat_domain_sessions` (= sesiones totales − hashes distintos). Excluye `is_excluded`.
- **Vistas internas de comprobación:** por motor, por sector, por provincia y evolución mensual, con % de mención, recomendación, citación, información incorrecta y frecuencia de competidores (calculados sobre pruebas `evaluable`). Sin exposición pública; consultas de ejemplo documentadas.

---

## 5. Decisiones tomadas (y puntos que puedes vetar)

| # | Decisión | Alternativa descartada | Motivo |
|---|---|---|---|
| D1 | Endpoint propio `/api/lab-research` + RPC (doble validación) | Llamada directa navegador→Supabase | Coherencia con `/api/contact`, rate limit, clave fuera del bundle, un solo punto de endurecimiento |
| D2 | Sincronización por **snapshot completo** reconciliado | Operaciones incrementales por resultado | Idempotencia y reintentos triviales; imposible desincronizar contadores |
| D3 | Hash SHA-256 **en cliente**, sin pepper | Hash en servidor con secreto | El dominio original no debe salir del navegador (requisito explícito) |
| D4 | Filas `pending` incluidas en el snapshot (tras crear la sesión) | Enviar solo guardadas | Cubre «volver a dejar pendiente», contadores derivables en servidor |
| D5 | «Repetir el análisis» genera **nueva sesión remota** | Reutilizar la misma | Preserva la medición anterior (estudio longitudinal) |
| D6 | Catálogo de categorías **global funcional** | Categorías por sector | Simplicidad MVP; sector ya aporta el eje vertical. **← revisable** |
| D7 | Catálogos: fuente de verdad **local** + seeds espejo | Leer catálogos desde Supabase | Sin fetch/estados de carga; el prompt pide no complicar |
| D8 | Versión metodológica pasa a `mvp-1.1` | Mantener `1.0` | El protocolo añade clasificación obligatoria → los datasets deben distinguirse. **← revisable** |
| D9 | Conservación propuesta: investigación mientras el estudio esté activo con **revisión bienal documentada**; logs técnicos ≤ 90 días; contacto y datos locales, regímenes ya existentes | Plazo fijo corto | Estudio longitudinal explícito; se documenta sin inventar cumplimiento. **← revisable y a validar profesionalmente** |
| D10 | Base jurídica **propuesta**: interés legítimo (art. 6.1.f RGPD) sobre datos seudonimizados con transparencia previa y contribución como contraprestación del servicio gratuito | Consentimiento con casilla | El prompt pide no usar casilla si no es necesaria; se redacta con prudencia, sin afirmar cumplimiento, y se marca para revisión profesional |
| D11 | Sesiones legacy (pre-despliegue) no sincronizan | Pedirles los campos a mitad | Menos fricción y menos casos raros; volumen residual |
| D12 | `is_excluded` en sesiones desde el día 1 | Añadirlo más tarde | Barato ahora; prepara limpieza de spam/obsoletos sin re-migrar |

---

## 6. Fases de implementación (subtareas)

Cada fase = commits propios + documento `docs/lab-investigacion-phaseN-*.md` + build y lint en verde. Las fases 1-6 son **inertes en producción** (nada visible ni recogida activa). Las fases 7-9 activan la recogida y la transparencia y deben desplegarse **juntas**.

### Fase 1 — Esquema en Supabase (migración 1)
- Crear `next_app/supabase/migrations/` y la migración de esquema: 4 catálogos + `sessions` + `queries` + `results`, constraints, índices, FKs, trigger `updated_at`, RLS activado sin políticas, `REVOKE` a `anon`/`authenticated`, seeds de catálogos.
- Aplicar vía MCP (`apply_migration`) sobre `gzrgxkjvxaflteilmjuq`; verificar con `list_tables` y `get_advisors`.
- **Hecho cuando:** tablas y seeds existen; el acceso directo con clave publishable devuelve denegación; advisors sin hallazgos nuevos.

### Fase 2 — RPC de ingesta (migración 2)
- Función `ai_visibility_lab_submit_snapshot(payload jsonb)` `SECURITY DEFINER`: validación completa (enums, hash, topes, fechas coherentes), resolución de slugs→FK, upsert sesión/consultas/resultados, poda de filas ausentes, derivación de contadores y estado, `GRANT EXECUTE` solo a `anon`.
- Pruebas SQL vía MCP con datos claramente ficticios: creación, actualización idempotente (mismo snapshot × 2 → mismas filas), edición, payload inválido (rechazo), poda, transición partial→completed→partial. Limpieza inmediata de los datos de prueba.
- **Hecho cuando:** la matriz de pruebas SQL pasa y no quedan filas de prueba.

### Fase 3 — Vistas de estadísticas y comprobación (migración 3)
- `ai_visibility_lab_statistics` + vistas internas (motor/sector/provincia/mensual) sin grants públicos.
- Documentar consultas de comprobación (§14) en la guía.
- **Hecho cuando:** las vistas devuelven valores correctos contra un juego de datos ficticio (creado por RPC y borrado al final).

### Fase 4 — Endpoint `/api/lab-research`
- `app/api/lab-research/route.ts` (edge): cap de tamaño, rate limit en memoria por IP, validación estricta espejo, llamada a la RPC con clave publishable en servidor, errores sin fugas.
- **Hecho cuando:** petición válida crea/actualiza datos (ficticios, luego borrados); inválida recibe 400; ráfaga recibe 429; build y lint verdes.

### Fase 5 — Cliente: fundamentos de investigación (inerte)
- `lib/aiVisibilityLab/research/`: `catalogs.ts` (sectores/categorías/provincias con slugs = seeds), `hash.ts` (`normalizeDomainForHash`, `sha256Hex`), `snapshot.ts` (mapeador puro `LabSession → payload`, con el mapeo §4.5), tipos (`research` opcional en `LabSession`), `storage.ts` tolerante con sesiones antiguas, constantes en `config.ts` (versión `mvp-1.1`, ruta del endpoint).
- **Hecho cuando:** build/lint verdes, cero cambios visibles, sesiones antiguas siguen cargando.

### Fase 6 — Cliente: motor de sincronización
- `research/sync.ts`: crear-en-primer-guardado, debounce ~1,5 s, reintentos (al guardar, al reanudar, al volver online), tope de intentos, estado persistido junto a la sesión.
- Integración en `VisibilityLab.tsx` (`handleCommit`, `handleGoReport`, `handleRepeat` → nuevo `publicSessionId`, `confirmReset`), aviso discreto de sincronización pendiente.
- Inerte por construcción: solo sincroniza si `session.research` está completo (imposible hasta la fase 7).
- **Hecho cuando:** con datos de prueba locales, el ciclo completo sincroniza y reintenta sin bloquear la UI.

### Fase 7 — Formulario: sector, categoría de servicio y provincia
- `StageBusiness`: 3 selectores obligatorios (con «Otros»/«No aplicable»), texto breve «sirven para clasificar los resultados del estudio», validación, guardado en `session.research` (no en `business`); hash recalculado si cambia el dominio. La ubicación y el servicio libres se mantienen solo para generar consultas.
- **Hecho cuando:** no se puede continuar sin clasificación; el formulario no se percibe pesado (3 selects, sin campos de texto nuevos).

### Fase 8 — Copy y transparencia
- `StageIntro`: bloque «Un laboratorio que también construye conocimiento» (copy del prompt §10) + desplegable «Ver qué datos se comparten» (lista se comparte / no se comparte) + aclaración junto a «Iniciar el laboratorio».
- Aviso durante el laboratorio: «Los datos privados del análisis permanecen en este dispositivo. Solo se envían los resultados estadísticos indicados al comenzar.»
- `StageReport`: «Los resultados estadísticos de este análisis ya forman parte de la base de investigación…».
- `ResetConfirm`: «Esto borrará el análisis guardado en este dispositivo. Los resultados estadísticos ya incorporados al estudio se conservarán de acuerdo con la política de privacidad.»
- Actualizar `LIMITATION_TEXTS.privacyNotice`, texto de `StageBusiness`, FAQ de la página (y su JSON-LD), comentarios obsoletos en `types.ts`/`storage.ts`/`analytics.ts`.
- **Hecho cuando:** no queda ningún texto que afirme que «nada sale del dispositivo».

### Fase 9 — Política de privacidad y cookies
- Nueva sección en `politica-privacidad`: responsable, finalidad (estudio/estadística), datos recogidos y NO recogidos, hash (seudonimización, no anonimato), base jurídica propuesta (D10), carácter necesario de la contribución, conservación (D9), Supabase UE como encargado, destinatarios, derechos (supresión: localizable recalculando el hash a partir del dominio que indique el interesado), datos agregados y publicaciones futuras. Actualizar `lastUpdate`.
- Revisión de `politica-cookies`: la sincronización no usa cookies ni depende del consentimiento analítico; verificar la mención del almacenamiento local funcional.
- Analítica (§18): confirmar que ningún evento GA4 nuevo transporta hash/sector/provincia/categoría/resultados/ID remoto.
- **Hecho cuando:** ambas políticas reflejan el tratamiento real y el envío funcional es independiente del banner de cookies.

### Fase 10 — QA integral, limpieza y cierre
- Matriz §7 (más abajo), `npm run lint`, `npm run build` (y `pages:build` si procede), borrado verificado de todos los datos de prueba (lista de `public_session_id` ficticios registrada en el doc de fase), actualización de `CHANGELOG.md`/`VERSION` según convención del repo, informe final con la estructura del §22 del prompt.

---

## 7. Matriz de pruebas (QA de la fase 10)

| Caso | Resultado esperado |
|---|---|
| Visitar la página / pulsar «Empezar» sin guardar nada | Ninguna fila remota |
| Guardar el primer resultado | Sesión remota creada con clasificación + matriz completa |
| Guardar el mismo resultado dos veces / doble clic / recarga + reenvío | Misma fila, sin duplicados (idempotencia) |
| Editar un resultado guardado | La fila se actualiza; contadores recalculados |
| Dejar pendiente un resultado antes guardado | `pending` en remoto; contadores coherentes |
| Retirar la consulta personalizada tras sincronizar | Filas de q4 podadas en remoto |
| Terminar todas las pruebas | `completed` + `completed_at`; volver a editar → `partial` |
| Repetir el análisis | Nueva sesión remota; la anterior intacta |
| Sin conexión al guardar | Laboratorio sigue; aviso discreto; reintento posterior sincroniza |
| Borrado local | localStorage limpio; datos de investigación intactos; copy correcto |
| Sesión legacy sin clasificación | No sincroniza, no rompe |
| SELECT/INSERT/UPDATE directos con clave publishable | Denegado (RLS) |
| Payload manipulado (valores fuera de enum, hash inválido, topes) | 400 / rechazo en RPC |
| Ráfaga de peticiones | 429 |
| Dos análisis del mismo dominio (hashes iguales) | `distinct_domain_hashes` y `repeat_domain_sessions` correctos |
| Dominio imposible de normalizar | Sesión sin sincronizar o rechazo controlado, sin romper la UI |

---

## 8. Riesgos y puntos para revisión profesional

1. **Hash ≠ anonimato:** verificable por diccionario para dominios conocidos. Tratado como dato seudonimizado en copy y política. (Mitigación de lenguaje, no técnica.)
2. **Base jurídica sin casilla (D10):** propuesta razonada, pero **requiere revisión por un profesional** (test de ponderación de interés legítimo). El copy evitará afirmar cumplimiento.
3. **`public_session_id` como token de escritura:** riesgo aceptado en MVP (sin lectura, sin PII, UUID no adivinable, rate limit).
4. **Datos falsos/spam:** herramienta manual → imposible impedirlo del todo. Mitigación: validación estricta + rate limit + `is_excluded` para depuración futura.
5. **Rate limit en memoria (edge):** efímero por isolate; recomendar regla WAF en Cloudflare (documentada, como en `/api/contact`).
6. **Conservación (D9):** plazo propuesto, no validado jurídicamente; queda explícito en la política y en el informe final.

## 9. Fuera de alcance (sin cambios respecto al prompt §19)

Panel público, contadores públicos, informes sectoriales automáticos, cuentas de usuario, APIs de IA, respuestas completas, capturas, seguimiento por correo, pago, CRM, contacto comercial desde datos del laboratorio, cruce con formularios, identificación del dominio, rankings y publicación de resultados individuales.

## 10. Criterios de aceptación

Los del §20 del prompt, íntegros, verificados en la fase 10 y reportados en el informe final (§22). En particular: la herramienta conserva su funcionamiento actual; transparencia previa; ningún dato privado viaja nunca (nombre, dominio en claro, competidores, consultas, notas, respuestas, diagnóstico, contacto); sesión remota solo con el primer resultado; idempotencia; RLS sin lectura pública; estadísticas consultables; migraciones reproducibles; sin datos de prueba; lint y build en verde.
