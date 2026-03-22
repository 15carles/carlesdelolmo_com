#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';

const rootDir = process.cwd();
const projectsDir = path.join(rootDir, 'content', 'projects');
const checkOnly = process.argv.includes('--check');

function splitFrontmatter(raw) {
  if (!raw.startsWith('---\n')) {
    return { frontmatter: '', body: raw };
  }
  const end = raw.indexOf('\n---\n', 4);
  if (end === -1) {
    return { frontmatter: '', body: raw };
  }
  return {
    frontmatter: raw.slice(4, end),
    body: raw.slice(end + 5),
  };
}

function extractClientLogo(frontmatter) {
  const block = frontmatter.match(/(?:^|\n)client:\s*\n([\s\S]*?)(?:\n[a-zA-Z0-9_]+\s*:|\n?$)/);
  if (!block) return '';
  const logo = block[1].match(/\n\s{2,}logo:\s*([^\n]+)/);
  return logo ? logo[1].trim() : '';
}

function escapeAttrValue(value = '') {
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\r?\n/g, '\\n');
}

function parseQuotedAttrs(rawAttrs) {
  const attrs = {};
  const attrRegex = /([a-zA-Z0-9_]+)\s*=\s*"((?:\\"|[^"])*)"/g;
  let match;
  while ((match = attrRegex.exec(rawAttrs)) !== null) {
    attrs[match[1]] = match[2]
      .replace(/\\n/g, '\n')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\');
  }
  return attrs;
}

function readAttr(rawAttrs, key) {
  const quoted = rawAttrs.match(new RegExp(`${key}\\s*=\\s*"((?:\\\\"|[^"])*)"`));
  if (quoted) return quoted[1].replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\\\/g, '\\');

  const bare = rawAttrs.match(new RegExp(`${key}\\s*=\\s*([^\\s\"]]*)`));
  if (bare) return bare[1].trim();

  return undefined;
}

function hasAttr(rawAttrs, key) {
  return new RegExp(`\\b${key}\\s*=`).test(rawAttrs);
}

function removeAttr(rawAttrs, key) {
  return rawAttrs
    .replace(new RegExp(`\\s+${key}\\s*=\\s*"(?:\\\\"|[^"])*"`, 'g'), '')
    .replace(new RegExp(`\\s+${key}\\s*=\\s*[^\\s\"][^\\s]*`, 'g'), '');
}

function ensureAttr(rawAttrs, key, valueLiteral) {
  if (hasAttr(rawAttrs, key)) return rawAttrs;
  return `${rawAttrs} ${key}=${valueLiteral}`;
}

function replaceComponentName(body, from, to, defaults = []) {
  const closeRegex = new RegExp(`\\{\\%\\s*\\/\\s*${from}\\s*\\%\\}`, 'g');
  const openRegex = new RegExp(`\\{\\%\\s*${from}\\b([\\s\\S]*?)\\%\\}`, 'g');

  let next = body.replace(closeRegex, `{% /${to} %}`);

  next = next.replace(openRegex, (match, rawAttrs = '') => {
    const trimmed = rawAttrs.trim();
    if (trimmed.startsWith('/')) return match;

    const selfClosing = /\/\s*$/.test(rawAttrs);
    let attrs = rawAttrs.replace(/\/\s*$/, '');

    for (const [key, valueLiteral] of defaults) {
      attrs = ensureAttr(attrs, key, valueLiteral);
    }

    return `{% ${to}${attrs}${selfClosing ? ' /' : ''}%}`;
  });

  return next;
}

function collectIndexedFields(attrs, fieldNames) {
  const buckets = new Map();

  const writeField = (indexRaw, field, value) => {
    const index = Number(indexRaw);
    if (!Number.isFinite(index) || index < 1) return;
    if (!buckets.has(index)) buckets.set(index, {});
    buckets.get(index)[field] = value;
  };

  for (const [key, value] of Object.entries(attrs)) {
    let match = key.match(/^(?:t|item|panel|card|metric|stat)(\d+)_(title|description|filename|variant|content|label|value|badge)$/);
    if (match) {
      writeField(match[1], match[2], value);
      continue;
    }

    match = key.match(/^(title|description|filename|variant|content|label|value|badge)(\d+)$/);
    if (match) {
      writeField(match[2], match[1], value);
    }
  }

  return [...buckets.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([, fields]) => fields)
    .filter(fields => fieldNames.some(name => typeof fields[name] === 'string' && fields[name].trim().length > 0));
}

