/**
 * Genera las imagenes Open Graph del sitio.
 *
 * Se ejecuta DESPUES del build y lee el HTML ya compilado, no el codigo fuente.
 * De ahi saca, para cada pagina, la imagen que pide, su titulo y su descripcion.
 * Como `lib/seo/ogImage.ts` es quien decide esas URLs, el generador solo produce
 * lo que el sitio realmente reclama: no hay listas que mantener ni forma de que
 * una pagina nueva se quede sin tarjeta.
 *
 * Las paginas con imagen propia (openGraphImage explicito) no apuntan a /og/,
 * asi que este script las ignora y sus imagenes hechas a mano se conservan.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE_URL = fs.readFileSync(path.join(ROOT, 'lib/seo/entity.ts'), 'utf8')
  .match(/export const SITE_URL = '([^']+)'/)?.[1];
if (!SITE_URL) throw new Error('No he podido leer SITE_URL de lib/seo/entity.ts');

// Tokens de styles/main.css. Si cambia la paleta de la web, cambian aqui.
const C = {
  bg: '#FDFCFA', ink: '#1D1B16', inkSoft: '#57534A', inkMuted: '#837D70',
  border: '#E6DFD0', accent: '#145C35', accentSoft: '#DBEEE0',
};

// Etiqueta por familia de URL. Es una regla, no una lista de paginas: las
// rutas que no encajan simplemente salen sin etiqueta.
const KICKERS = [
  [/^\/blog\/./, 'Blog'],
  [/^\/proyectos\/./, 'Proyecto'],
  [/^\/(diseno-web|servicio-seo|desarrollo-web-a-medida|mantenimiento-web-valencia|migraciones-web|auditoria-gratuita|pricing|automatizacion)/, 'Servicio'],
];

const FONT_DIR = path.join(ROOT, 'scripts/og-fonts');
const FONTS = [
  { name: 'Fraunces', data: fs.readFileSync(path.join(FONT_DIR, 'Fraunces-Display560.ttf')), weight: 560, style: 'normal' },
  { name: 'Instrument', data: fs.readFileSync(path.join(FONT_DIR, 'InstrumentSans-400.ttf')), weight: 400, style: 'normal' },
  { name: 'Instrument', data: fs.readFileSync(path.join(FONT_DIR, 'InstrumentSans-600.ttf')), weight: 600, style: 'normal' },
];

// El isotipo se rasteriza del mismo SVG que usa el resto del sitio, para que no
// haya una copia que pueda quedarse vieja.
const LOGO_PNG = new Resvg(
  fs.readFileSync(path.join(ROOT, 'public/assets/images/logo-isotipo.svg'), 'utf8'),
  { fitTo: { mode: 'height', value: 320 } },
).render().asPng();
const LOGO = `data:image/png;base64,${Buffer.from(LOGO_PNG).toString('base64')}`;
const LOGO_RATIO = 481 / 678; // el isotipo es mas alto que ancho

// Satori acepta el arbol como objetos planos, asi no hace falta transpilar JSX.
const h = (type, props = {}, ...kids) => ({
  type,
  props: { ...props, children: kids.length === 0 ? undefined : kids.length === 1 ? kids[0] : kids },
});

function card({ kicker, title, subtitle }) {
  return h('div', {
    style: { width: 1200, height: 630, display: 'flex', backgroundColor: C.bg, fontFamily: 'Instrument' },
  },
    h('div', { style: { width: 14, height: '100%', backgroundColor: C.accent, display: 'flex' } }),
    h('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', padding: '58px 72px 56px 64px' } },
      // Centrado en el espacio libre: los titulares cortos no dejan hueco muerto.
      h('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' } },
        kicker && h('div', {
          style: {
            display: 'flex', alignSelf: 'flex-start', backgroundColor: C.accentSoft, color: C.accent,
            fontSize: 21, fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase',
            padding: '11px 20px', borderRadius: 999, marginBottom: 34,
          },
        }, kicker),
        h('div', {
          style: {
            display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
            fontFamily: 'Fraunces', fontWeight: 560, fontSize: 66, lineHeight: 1.12,
            letterSpacing: '-0.015em', color: C.ink,
          },
        }, title),
        subtitle && h('div', {
          style: {
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
            marginTop: 26, fontSize: 27, lineHeight: 1.45, color: C.inkSoft,
          },
        }, subtitle),
      ),
      h('div', {
        style: {
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderTop: `1px solid ${C.border}`, paddingTop: 26,
        },
      },
        h('div', { style: { display: 'flex', alignItems: 'center' } },
          h('img', { src: LOGO, width: Math.round(64 * LOGO_RATIO), height: 64, style: { marginRight: 18 } }),
          h('div', { style: { display: 'flex', flexDirection: 'column' } },
            h('div', { style: { fontSize: 23, fontWeight: 600, color: C.ink } }, 'Carles del Olmo'),
            h('div', { style: { fontSize: 19, color: C.inkMuted, marginTop: 3 } }, 'carlesdelolmo.com'),
          ),
        ),
      ),
    ),
  );
}

const decode = (s) => s
  .replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ');

const meta = (html, prop) =>
  html.match(new RegExp(`<meta property="${prop}" content="([^"]*)"`))?.[1] ??
  html.match(new RegExp(`<meta name="${prop}" content="([^"]*)"`))?.[1];

/** Quita el sufijo de marca: el nombre ya sale en el pie de la tarjeta. */
function cleanTitle(raw) {
  const parts = raw.split(' | ').filter((p) => !/Carles del Olmo/i.test(p));
  return (parts.length ? parts.join(' | ') : raw).trim();
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

async function main() {
  const buildDir = path.join(ROOT, '.next/server/app');
  if (!fs.existsSync(buildDir)) {
    throw new Error('No encuentro .next/server/app. Ejecuta el build antes que este script.');
  }

  // Escribe donde vaya a servirse: en el empaquetado de Cloudflare si existe,
  // y si no en public/ para que funcione en local.
  const staticOut = path.join(ROOT, '.vercel/output/static');
  const targets = [fs.existsSync(staticOut) ? path.join(staticOut, 'og') : path.join(ROOT, 'public/og')];

  const prefix = `${SITE_URL}/og/`;
  const jobs = new Map();

  for (const file of walk(buildDir)) {
    const html = fs.readFileSync(file, 'utf8');
    const image = meta(html, 'og:image');
    if (!image?.startsWith(prefix)) continue; // imagen propia o sin OG: no se toca

    const rel = image.slice(prefix.length);
    if (jobs.has(rel)) continue;

    const pathname = new URL(meta(html, 'og:url') || SITE_URL).pathname;
    jobs.set(rel, {
      kicker: KICKERS.find(([re]) => re.test(pathname))?.[1] ?? null,
      title: cleanTitle(decode(meta(html, 'og:title') || '')),
      subtitle: decode(meta(html, 'og:description') || ''),
    });
  }

  if (jobs.size === 0) throw new Error('Ninguna pagina pide una imagen en /og/. Algo va mal.');

  for (const dir of targets) fs.rmSync(dir, { recursive: true, force: true });

  let n = 0;
  for (const [rel, data] of jobs) {
    if (!data.title) throw new Error(`La pagina de ${rel} no tiene og:title`);
    const svg = await satori(card(data), { width: 1200, height: 630, fonts: FONTS });
    const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
    for (const dir of targets) {
      const dest = path.join(dir, rel);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, png);
    }
    n += 1;
  }

  console.log(`OG: ${n} tarjetas generadas en ${targets.map((t) => path.relative(ROOT, t)).join(', ')}`);
}

await main();
