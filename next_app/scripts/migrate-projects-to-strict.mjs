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

function ensureSectionAttrs(body) {
  return body.replace(/\{\%\s*section([\s\S]*?)\%\}/g, (match, attrs) => {
    const trimmed = attrs.trim();
    if (trimmed.startsWith('/')) return match;

    let nextAttrs = attrs;
    if (!/\btitle="/.test(nextAttrs)) {
      nextAttrs = ` title=""${nextAttrs}`;
    }
    if (!/\bsubtitle="/.test(nextAttrs)) {
      nextAttrs = ` subtitle=""${nextAttrs}`;
    }
    return `{% section${nextAttrs}%}`;
  });
}

function ensureTestimonialAttrs(body, defaultLogo) {
  const safeDefaultLogo = (defaultLogo ?? '').replace(/"/g, '\\"');

  let next = body.replace(
    /\{\%\s*testimonial\s*\/\%\}/g,
    `{% testimonial quote="" author="" role="" logo="${safeDefaultLogo}" link="" /%}`
  );

  next = next.replace(/\{\%\s*testimonial([\s\S]*?)\/\%\}/g, (match, attrs) => {
    const required = [
      ['quote', ''],
      ['author', ''],
      ['role', ''],
      ['logo', safeDefaultLogo],
      ['link', ''],
    ];

    let nextAttrs = attrs;
    for (const [key, fallback] of required) {
      if (!new RegExp(`\\b${key}="`).test(nextAttrs)) {
        nextAttrs += ` ${key}="${fallback}"`;
      }
    }
    return `{% testimonial${nextAttrs.replace(/\s+$/, '')} /%}`;
  });

  return next;
}

async function migrateFile(filePath) {
  let raw = await fs.readFile(filePath, 'utf8');
  const original = raw;

  // Normalize historical logo extension mismatch where png exists in assets.
  raw = raw.replace(
    '/assets/projects/ledescaparate/client/logo.webp',
    '/assets/projects/ledescaparate/client/logo.png'
  );

  const { frontmatter, body } = splitFrontmatter(raw);
  const strictBody = ensureTestimonialAttrs(ensureSectionAttrs(body), extractClientLogo(frontmatter));
  const migrated = frontmatter ? `---\n${frontmatter}\n---\n${strictBody}` : strictBody;

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
    .map(file => path.join(projectsDir, file));

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
  } else {
    if (checkOnly) {
      console.log(`Strict migration required in ${changed} file(s): ${changedFiles.join(', ')}`);
      process.exit(1);
    }
    console.log(`Done. Updated ${changed} file(s).`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
