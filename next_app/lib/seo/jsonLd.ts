/**
 * Serializa un objeto a JSON seguro para inyectar dentro de un <script type="application/ld+json">.
 *
 * Escapa las secuencias que permitirían romper el tag <script> o inyectar HTML:
 *   - `<` → `\u003C`  (evita `</script>` y `<!--`)
 *   - `>` → `\u003E`  (evita cierre anticipado y `-->`)
 *   - `&` → `\u0026`  (evita entidades HTML)
 *   - `\u2028` / `\u2029` → formas escapadas (válidas en JSON pero rompen JS clásico)
 *
 * El resultado sigue siendo JSON válido (los escapes \uXXXX son legales),
 * por lo que los crawlers (Google, etc.) lo parsean correctamente.
 */
export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003C')
    .replace(/>/g, '\\u003E')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}
