/**
 * POST /api/contact
 *
 * Server-side endpoint for the public contact / budget form. Centralises:
 *   - Input validation (length limits matching the RLS WITH CHECK on
 *     `public.leads_contacto`).
 *   - Best-effort in-memory rate limiting per client IP.
 *   - Supabase credentials (no longer shipped to the browser bundle).
 *
 * Notes
 * - The Supabase publishable key is "publishable" by design (safe to expose
 *   long-term), but moving the call server-side gives us a single choke point
 *   to layer Turnstile / CAPTCHA / stricter abuse controls without touching
 *   the client.
 * - Rate limiting is in-memory: it resets on cold starts and does not share
 *   state across regions / lambda instances. It only stops trivial floods.
 *   For real abuse mitigation, configure a Cloudflare WAF rate-limit rule on
 *   `/api/contact`.
 */

import { NextRequest, NextResponse } from 'next/server';

// Public env vars are intentionally read here (server-side) so that the
// publishable key never has to ship inside the client JS bundle. We fall back
// to the previously-hardcoded values to avoid breaking the contact form if
// the env vars are not configured yet in Vercel; rotate the key and remove the
// fallback once new env vars are deployed.
const SUPABASE_URL =
  process.env.SUPABASE_URL ?? 'https://gzrgxkjvxaflteilmjuq.supabase.co';
const SUPABASE_PUBLISHABLE_KEY =
  process.env.SUPABASE_PUBLISHABLE_KEY ??
  'sb_publishable_-rNRG-bfifNaR--8DkvKvA_xXLh4eil';

// Allowed enum values for the form. Kept narrow so the API rejects junk before
// even calling Supabase.
const SERVICIOS_INTERES_PERMITIDOS = new Set([
  'Auditoría',
  'Diseño Web',
  'Mantenimiento',
  'SEO/GEO',
  'Automatización',
]);
const SERVICIOS_ADICIONALES_PERMITIDOS = new Set([
  'Mantenimiento',
  'Formación',
  'No',
]);
const IDENTIDAD_VISUAL_PERMITIDOS = new Set([
  '',
  'Si, completa',
  'Tengo algo base',
  'No, necesito una',
  'Quiero rediseñar',
]);
const DONDE_CONOCIDO_PERMITIDOS = new Set([
  '',
  'Google',
  'Redes Sociales',
  'Recomendación',
  'Otros',
]);

const MAX_BODY_BYTES = 16 * 1024; // 16 KB is more than enough for this form.

// Limits intentionally mirror the RLS WITH CHECK policy in Supabase so that
// every rejection happens at the API layer with a clear error before hitting
// the database.
const LIMITS = {
  nombre: { min: 2, max: 100 },
  email: { min: 5, max: 254 },
  telefono: { max: 30 },
  mensaje: { max: 5000 },
  empresa: { max: 200 },
  url_origen: { max: 500 },
  identidad_visual: { max: 200 },
  fecha_limite: { max: 100 },
  donde_conocido: { max: 200 },
  servicios_array: { max: 20 },
} as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TELEFONO_REGEX = /^[0-9+ \-]{9,15}$/;
const URL_REGEX = /^https?:\/\//i;

type RawBody = Record<string, unknown>;

type LeadInsert = {
  nombre: string;
  email: string;
  telefono: string | null;
  servicios_interes: string[];
  identidad_visual: string | null;
  servicios_adicionales: string[];
  fecha_limite: string | null;
  donde_conocido: string | null;
  url_origen: string | null;
  mensaje: string | null;
  estado: 'nuevo';
};

// ---------------------------------------------------------------------------
// In-memory rate limiter (best-effort; see header note).
// ---------------------------------------------------------------------------

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX_REQUESTS = 20; // per IP per window

