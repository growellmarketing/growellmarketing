const fs = require('fs');
const path = require('path');

const rootDir = 'e:/Growell Marketing';

function getFiles(dir, recursive = true) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (recursive && !['node_modules', '.git', 'scripts'].includes(file)) {
        results = results.concat(getFiles(fullPath, recursive));
      }
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const allHtmlFiles = getFiles(rootDir);

// Normalize routes that exist on the website
const validRoutes = new Set([
  '/',
  '/index',
  '/index.html',
  '/about-us',
  '/about-us.html',
  '/services',
  '/services.html',
  '/portfolio',
  '/portfolio.html',
  '/pricing',
  '/pricing.html',
  '/contact-us',
  '/contact-us.html',
  '/testimonials',
  '/testimonials.html',
  '/blog',
  '/blog.html',
  '/faq',
  '/faq.html',
  '/privacy-policy',
  '/privacy-policy.html',
  '/terms-conditions',
  '/terms-conditions.html',
  '/thank-you',
  '/thank-you.html',
  '/404',
  '/404.html'
]);

// Add service subpages
const servicesDir = path.join(rootDir, 'services');
if (fs.existsSync(servicesDir)) {
  fs.readdirSync(servicesDir).filter(f => f.endsWith('.html')).forEach(f => {
    const base = f.replace('.html', '');
    validRoutes.add(`/services/${base}`);
    validRoutes.add(`/services/${f}`);
    validRoutes.add(`services/${base}`);
    validRoutes.add(`services/${f}`);
  });
}

// Add blog subpages
const blogDir = path.join(rootDir, 'blog');
if (fs.existsSync(blogDir)) {
  fs.readdirSync(blogDir).filter(f => f.endsWith('.html')).forEach(f => {
    const base = f.replace('.html', '');
    validRoutes.add(`/blog/${base}`);
    validRoutes.add(`/blog/${f}`);
    validRoutes.add(`blog/${base}`);
    validRoutes.add(`blog/${f}`);
  });
}

let totalATagsChecked = 0;
let internalLinksFound = 0;
let potentialIssues = [];
const clusterSummary = {
  corePages: 0,
  services: 0,
  blog: 0
};

allHtmlFiles.forEach(filePath => {
  const relPath = path.relative(rootDir, filePath).replace(/\\/g, '/');
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract all <a ... href="..." tags
  const aTagRegex = /<a\s+[^>]*?href=["']([^"']+)["'][^>]*>/gi;
  let match;
  let pageInternalLinks = 0;

  while ((match = aTagRegex.exec(content)) !== null) {
    const href = match[1];
    totalATagsChecked++;

    // Ignore external links, mailto, tel, javascript, purely anchor #
    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
      continue;
    }
    if (href.startsWith('#') || href === '') {
      continue;
    }

    internalLinksFound++;
    pageInternalLinks++;

    // Strip hash or query params
    const cleanHref = href.split('#')[0].split('?')[0];
    if (cleanHref === '') continue; // only hash was present

    // Validate if route is recognized
    let isValid = validRoutes.has(cleanHref);

    if (!isValid) {
      if (cleanHref.startsWith('../')) {
        const resolved = path.posix.normalize('/' + path.posix.dirname(relPath) + '/' + cleanHref);
        if (validRoutes.has(resolved) || validRoutes.has(resolved.replace('.html', ''))) {
          isValid = true;
        }
      } else if (cleanHref.startsWith('./')) {
        const resolved = path.posix.normalize('/' + path.posix.dirname(relPath) + '/' + cleanHref.substring(2));
        if (validRoutes.has(resolved) || validRoutes.has(resolved.replace('.html', ''))) {
          isValid = true;
        }
      } else {
        // Test relative to current directory
        const resolved = path.posix.normalize('/' + path.posix.dirname(relPath) + '/' + cleanHref);
        if (validRoutes.has(resolved) || validRoutes.has(resolved.replace('.html', ''))) {
          isValid = true;
        }
      }
    }

    if (!isValid) {
      potentialIssues.push({
        file: relPath,
        href: href,
        cleanHref: cleanHref
      });
    }
  }

  if (relPath.startsWith('services/')) {
    clusterSummary.services += pageInternalLinks;
  } else if (relPath.startsWith('blog/')) {
    clusterSummary.blog += pageInternalLinks;
  } else {
    clusterSummary.corePages += pageInternalLinks;
  }
});

console.log('=== INTERNAL ANCHOR (<A>) LINKS AUDIT ===');
console.log(`Total HTML files examined: ${allHtmlFiles.length}`);
console.log(`Total <a> tags checked: ${totalATagsChecked}`);
console.log(`Total internal navigable <a> links: ${internalLinksFound}`);
console.log(`Internal Links distribution across categories:`, clusterSummary);

if (potentialIssues.length === 0) {
  console.log('\n[STATUS: PERFECT] 100% of internal links point to valid, existing pages/routes with 0 broken links!');
} else {
  console.log(`\nFound ${potentialIssues.length} broken or unrecognized internal link targets:`);
  potentialIssues.forEach(issue => console.log(`  [${issue.file}] -> "${issue.href}"`));
}
