const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const item of list) {
    if (['node_modules', '.git', '.wrangler', '.portfolio-images-backup', 'BRANDING PORTFOLIO', 'photos', 'hero assets', 'New folder', 'scripts'].includes(item)) {
      continue;
    }
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getHtmlFiles(fullPath));
    } else if (item.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

const htmlFiles = getHtmlFiles(rootDir);

const report = {
  titleIssues: [],
  descIssues: [],
  canonicalIssues: [],
  ogIssues: [],
  h1Issues: [],
  headingHierarchy: [],
  externalLinkSecurity: [],
  socialLinkPlaceholders: [],
  imageOptimization: [],
  plainTextEmails: [],
  publicZipDocxExposed: [],
  duplicateTitles: new Map(),
  duplicateDescriptions: new Map()
};

// Check for exposed root files (.zip, .docx)
const rootItems = fs.readdirSync(rootDir);
for (const item of rootItems) {
  if (item.endsWith('.zip') || item.endsWith('.docx')) {
    report.publicZipDocxExposed.push(item);
  }
}
const servAssets = path.join(rootDir, 'services-assets');
if (fs.existsSync(servAssets)) {
  for (const item of fs.readdirSync(servAssets)) {
    if (item.endsWith('.zip') || item.endsWith('.docx')) {
      report.publicZipDocxExposed.push(`services-assets/${item}`);
    }
  }
}

for (const file of htmlFiles) {
  const rel = path.relative(rootDir, file).replace(/\\/g, '/');
  const content = fs.readFileSync(file, 'utf8');

  // Skip redirect stubs
  if ((content.includes('http-equiv="refresh"') || content.length < 1000) && rel !== '404.html') {
    continue;
  }

  // 1. Titles
  const titleM = content.match(/<title\b[^>]*>([^<]*)<\/title>/i);
  const title = titleM ? titleM[1].trim() : '';
  if (!title) {
    report.titleIssues.push({ file: rel, issue: 'Missing title tag' });
  } else {
    if (title.length < 40) report.titleIssues.push({ file: rel, issue: `Title too short (${title.length} chars): "${title}"` });
    if (title.length > 65) report.titleIssues.push({ file: rel, issue: `Title too long (${title.length} chars): "${title}"` });
    
    if (!report.duplicateTitles.has(title)) report.duplicateTitles.set(title, []);
    report.duplicateTitles.get(title).push(rel);
  }

  // 2. Meta Descriptions
  const descM = content.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i) ||
                content.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);
  const desc = descM ? descM[1].trim() : '';
  if (!desc && rel !== '404.html') {
    report.descIssues.push({ file: rel, issue: 'Missing meta description' });
  } else if (desc) {
    if (desc.length < 110) report.descIssues.push({ file: rel, issue: `Description too short (${desc.length} chars): "${desc}"` });
    if (desc.length > 165) report.descIssues.push({ file: rel, issue: `Description too long (${desc.length} chars): "${desc}"` });

    if (!report.duplicateDescriptions.has(desc)) report.duplicateDescriptions.set(desc, []);
    report.duplicateDescriptions.get(desc).push(rel);
  }

  // 3. Canonicals
  const canM = content.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i);
  if (!canM && rel !== '404.html') {
    report.canonicalIssues.push({ file: rel, issue: 'Missing canonical tag' });
  } else if (canM) {
    const canHref = canM[1].trim();
    if (canHref.startsWith('http://')) {
      report.canonicalIssues.push({ file: rel, issue: `Insecure HTTP canonical: ${canHref}` });
    }
    if (canHref.endsWith('.html')) {
      report.canonicalIssues.push({ file: rel, issue: `Canonical contains .html extension: ${canHref}` });
    }
  }

  // 4. OpenGraph & Twitter
  const ogImg = content.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']*)["']/i);
  if (!ogImg && rel !== '404.html' && rel !== 'thank-you.html') {
    report.ogIssues.push({ file: rel, issue: 'Missing og:image' });
  }

  // 5. Headings
  const h1s = [...content.matchAll(/<h1\b[^>]*>(.*?)<\/h1>/gis)];
  if (h1s.length === 0 && rel !== '404.html') {
    report.h1Issues.push({ file: rel, issue: 'Missing <h1>' });
  } else if (h1s.length > 1) {
    report.h1Issues.push({ file: rel, issue: `Multiple <h1> tags (${h1s.length})` });
  }

  // Heading hierarchy
  const allH = [...content.matchAll(/<(h[1-6])\b[^>]*>(.*?)<\/\1>/gis)]
    .map(m => ({ level: parseInt(m[1][1]), text: m[2].replace(/<[^>]+>/g, '').trim() }));
  for (let i = 1; i < allH.length; i++) {
    if (allH[i].level > allH[i - 1].level + 1) {
      report.headingHierarchy.push({ file: rel, issue: `Jump from H${allH[i-1].level} to H${allH[i].level} ("${allH[i].text.slice(0, 25)}")` });
    }
  }

  // 6. External links security & rel
  const aMatches = [...content.matchAll(/<a\b([^>]*)>(.*?)<\/a>/gis)];
  for (const a of aMatches) {
    const attrs = a[1];
    const targetBlank = attrs.includes('target="_blank"') || attrs.includes("target='_blank'");
    const hrefM = attrs.match(/href=["']([^"']*)["']/i);
    const href = hrefM ? hrefM[1].trim() : '';

    if (targetBlank && (href.startsWith('http://') || href.startsWith('https://'))) {
      if (!attrs.includes('noopener')) {
        report.externalLinkSecurity.push({ file: rel, href, issue: 'Missing rel="noopener" on target="_blank"' });
      }
    }

    if (href === '#' || href === 'javascript:void(0)') {
      report.socialLinkPlaceholders.push({ file: rel, text: a[2].replace(/<[^>]+>/g, '').trim() || '<empty>' });
    }
  }

  // 7. Plain text emails
  const lines = content.split('\n');
  lines.forEach((l, idx) => {
    if (l.includes('info@growellmarketing.com')) {
      const isProtected = l.includes('display:none') || l.includes('itemprop="email"') || l.includes('application/ld+json') || l.includes('top-email-link') || l.includes('footer-contact-item');
      if (!isProtected) {
        report.plainTextEmails.push({ file: rel, line: idx + 1, snippet: l.trim().slice(0, 60) });
      }
    }
  });

  // 8. Images without lazy loading below the fold or hero image lazy loading
  const imgs = [...content.matchAll(/<img\b([^>]*)>/gi)];
  imgs.forEach((img, idx) => {
    const attrs = img[1];
    const srcM = attrs.match(/src=["']([^"']*)["']/i);
    const src = srcM ? srcM[1].trim() : '';
    if (idx === 0 && attrs.includes('loading="lazy"') && (rel === 'index.html' || rel.startsWith('services/'))) {
      report.imageOptimization.push({ file: rel, issue: `Potential LCP issue: first image has loading="lazy" (${src})` });
    }
    // non-webp check
    if (src && (src.endsWith('.jpg') || src.endsWith('.png') || src.endsWith('.jpeg')) && !src.includes('facebook.net')) {
      report.imageOptimization.push({ file: rel, issue: `Non-WebP image format: ${src}` });
    }
  });
}