function toItemsLiteral(items, fields) {
  const serialized = items.map((item) => {
    const chunks = fields.map((field) => {
      const fallback = field === 'variant' ? 'default' : '';
      const value = item[field] ?? fallback;
      return `${field}: "${escapeAttrValue(value)}"`;
    });
    return `{ ${chunks.join(', ')} }`;
  });

  return `[${serialized.join(', ')}]`;
}

function ensureSectionAttrs(body) {
  return body.replace(/\{\%\s*section([\s\S]*?)\%\}/g, (match, attrs) => {
    const trimmed = attrs.trim();
    if (trimmed.startsWith('/')) return match;

    const selfClosing = /\/\s*$/.test(attrs);
    let nextAttrs = attrs.replace(/\/\s*$/, '');

    if (!hasAttr(nextAttrs, 'title')) {
      nextAttrs = ` title=""${nextAttrs}`;
    }
    if (!hasAttr(nextAttrs, 'subtitle')) {
      nextAttrs = ` subtitle=""${nextAttrs}`;
    }

    return `{% section${nextAttrs}${selfClosing ? ' /' : ''}%}`;
  });
}

function ensureTestimonialAttrs(body, defaultLogo) {
  const safeDefaultLogo = escapeAttrValue(defaultLogo ?? '');

  let next = body.replace(
    /\{\%\s*testimonial\s*\/\%\}/g,
    `{% testimonial quote="" author="" role=""${safeDefaultLogo ? ` logo="${safeDefaultLogo}"` : ''} /%}`
  );

  next = next.replace(/\{\%\s*testimonial([\s\S]*?)\/\%\}/g, (match, attrs) => {
    let nextAttrs = attrs;

    for (const required of ['quote', 'author', 'role']) {
      if (!hasAttr(nextAttrs, required)) {
        nextAttrs += ` ${required}=""`;
      }
    }

    if (safeDefaultLogo && !hasAttr(nextAttrs, 'logo')) {
      nextAttrs += ` logo="${safeDefaultLogo}"`;
    }

    return `{% testimonial${nextAttrs.replace(/\s+$/, '')} /%}`;
  });

  return next;
}

function convertLegacyTerminal(body) {
  let next = body;

  // {% terminal ... %} ... {% /terminal %} -> terminalUnified code mode
  next = next.replace(
    /\{\%\s*terminal\b([\s\S]*?)\%\}([\s\S]*?)\{\%\s*\/\s*terminal\s*\%\}/g,
    (_match, rawAttrs = '', inner = '') => {
      let attrs = rawAttrs.replace(/\/\s*$/, '');
      attrs = ensureAttr(attrs, 'mode', '"code"');
      attrs = ensureAttr(attrs, 'filename', '"terminal.sh"');
      attrs = ensureAttr(attrs, 'width', '"100%"');
      attrs = removeAttr(attrs, 'content');
      return `{% terminalUnified${attrs} %}${inner}{% /terminalUnified %}`;
    }
  );

  // {% terminal ... /%} -> terminalUnified with body from content="..." when available
  next = next.replace(/\{\%\s*terminal\b([\s\S]*?)\/\%\}/g, (_match, rawAttrs = '') => {
    let attrs = rawAttrs.replace(/\/\s*$/, '');
    const inlineContent = readAttr(attrs, 'content');

    attrs = removeAttr(attrs, 'content');
    attrs = ensureAttr(attrs, 'mode', '"code"');
    attrs = ensureAttr(attrs, 'filename', '"terminal.sh"');
    attrs = ensureAttr(attrs, 'width', '"100%"');

    const codeBody = inlineContent ? `\n${inlineContent}\n` : '\n';
    return `{% terminalUnified${attrs} %}${codeBody}{% /terminalUnified %}`;
  });

  next = replaceComponentName(next, 'terminalChat', 'terminalUnified', [
    ['mode', '"chat"'],
    ['filename', '"chat.log"'],
    ['width', '"100%"'],
  ]);

  next = replaceComponentName(next, 'automatedTerminal', 'terminalUnified', [
    ['mode', '"logs"'],
    ['filename', '"automation.log"'],
    ['width', '"100%"'],
  ]);

  return next;
}

