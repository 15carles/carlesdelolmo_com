#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';

const rootDir = process.cwd();
const projectsDir = path.join(rootDir, 'content', 'projects');
const reportDir = path.join(rootDir, 'reports');
const reportPath = path.join(reportDir, 'keystatic-projects-validation.json');

function parseAttrs(rawAttrs) {
  const attrs = {};
  const attrRegex = /([a-zA-Z0-9_]+)="([^"]*)"/g;
  let match;
  while ((match = attrRegex.exec(rawAttrs)) !== null) {
    attrs[match[1]] = match[2];
  }
  return attrs;
}

function collectComponentCalls(body) {
  const calls = [];
  const tagRegex = /\{\%\s*(\/)?([a-zA-Z0-9_]+)([\s\S]*?)\%\}/g;
  let match;
  while ((match = tagRegex.exec(body)) !== null) {
    const isClosing = Boolean(match[1]);
    const name = match[2];
    const rawAttrs = match[3] || '';
    const selfClosing = rawAttrs.trimEnd().endsWith('/');
    if (!isClosing) {
      calls.push({
        name,
        attrs: parseAttrs(rawAttrs),
        rawAttrs,
        selfClosing,
      });
    }
  }
  return calls;
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

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

function pullLogoPath(frontmatter) {
  const logoMatch = frontmatter.match(/\n\s*logo:\s*([^\n]+)/);
  if (!logoMatch) return null;
  return logoMatch[1].trim();
}

async function diagnoseFile(filePath) {
  const slug = path.basename(filePath, '.mdoc');
  const raw = await fs.readFile(filePath, 'utf8');
  const { frontmatter, body } = splitFrontmatter(raw);
  const issues = [];

  const logoPath = pullLogoPath(`\n${frontmatter}`);
  if (logoPath && logoPath.startsWith('/')) {
    const absoluteLogoPath = path.join(rootDir, 'public', logoPath.replace(/^\/+/, ''));
    if (!(await fileExists(absoluteLogoPath))) {
      issues.push({
        type: 'asset',
        field: 'client.logo',
        message: `Referenced asset does not exist: ${logoPath}`,
      });
    }
  }

  const componentCalls = collectComponentCalls(body);

  for (const call of componentCalls) {
    if (call.name === 'section') {
      if (!('title' in call.attrs)) {
        issues.push({
          type: 'component',
          field: 'content.section.title',
          message: 'Section block without explicit title attribute',
        });
      }
      if (!('subtitle' in call.attrs)) {
        issues.push({
          type: 'component',
          field: 'content.section.subtitle',
          message: 'Section block without explicit subtitle attribute',
        });
      }
    }

    if (call.name === 'testimonial') {
      // Keep diagnosis aligned with the current strict projects schema:
      // quote/author/role are required content fields, while logo/link remain optional.
      for (const required of ['quote', 'author', 'role']) {
        if (!(required in call.attrs)) {
          issues.push({
            type: 'component',
            field: `content.testimonial.${required}`,
            message: `Testimonial block missing "${required}"`,
          });
        }
      }

      if (typeof call.attrs.logo === 'string' && call.attrs.logo.startsWith('/')) {
        const absoluteLogoPath = path.join(rootDir, 'public', call.attrs.logo.replace(/^\/+/, ''));
        if (!(await fileExists(absoluteLogoPath))) {
          issues.push({
            type: 'asset',
            field: 'content.testimonial.logo',
            message: `Referenced testimonial logo does not exist: ${call.attrs.logo}`,
          });
        }
      }
    }

    if (['terminal', 'terminalChat', 'automatedTerminal'].includes(call.name)) {
      issues.push({
        type: 'legacy',
        field: `content.${call.name}`,
        message: `Legacy terminal block "${call.name}" found. Use "terminalUnified" instead.`,
      });
    }

    if (['precisionGrid', 'challengeGrid', 'cardGrid', 'challengeCard', 'contentGrid'].includes(call.name)) {
      issues.push({
        type: 'legacy',
        field: `content.${call.name}`,
        message: `Legacy layout block "${call.name}" found. Use current Project blocks instead (insightGrid/section).`,
      });
    }

    if (['simulatorCard', 'statsGrid', 'pagespeedMetrics'].includes(call.name)) {
      issues.push({
        type: 'legacy',
        field: `content.${call.name}`,
        message: `Legacy metrics block "${call.name}" found. Use "metricsPanel" instead.`,
      });
    }

    if (call.name === 'automationGrid') {
      issues.push({
        type: 'legacy',
        field: 'content.automationGrid',
        message: 'Legacy automation block "automationGrid" found. Use "automationPanels" instead.',
      });
    }
  }

  return { slug, issues };
}

async function main() {
  const files = (await fs.readdir(projectsDir))
    .filter(file => file.endsWith('.mdoc'))
    .map(file => path.join(projectsDir, file))
    .sort();

  const results = [];
  for (const filePath of files) {
    results.push(await diagnoseFile(filePath));
  }

  await fs.mkdir(reportDir, { recursive: true });
  await fs.writeFile(reportPath, JSON.stringify(results, null, 2) + '\n', 'utf8');

  const issuesCount = results.reduce((acc, item) => acc + item.issues.length, 0);
  console.log(`Report written to ${reportPath}`);
  for (const item of results) {
    console.log(`- ${item.slug}: ${item.issues.length} issue(s)`);
  }
  process.exit(issuesCount > 0 ? 1 : 0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
