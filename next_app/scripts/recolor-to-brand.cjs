/*
 * Remapea los tonos fríos (azul/morado/magenta) de una imagen al verde
 * de marca, conservando luminosidad. Uso:
 *   node recolor-to-brand.js <input> <output.webp> [satFactor]
 */
const sharp = require('sharp');

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  switch (max) {
    case r: h = ((g - b) / d + (g < b ? 6 : 0)); break;
    case g: h = (b - r) / d + 2; break;
    default: h = (r - g) / d + 4;
  }
  return [h * 60, s, l];
}

function hslToRgb(h, s, l) {
  h = ((h % 360) + 360) % 360 / 360;
  if (s === 0) { const v = Math.round(l * 255); return [v, v, v]; }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const f = (t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [f(h + 1 / 3), f(h), f(h - 1 / 3)].map((v) => Math.round(v * 255));
}

const smoothstep = (e0, e1, x) => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};

async function main() {
  const [input, output, satArg] = process.argv.slice(2);
  const satFactor = satArg ? parseFloat(satArg) : 0.88;
  const { data, info } = await sharp(input).raw().toBuffer({ resolveWithObject: true });
  const { channels } = info;

  for (let i = 0; i < data.length; i += channels) {
    const [h, s, l] = rgbToHsl(data[i], data[i + 1], data[i + 2]);
    // Rango frío 185°-345° con bordes suaves para evitar banding
    const f = smoothstep(185, 205, h) * (1 - smoothstep(330, 345, h));
    if (f > 0 && s > 0.02) {
      // [205,330] → [130,170]: verdes con variación para no aplanar gradientes
      const t = Math.min(1, Math.max(0, (h - 205) / (330 - 205)));
      const targetH = 130 + t * 40;
      const newH = h + f * (targetH - h);
      const newS = s * (1 - (1 - satFactor) * f);
      const [r, g, b] = hslToRgb(newH, newS, l);
      data[i] = r; data[i + 1] = g; data[i + 2] = b;
    }
  }

  await sharp(Buffer.from(data), { raw: info }).webp({ quality: 84 }).toFile(output);
  console.log('ok', output, `${info.width}x${info.height}`);
}

main().catch((err) => { console.error(err); process.exit(1); });
