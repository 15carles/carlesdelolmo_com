#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';

const rootDir = process.cwd();
const postsDir = path.join(rootDir, 'content', 'posts');
const checkOnly = process.argv.includes('--check');

function splitFrontmatter(raw) {
  if (!raw.startsWith('---\n')) {
    return { frontmatter: '', body: raw, hasFrontmatter: false };
  }
  const end = raw.indexOf('\n---\n', 4);
  if (end === -1) {
    return { frontmatter: '', body: raw, hasFrontmatter: false };
  }
  return {
    frontmatter: raw.slice(4, end),
    body: raw.slice(end + 5),
    hasFrontmatter: true,
  };
}

function parseIsoDate(frontmatter) {
  const match = frontmatter.match(/(?:^|\n)isoDate:\s*'?([^\n']+)'?/);
  if (!match) return null;
  const parsed = new Date(match[1].trim());
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function inferStatus(frontmatter, now = new Date()) {
  const isoDate = parseIsoDate(frontmatter);
  if (!isoDate) return 'published';
  return isoDate.getTime() > now.getTime() ? 'scheduled' : 'published';
}

function hasStatus(frontmatter) {
  return /(?:^|\n)status:\s*(draft|scheduled|published)\s*(?:\n|$)/.test(frontmatter);
}

function injectStatus(frontmatter, status) {
  const statusLine = `status: ${status}`;

  if (/(?:^|\n)isoDate:[^\n]*/.test(frontmatter)) {
    return frontmatter.replace(/((?:^|\n)isoDate:[^\n]*)/, `$1\n${statusLine}`);
  }

  if (/(?:^|\n)date:[^\n]*/.test(frontmatter)) {
    return frontmatter.replace(/((?:^|\n)date:[^\n]*)/, `$1\n${statusLine}`);
  }

  return `${statusLine}\n${frontmatter}`;
}

async function main() {
  const files = (await fs.readdir(postsDir))
    .filter((file) => file.endsWith('.mdoc'))
    .map((file) => path.join(postsDir, file))
    .sort();

  let changed = 0;
  let alreadyOk = 0;

  for (const filePath of files) {
    const raw = await fs.readFile(filePath, 'utf8');
    const { frontmatter, body, hasFrontmatter } = splitFrontmatter(raw);

    if (!hasFrontmatter) {
      console.log(`skip(no-frontmatter): ${path.basename(filePath)}`);
      continue;
    }

    if (hasStatus(frontmatter)) {
      alreadyOk += 1;
      continue;
    }

    const status = inferStatus(frontmatter);
    const nextFrontmatter = injectStatus(frontmatter, status);
    const nextContent = `---\n${nextFrontmatter}\n---\n${body}`;

    if (!checkOnly) {
      await fs.writeFile(filePath, nextContent, 'utf8');
    }

    changed += 1;
    console.log(`${checkOnly ? 'would-update' : 'updated'}: ${path.basename(filePath)} -> ${status}`);
  }

  console.log(`done: changed=${changed}, already-ok=${alreadyOk}, mode=${checkOnly ? 'check' : 'write'}`);
  process.exit(checkOnly && changed > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