console.log('================ DEEP DIVE COMPREHENSIVE SITE AUDIT ================');

console.log('\n1. EXPOSED ZIP / DOCX FILES IN WEB DIRECTORIES:');
if (report.publicZipDocxExposed.length === 0) {
  console.log('   [OK] None found.');
} else {
  console.log(`   [!] ${report.publicZipDocxExposed.length} files found that should not be publicly accessible:`);
  report.publicZipDocxExposed.forEach(f => console.log(`       - ${f}`));
}

console.log('\n2. TITLE LENGTH ISSUES (<40 or >65 chars):');
if (report.titleIssues.length === 0) {
  console.log('   [OK] All page titles have ideal length (40-65 chars).');
} else {
  console.log(`   [i] ${report.titleIssues.length} pages:`);
  report.titleIssues.forEach(t => console.log(`       - [${t.file}] ${t.issue}`));
}

console.log('\n3. DUPLICATE PAGE TITLES:');
let dupTitlesFound = 0;
for (const [title, files] of report.duplicateTitles) {
  if (files.length > 1) {
    dupTitlesFound++;
    console.log(`   [!] Duplicate Title: "${title}" on ${files.length} pages: ${files.join(', ')}`);
  }
}
if (!dupTitlesFound) console.log('   [OK] 100% Unique page titles across the entire website.');