function convertLegacyInsightGrid(body) {
  let next = body;

  const convertTag = (from, variant) => {
    const regex = new RegExp(`\\{\\%\\s*${from}\\b([\\s\\S]*?)\\/\\%\\}`, 'g');
    next = next.replace(regex, (_match, rawAttrs = '') => {
      let attrs = rawAttrs.replace(/\/\s*$/, '');
      const quotedAttrs = parseQuotedAttrs(attrs);
      const items = collectIndexedFields(quotedAttrs, ['title', 'content', 'badge']);

      if (items.length > 0 && !hasAttr(attrs, 'items')) {
        attrs = removeAttr(attrs, 'title');
        attrs = removeAttr(attrs, 'content');
        attrs = removeAttr(attrs, 'badge');
        for (const key of Object.keys(quotedAttrs)) {
          if (/^(?:t|item|panel|card)?\d+_(title|content|badge)$/.test(key) || /^(title|content|badge)\d+$/.test(key)) {
            attrs = removeAttr(attrs, key);
          }
        }
        attrs += ` items=${toItemsLiteral(items, ['title', 'content', 'badge'])}`;
      }

      attrs = ensureAttr(attrs, 'variant', `"${variant}"`);
      attrs = ensureAttr(attrs, 'columns', '"2"');

      return `{% insightGrid${attrs} /%}`;
    });

    // Also cover non-self-closing legacy tags.
    next = replaceComponentName(next, from, 'insightGrid', [
      ['variant', `"${variant}"`],
      ['columns', '"2"'],
    ]);
  };

  convertTag('precisionGrid', 'precision');
  convertTag('challengeGrid', 'challenge');
  convertTag('cardGrid', 'cards');

  return next;
}

function convertLegacyMetricsPanel(body) {
  let next = body;

  const convertTag = (from, mode) => {
    const regex = new RegExp(`\\{\\%\\s*${from}\\b([\\s\\S]*?)\\/\\%\\}`, 'g');
    next = next.replace(regex, (_match, rawAttrs = '') => {
      let attrs = rawAttrs.replace(/\/\s*$/, '');
      const quotedAttrs = parseQuotedAttrs(attrs);
      const stats = collectIndexedFields(quotedAttrs, ['label', 'value']);

      if (stats.length > 0 && !hasAttr(attrs, 'stats')) {
        for (const key of Object.keys(quotedAttrs)) {
          if (/^(?:stat|metric|item)?\d+_(label|value)$/.test(key) || /^(label|value)\d+$/.test(key)) {
            attrs = removeAttr(attrs, key);
          }
        }
        attrs += ` stats=${toItemsLiteral(stats, ['value', 'label'])}`;
      }

      attrs = ensureAttr(attrs, 'mode', `"${mode}"`);
      return `{% metricsPanel${attrs} /%}`;
    });

    next = replaceComponentName(next, from, 'metricsPanel', [['mode', `"${mode}"`]]);
  };

  convertTag('simulatorCard', 'simulator');
  convertTag('statsGrid', 'stats');
  convertTag('pagespeedMetrics', 'lighthouse');

  return next;
}

function convertLegacyAutomationPanels(body) {
  let next = body;

  next = next.replace(/\{\%\s*automationGrid\b([\s\S]*?)\/\%\}/g, (_match, rawAttrs = '') => {
    let attrs = rawAttrs.replace(/\/\s*$/, '');
    const quotedAttrs = parseQuotedAttrs(attrs);
    const items = collectIndexedFields(quotedAttrs, ['title', 'description', 'filename', 'variant', 'content']);

    if (items.length > 0) {
      for (const key of Object.keys(quotedAttrs)) {
        if (/^(?:t|item|panel)?\d+_(title|description|filename|variant|content)$/.test(key)
          || /^(title|description|filename|variant|content)\d+$/.test(key)) {
          attrs = removeAttr(attrs, key);
        }
      }

      attrs = removeAttr(attrs, 'items');
      attrs += ` items=${toItemsLiteral(items, ['title', 'description', 'filename', 'variant', 'content'])}`;
    }

    attrs = ensureAttr(attrs, 'columns', '"2"');
    return `{% automationPanels${attrs} /%}`;
  });

  next = replaceComponentName(next, 'automationGrid', 'automationPanels', [['columns', '"2"']]);

  return next;
}

