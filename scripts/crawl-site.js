const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// Helper to recursively find all HTML files
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

// Read and parse _redirects
const redirectsMap = new Map();
const redirectsFile = path.join(rootDir, '_redirects');
if (fs.existsSync(redirectsFile)) {
  const lines = fs.readFileSync(redirectsFile, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const parts = trimmed.split(/\s+/);
    if (parts.length >= 2) {
      redirectsMap.set(parts[0], parts[1]);
    }
  }
}

// Read and parse sitemap.xml
const sitemapUrls = new Set();
const sitemapFile = path.join(rootDir, 'sitemap.xml');
if (fs.existsSync(sitemapFile)) {
  const sitemapContent = fs.readFileSync(sitemapFile, 'utf8');
  const locMatches = [...sitemapContent.matchAll(/<loc>([^<]+)<\/loc>/gi)];
  for (const m of locMatches) {
    try {
      const urlObj = new URL(m[1].trim());
      let pathname = urlObj.pathname;
      if (pathname.length > 1 && pathname.endsWith('/')) {
        pathname = pathname.slice(0, -1);
      }
      sitemapUrls.add(pathname);
    } catch (e) {
      sitemapUrls.add(m[1].trim());
    }
  }
}

const htmlFiles = getHtmlFiles(rootDir);

// Map of canonical relative route to file path
// e.g. '/' -> 'index.html', '/about-us' -> 'about-us.html', '/services/seo-services-ajmer' -> 'services/seo-services-ajmer.html'
const knownRoutes = new Map();
const fileToRoute = new Map();

for (const file of htmlFiles) {
  const rel = path.relative(rootDir, file).replace(/\\/g, '/');
  let route = '/' + rel.replace(/\.html$/, '');
  if (route === '/index') route = '/';
  
  knownRoutes.set(route, file);
  knownRoutes.set('/' + rel, file); // with .html
  if (route.endsWith('/index')) {
    knownRoutes.set(route.replace(/\/index$/, ''), file);
  }
  fileToRoute.set(file, route);
}

// Assets resolver helper
function assetExists(src, pageFilePath) {
  // strip hash and query
  const cleanSrc = src.split('#')[0].split('?')[0];
  if (!cleanSrc) return true;
  if (cleanSrc.startsWith('data:') || cleanSrc.startsWith('http://') || cleanSrc.startsWith('https://') || cleanSrc.startsWith('//')) {
    return true; // External asset
  }

  let testPath;
  if (cleanSrc.startsWith('/')) {
    testPath = path.join(rootDir, cleanSrc);
  } else {
    testPath = path.join(path.dirname(pageFilePath), cleanSrc);
  }

  return fs.existsSync(testPath);
}

// Route resolver helper
function resolveRoute(href, pageFilePath) {
  const cleanHref = href.split('#')[0].split('?')[0];
  if (!cleanHref) return { type: 'hash_or_empty' };

  if (cleanHref.startsWith('http://') || cleanHref.startsWith('https://')) {
    // Check if it's our own domain
    try {
      const u = new URL(cleanHref);
      if (u.hostname === 'growellmarketing.com' || u.hostname === 'www.growellmarketing.com') {
        let p = u.pathname;
        if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
        return { type: 'internal', target: p };
      }
    } catch (e) {}
    return { type: 'external', target: cleanHref };
  }

  if (cleanHref.startsWith('mailto:') || cleanHref.startsWith('tel:') || cleanHref.startsWith('javascript:')) {
    return { type: 'protocol', target: cleanHref };
  }

  let normalizedRoute;
  if (cleanHref.startsWith('/')) {
    normalizedRoute = cleanHref;
    if (normalizedRoute.length > 1 && normalizedRoute.endsWith('/')) {
      normalizedRoute = normalizedRoute.slice(0, -1);
    }
  } else {
    const pageDir = path.dirname(path.relative(rootDir, pageFilePath)).replace(/\\/g, '/');
    normalizedRoute = path.posix.normalize('/' + (pageDir === '.' ? '' : pageDir + '/') + cleanHref);
  }

  return { type: 'internal', target: normalizedRoute };
}

// Generic anchor patterns
const genericAnchorRegex = /^(read\s+more|learn\s+more|click\s+here|view\s+more|more|here|check\s+this|link)[-–—:]*$/i;