console.log('\n4. META DESCRIPTION ISSUES (<110 or >165 chars):');
if (report.descIssues.length === 0) {
  console.log('   [OK] All meta descriptions have ideal length (110-165 chars).');
} else {
  console.log(`   [i] ${report.descIssues.length} pages:`);
  report.descIssues.forEach(d => console.log(`       - [${d.file}] ${d.issue}`));
}

console.log('\n5. CANONICAL TAG ISSUES:');
if (report.canonicalIssues.length === 0) {
  console.log('   [OK] All canonical tags are valid HTTPS without .html extensions.');
} else {
  console.log(`   [!] ${report.canonicalIssues.length} canonical issues:`);
  report.canonicalIssues.forEach(c => console.log(`       - [${c.file}] ${c.issue}`));
}

console.log('\n6. HEADING HIERARCHY SKIPS:');
if (report.headingHierarchy.length === 0) {
  console.log('   [OK] Perfect heading hierarchy across all pages.');
} else {
  console.log(`   [i] ${report.headingHierarchy.length} hierarchy jumps found:`);
  report.headingHierarchy.forEach(h => console.log(`       - [${h.file}] ${h.issue}`));
}

console.log('\n7. EXTERNAL LINKS SECURITY (Missing rel="noopener"):');
if (report.externalLinkSecurity.length === 0) {
  console.log('   [OK] All target="_blank" links have rel="noopener".');
} else {
  console.log(`   [!] ${report.externalLinkSecurity.length} external links missing rel="noopener":`);
  report.externalLinkSecurity.slice(0, 5).forEach(l => console.log(`       - [${l.file}] -> ${l.href}`));
  if (report.externalLinkSecurity.length > 5) console.log(`       ... and ${report.externalLinkSecurity.length - 5} more`);
}

console.log('\n8. PLACEHOLDER / DEAD ANCHOR LINKS (href="#"):');
if (report.socialLinkPlaceholders.length === 0) {
  console.log('   [OK] Zero placeholder links found.');
} else {
  console.log(`   [i] ${report.socialLinkPlaceholders.length} placeholder links (href="#") found:`);
  report.socialLinkPlaceholders.slice(0, 10).forEach(p => console.log(`       - [${p.file}] Text: "${p.text}"`));
}

console.log('\n9. IMAGE OPTIMIZATION (Non-WebP or LCP warnings):');
if (report.imageOptimization.length === 0) {
  console.log('   [OK] All images are optimized WebP without LCP lazy-loading.');
} else {
  console.log(`   [i] ${report.imageOptimization.length} image optimization notes:`);
  report.imageOptimization.forEach(img => console.log(`       - [${img.file}] ${img.issue}`));
}

console.log('\n10. PLAIN-TEXT SCRAPABLE EMAIL HARVESTING:');
if (report.plainTextEmails.length === 0) {
  console.log('   [OK] All visible emails are obfuscated against spam bot harvesting.');
} else {
  console.log(`   [!] ${report.plainTextEmails.length} plain text email instances found:`);
  report.plainTextEmails.forEach(e => console.log(`       - [${e.file}:${e.line}] ${e.snippet}`));
}

console.log('====================================================================\n');