function convertLegacySectionWrappers(body) {
  let next = body;

  next = replaceComponentName(next, 'contentGrid', 'section', [
    ['title', '""'],
    ['subtitle', '""'],
    ['variant', '"default"'],
    ['textAlign', '"left"'],
    ['padding', '"normal"'],
  ]);

  // challengeCard can appear as wrapper pair with inline text content.
  next = next.replace(
    /\{\%\s*challengeCard\b([\s\S]*?)\%\}([\s\S]*?)\{\%\s*\/\s*challengeCard\s*\%\}/g,
    (_match, rawAttrs = '', inner = '') => {
      const attrs = parseQuotedAttrs(rawAttrs);
      const title = attrs.title || 'Bloque';
      const content = inner.trim() || attrs.content || '';
      return `{% insightGrid variant="challenge" columns="1" items=[{ title: "${escapeAttrValue(title)}", content: "${escapeAttrValue(content)}", badge: "" }] /%}`;
    }
  );

  next = next.replace(/\{\%\s*challengeCard\b([\s\S]*?)\/\%\}/g, (_match, rawAttrs = '') => {
    const attrs = parseQuotedAttrs(rawAttrs);
    const title = attrs.title || 'Bloque';
    const content = attrs.content || '';
    const badge = attrs.badge || '';
    return `{% insightGrid variant="challenge" columns="1" items=[{ title: "${escapeAttrValue(title)}", content: "${escapeAttrValue(content)}", badge: "${escapeAttrValue(badge)}" }] /%}`;
  });

  return next;
}

function applyMigrations(raw) {
  const { frontmatter } = splitFrontmatter(raw);

  // Normalize historical logo extension mismatch where png exists in assets.
  let nextRaw = raw.replace(
    '/assets/projects/ledescaparate/client/logo.webp',
    '/assets/projects/ledescaparate/client/logo.png'
  );

  const split = splitFrontmatter(nextRaw);
  const logo = extractClientLogo(split.frontmatter || frontmatter);

  let nextBody = split.body;
  nextBody = convertLegacyTerminal(nextBody);
  nextBody = convertLegacyInsightGrid(nextBody);
  nextBody = convertLegacyMetricsPanel(nextBody);
  nextBody = convertLegacyAutomationPanels(nextBody);
  nextBody = convertLegacySectionWrappers(nextBody);
  nextBody = ensureSectionAttrs(nextBody);
  nextBody = ensureTestimonialAttrs(nextBody, logo);

  return split.frontmatter ? `---\n${split.frontmatter}\n---\n${nextBody}` : nextBody;
}

async function migrateFile(filePath) {
  const original = await fs.readFile(filePath, 'utf8');
  const migrated = applyMigrations(original);

  if (migrated !== original) {
    if (!checkOnly) {
      await fs.writeFile(filePath, migrated, 'utf8');
    }
    return true;
  }

  return false;
}

async function main() {
  const files = (await fs.readdir(projectsDir))
    .filter(file => file.endsWith('.mdoc'))
    .map(file => path.join(projectsDir, file))
    .sort();

  let changed = 0;
  const changedFiles = [];

  for (const filePath of files) {
    if (await migrateFile(filePath)) {
      changed += 1;
      changedFiles.push(path.basename(filePath));
      console.log(`${checkOnly ? 'Needs update' : 'Updated'} ${path.basename(filePath)}`);
    }
  }

  if (changed === 0) {
    console.log('No changes required.');
  } else if (checkOnly) {
    console.log(`Strict migration required in ${changed} file(s): ${changedFiles.join(', ')}`);
    process.exit(1);
  } else {
    console.log(`Done. Updated ${changed} file(s).`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