// Audit tracking data
const pagesData = [];
const allBrokenLinks = [];
const allRedirectLinks = [];
const allBrokenAssets = [];
const titlesMap = new Map();
const descMap = new Map();

for (const file of htmlFiles) {
  const relPath = path.relative(rootDir, file).replace(/\\/g, '/');
  const route = fileToRoute.get(file);
  const content = fs.readFileSync(file, 'utf8');

  // Check if redirect stub
  const isRedirectStub = (content.includes('http-equiv="refresh"') || content.length < 1000) && relPath !== '404.html' && relPath !== 'thank-you.html';

  const page = {
    file: relPath,
    route,
    isRedirectStub,
    title: '',
    titleLen: 0,
    desc: '',
    descLen: 0,
    canonical: '',
    robots: '',
    ogTitle: '',
    ogDesc: '',
    ogImage: '',
    h1s: [],
    headingHierarchyErrors: [],
    brokenSchemas: 0,
    internalLinksCount: 0,
    brokenLinks: [],
    redirectLinks: [],
    genericLinks: [],
    imagesCount: 0,
    imagesMissingAlt: [],
    imagesMissingDims: [],
    brokenImages: [],
    brokenScripts: [],
    brokenStylesheets: []
  };

  // 1. Title
  const titleMatch = content.match(/<title\b[^>]*>([^<]*)<\/title>/i);
  if (titleMatch) {
    page.title = titleMatch[1].trim();
    page.titleLen = page.title.length;
    if (!titlesMap.has(page.title)) titlesMap.set(page.title, []);
    titlesMap.get(page.title).push(relPath);
  }

  // 2. Meta description
  const descMatch = content.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i) ||
                    content.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);
  if (descMatch) {
    page.desc = descMatch[1].trim();
    page.descLen = page.desc.length;
    if (!descMap.has(page.desc)) descMap.set(page.desc, []);
    descMap.get(page.desc).push(relPath);
  }

  // 3. Canonical
  const canonicalMatch = content.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i);
  if (canonicalMatch) {
    page.canonical = canonicalMatch[1].trim();
  }

  // 4. Robots
  const robotsMatch = content.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i);
  if (robotsMatch) {
    page.robots = robotsMatch[1].trim();
  }

  // 5. OpenGraph
  const ogTitleM = content.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']*)["']/i);
  if (ogTitleM) page.ogTitle = ogTitleM[1].trim();
  const ogDescM = content.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']*)["']/i);
  if (ogDescM) page.ogDesc = ogDescM[1].trim();
  const ogImgM = content.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']*)["']/i);
  if (ogImgM) page.ogImage = ogImgM[1].trim();

  // 6. Headings
  const h1Matches = [...content.matchAll(/<h1\b[^>]*>(.*?)<\/h1>/gis)];
  for (const h of h1Matches) {
    page.h1s.push(h[1].replace(/<[^>]+>/g, '').trim());
  }

  const allHeadings = [...content.matchAll(/<(h[1-6])\b[^>]*>(.*?)<\/\1>/gis)]
    .map(m => ({ level: parseInt(m[1][1]), tag: m[1].toLowerCase(), text: m[2].replace(/<[^>]+>/g, '').trim() }));
  
  for (let i = 1; i < allHeadings.length; i++) {
    if (allHeadings[i].level > allHeadings[i - 1].level + 1) {
      page.headingHierarchyErrors.push(`H${allHeadings[i - 1].level} -> H${allHeadings[i].level}: "${allHeadings[i].text.slice(0, 30)}..."`);
    }
  }

  // 7. Schema JSON-LD
  const schemaMatches = [...content.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)];
  for (const sm of schemaMatches) {
    try {
      JSON.parse(sm[1]);
    } catch (e) {
      page.brokenSchemas++;
    }
  }

  // 8. Anchors
  const aMatches = [...content.matchAll(/<a\b([^>]*)>(.*?)<\/a>/gis)];
  for (const a of aMatches) {
    const attrs = a[1];
    const text = a[2].replace(/<[^>]+>/g, '').trim();
    const hrefMatch = attrs.match(/href=["']([^"']*)["']/i);
    if (!hrefMatch) continue;
    const href = hrefMatch[1].trim();

    if (genericAnchorRegex.test(text)) {
      page.genericLinks.push({ href, text });
    }

    const resolved = resolveRoute(href, file);
    if (resolved.type === 'internal') {
      page.internalLinksCount++;
      const target = resolved.target;

      // Check if redirect
      if (redirectsMap.has(target)) {
        const dest = redirectsMap.get(target);
        page.redirectLinks.push({ href, target, destination: dest });
        allRedirectLinks.push({ source: relPath, href, target, destination: dest });
      }

      // Check if exists
      const targetExists = knownRoutes.has(target) || knownRoutes.has(target + '.html') || knownRoutes.has(target + '/index');
      if (!targetExists) {
        page.brokenLinks.push(href);
        allBrokenLinks.push({ source: relPath, href, target });
      }
    }
  }

  // 9. Images
  const imgMatches = [...content.matchAll(/<img\b([^>]*)>/gi)];
  page.imagesCount = imgMatches.length;
  for (const img of imgMatches) {
    const attrs = img[1];
    const srcMatch = attrs.match(/src=["']([^"']*)["']/i);
    const altMatch = attrs.match(/alt=["']([^"']*)["']/i);
    const hasWidth = /width=["']?\d+/i.test(attrs);
    const hasHeight = /height=["']?\d+/i.test(attrs);

    const src = srcMatch ? srcMatch[1].trim() : '';
    const alt = altMatch ? altMatch[1].trim() : '';

    if (!alt) {
      page.imagesMissingAlt.push(src || '<no-src>');
    }
    if (!hasWidth || !hasHeight) {
      page.imagesMissingDims.push(src || '<no-src>');
    }
    if (src && !assetExists(src, file)) {
      page.brokenImages.push(src);
      allBrokenAssets.push({ page: relPath, type: 'image', src });
    }
  }

  // 10. Stylesheets
  const linkMatches = [...content.matchAll(/<link\b([^>]*)>/gi)];
  for (const l of linkMatches) {
    const attrs = l[1];
    if (attrs.includes('stylesheet')) {
      const hrefMatch = attrs.match(/href=["']([^"']*)["']/i);
      if (hrefMatch) {
        const href = hrefMatch[1].trim();
        if (!assetExists(href, file)) {
          page.brokenStylesheets.push(href);
          allBrokenAssets.push({ page: relPath, type: 'stylesheet', src: href });
        }
      }
    }
  }

  // 11. Scripts
  const scriptMatches = [...content.matchAll(/<script\b([^>]*)>/gi)];
  for (const s of scriptMatches) {
    const attrs = s[1];
    const srcMatch = attrs.match(/src=["']([^"']*)["']/i);
    if (srcMatch) {
      const src = srcMatch[1].trim();
      if (!assetExists(src, file)) {
        page.brokenScripts.push(src);
        allBrokenAssets.push({ page: relPath, type: 'script', src });
      }
    }
  }

  pagesData.push(page);
}

// Compare sitemap vs pages
const activePages = pagesData.filter(p => !p.isRedirectStub && p.file !== '404.html');
const orphanedPages = [];
for (const p of activePages) {
  if (!sitemapUrls.has(p.route)) {
    orphanedPages.push({ file: p.file, route: p.route });
  }
}

const sitemap404s = [];
for (const sUrl of sitemapUrls) {
  if (!knownRoutes.has(sUrl) && !knownRoutes.has(sUrl + '.html')) {
    sitemap404s.push(sUrl);
  }
}

// Output Audit Summary
console.log('\n=============================================================');
console.log('              WEBSITE FILES CRAWL & AUDIT REPORT             ');
console.log('=============================================================');
console.log(`Total HTML Files Found:           ${pagesData.length}`);
console.log(`  - Active Content Pages:         ${activePages.length}`);
console.log(`  - Redirect Stubs / 404:         ${pagesData.length - activePages.length}`);
console.log(`Total Internal Links Crawled:     ${pagesData.reduce((acc, p) => acc + p.internalLinksCount, 0)}`);
console.log(`Total Images Crawled:             ${pagesData.reduce((acc, p) => acc + p.imagesCount, 0)}`);
console.log('-------------------------------------------------------------');

console.log('\n--- 1. CRITICAL ERRORS & BROKEN LINKS (404) ---');
if (allBrokenLinks.length === 0) {
  console.log('[OK] No broken internal anchor links found! (0 errors)');
} else {
  console.log(`[!] Found ${allBrokenLinks.length} Broken Internal Links:`);
  allBrokenLinks.forEach(b => console.log(`  File: ${b.source} -> Href: "${b.href}" (Route: "${b.target}")`));
}

console.log('\n--- 2. BROKEN ASSETS (Images / Stylesheets / Scripts) ---');
if (allBrokenAssets.length === 0) {
  console.log('[OK] All images, stylesheets, and scripts exist on disk! (0 missing)');
} else {
  console.log(`[!] Found ${allBrokenAssets.length} Broken Assets:`);
  allBrokenAssets.forEach(a => console.log(`  File: ${a.page} -> [${a.type}] ${a.src}`));
}

console.log('\n--- 3. LINKS TO 301 REDIRECTS (Should point to final URLs) ---');
if (allRedirectLinks.length === 0) {
  console.log('[OK] No internal links pointing to 301 redirects!');
} else {
  console.log(`[i] Found ${allRedirectLinks.length} internal links pointing to redirected URLs:`);
  allRedirectLinks.forEach(r => console.log(`  File: ${r.source} -> "${r.href}" (Redirects to: "${r.destination}")`));
}

console.log('\n--- 4. SITEMAP.XML AUDIT ---');
console.log(`Sitemap URLs Count: ${sitemapUrls.size}`);
if (sitemap404s.length === 0) {
  console.log('[OK] All URLs in sitemap exist as valid pages.');
} else {
  console.log(`[!] Found ${sitemap404s.length} URLs in sitemap that do not exist:`);
  sitemap404s.forEach(u => console.log(`  ${u}`));
}

if (orphanedPages.length === 0) {
  console.log('[OK] All active pages are included in sitemap.xml.');
} else {
  console.log(`[i] Found ${orphanedPages.length} pages missing from sitemap.xml:`);
  orphanedPages.forEach(p => console.log(`  ${p.file} (${p.route})`));
}

console.log('\n--- 5. SEO ON-PAGE CHECKS (Active Pages) ---');
let missingTitle = 0, titleLenIssues = 0, missingDesc = 0, descLenIssues = 0, missingH1 = 0, multiH1 = 0;
let missingAltTotal = 0, missingDimsTotal = 0, brokenSchemasTotal = 0, genericAnchorsTotal = 0;

for (const p of activePages) {
  if (!p.title) missingTitle++;
  else if (p.titleLen < 30 || p.titleLen > 65) titleLenIssues++;

  if (!p.desc) missingDesc++;
  else if (p.descLen < 100 || p.descLen > 165) descLenIssues++;

  if (p.h1s.length === 0) missingH1++;
  if (p.h1s.length > 1) multiH1++;

  missingAltTotal += p.imagesMissingAlt.length;
  missingDimsTotal += p.imagesMissingDims.length;
  brokenSchemasTotal += p.brokenSchemas;
  genericAnchorsTotal += p.genericLinks.length;
}

console.log(`Missing <title>:                 ${missingTitle}`);
console.log(`Title length (<30 or >65 chars): ${titleLenIssues}`);
console.log(`Missing Meta Description:        ${missingDesc}`);
console.log(`Desc length (<100 or >165 chars):${descLenIssues}`);
console.log(`Missing <h1>:                    ${missingH1}`);
console.log(`Multiple <h1>:                   ${multiH1}`);
console.log(`Images Missing Alt:              ${missingAltTotal}`);
console.log(`Images Missing Width/Height:     ${missingDimsTotal}`);
console.log(`Broken JSON-LD Schemas:          ${brokenSchemasTotal}`);
console.log(`Generic Anchor Texts:            ${genericAnchorsTotal}`);

// Save detailed JSON report
fs.writeFileSync(path.join(__dirname, 'crawl-results.json'), JSON.stringify({
  pagesCount: pagesData.length,
  activePagesCount: activePages.length,
  brokenLinks: allBrokenLinks,
  brokenAssets: allBrokenAssets,
  redirectLinks: allRedirectLinks,
  sitemap404s,
  orphanedPages,
  pages: pagesData
}, null, 2));

console.log('\nDetailed crawl data saved to scripts/crawl-results.json\n');