type RateBucket = { count: number; resetAt: number };
const rateBuckets = new Map<string, RateBucket>();

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const first = forwardedFor.split(',')[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  return 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const bucket = rateBuckets.get(ip);
  if (!bucket || bucket.resetAt < now) {
    rateBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  bucket.count += 1;
  return bucket.count > RATE_LIMIT_MAX_REQUESTS;
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

function asString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function asStringArray(value: unknown, allowed: Set<string>): string[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  for (const item of value) {
    if (typeof item !== 'string') continue;
    if (!allowed.has(item)) continue;
    seen.add(item);
    if (seen.size >= LIMITS.servicios_array.max) break;
  }
  return Array.from(seen);
}

function validate(body: RawBody): { ok: true; lead: LeadInsert } | { ok: false; error: string } {
  const nombre = asString(body.nombre).trim();
  const email = asString(body.email).trim().toLowerCase();
  const telefonoRaw = asString(body.telefono).trim();
  const identidadVisual = asString(body.identidad_visual).trim();
  const fechaLimite = asString(body.fecha_limite).trim();
  const dondeConocido = asString(body.donde_conocido).trim();
  const urlOrigen = asString(body.url_origen).trim();
  const mensaje = asString(body.mensaje).trim();

  if (nombre.length < LIMITS.nombre.min || nombre.length > LIMITS.nombre.max) {
    return { ok: false, error: 'nombre inválido' };
  }
  if (
    email.length < LIMITS.email.min ||
    email.length > LIMITS.email.max ||
    !EMAIL_REGEX.test(email)
  ) {
    return { ok: false, error: 'email inválido' };
  }
  if (telefonoRaw.length > LIMITS.telefono.max) {
    return { ok: false, error: 'teléfono inválido' };
  }
  if (telefonoRaw && !TELEFONO_REGEX.test(telefonoRaw)) {
    return { ok: false, error: 'teléfono inválido' };
  }
  if (!IDENTIDAD_VISUAL_PERMITIDOS.has(identidadVisual)) {
    return { ok: false, error: 'identidad_visual inválida' };
  }
  if (!DONDE_CONOCIDO_PERMITIDOS.has(dondeConocido)) {
    return { ok: false, error: 'donde_conocido inválido' };
  }
  if (fechaLimite.length > LIMITS.fecha_limite.max) {
    return { ok: false, error: 'fecha_limite inválida' };
  }
  if (urlOrigen) {
    if (urlOrigen.length > LIMITS.url_origen.max || !URL_REGEX.test(urlOrigen)) {
      return { ok: false, error: 'url_origen inválida' };
    }
  }
  if (mensaje.length > LIMITS.mensaje.max) {
    return { ok: false, error: 'mensaje inválido' };
  }

  const serviciosInteres = asStringArray(
    body.servicios_interes,
    SERVICIOS_INTERES_PERMITIDOS
  );
  if (serviciosInteres.length === 0) {
    return { ok: false, error: 'servicios_interes vacío' };
  }
  const serviciosAdicionales = asStringArray(
    body.servicios_adicionales,
    SERVICIOS_ADICIONALES_PERMITIDOS
  );

  return {
    ok: true,
    lead: {
      nombre,
      email,
      telefono: telefonoRaw || null,
      servicios_interes: serviciosInteres,
      identidad_visual: identidadVisual || null,
      servicios_adicionales: serviciosAdicionales,
      fecha_limite: fechaLimite || null,
      donde_conocido: dondeConocido || null,
      url_origen: urlOrigen || null,
      mensaje: mensaje || null,
      estado: 'nuevo',
    },
  };
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

export const runtime = 'edge';

export async function POST(request: NextRequest): Promise<NextResponse> {
  // Reject oversized bodies before parsing.
  const contentLength = Number(request.headers.get('content-length') ?? '0');
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'payload demasiado grande' }, { status: 413 });
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'demasiadas solicitudes, prueba más tarde' },
      { status: 429 }
    );
  }

  let body: RawBody;
  try {
    body = (await request.json()) as RawBody;
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
  }

  const result = validate(body);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const supabaseResponse = await fetch(
    `${SUPABASE_URL}/rest/v1/leads_contacto`,
    {
      method: 'POST',
      headers: {
        apikey: SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify([result.lead]),
    }
  );

  if (!supabaseResponse.ok) {
    // Do not leak Supabase internals to the client.
    const detail = await supabaseResponse.text().catch(() => '');
    console.error('[api/contact] Supabase insert failed', {
      status: supabaseResponse.status,
      detail,
    });
    return NextResponse.json(
      { error: 'no se pudo guardar el mensaje' },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
