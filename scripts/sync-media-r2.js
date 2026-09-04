/**
 * sync-media-r2.js
 * Automatically uploads/syncs all images and videos to Cloudflare R2 bucket.
 * STRICT POLICY: Only media assets (images, videos) are uploaded.
 * Code files (HTML, CSS, JS, JSON, MD) are strictly excluded.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

// Cloudflare R2 Credentials & Configuration
const CONFIG = {
  accountId: '51510cb84e5acf1ca18df5bd232aa194',
  accessKeyId: 'a0b3d41a6d7bcc10ef8f1a45ae08d8e7',
  secretAccessKey: 'b90b4a7123e26c91817d0ad30b4133a8d8d6296bf6fcf878f85168c1bd35cb2f',
  bucket: 'growell-marketing-media',
  publicDomain: 'https://pub-13bf98d4935c47aaa575bd59013f4a38.r2.dev',
  region: 'auto',
  service: 's3',
  concurrency: 6
};

// Allowed media file extensions only
const MEDIA_EXTENSIONS = new Set([
  '.webp', '.png', '.jpg', '.jpeg', '.svg', '.gif', '.mp4', '.webm', '.avif', '.ico'
]);

// Directories to ignore
const IGNORED_DIRS = new Set([
  '.git', 'node_modules', '.system_generated', 'scratch', 'scripts', '.vscode'
]);

// MIME types mapping
const MIME_TYPES = {
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.gif': 'image/gif',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon'
};

function getMimeType(ext) {
  return MIME_TYPES[ext.toLowerCase()] || 'application/octet-stream';
}

function uriEscape(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, c => '%' + c.charCodeAt(0).toString(16).toUpperCase());
}

function encodePath(key) {
  return key.split('/').map(uriEscape).join('/');
}

function hmac(key, string) {
  return crypto.createHmac('sha256', key).update(string).digest();
}

function getSignatureKey(key, dateStamp, regionName, serviceName) {
  const kDate = hmac('AWS4' + key, dateStamp);
  const kRegion = hmac(kDate, regionName);
  const kService = hmac(kRegion, serviceName);
  return hmac(kService, 'aws4_request');
}

// Recursively find only media files
function findMediaFiles(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (IGNORED_DIRS.has(entry.name)) continue;

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(findMediaFiles(fullPath));
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (MEDIA_EXTENSIONS.has(ext)) {
        const relPath = path.relative(process.cwd(), fullPath).replace(/\\/g, '/');
        const stat = fs.statSync(fullPath);
        results.push({
          fullPath,
          relPath,
          size: stat.size,
          ext
        });
      }
    }
  }
  return results;
}

// Upload a single file using AWS SigV4
function uploadFile(fileObj, retryCount = 0) {
  return new Promise((resolve, reject) => {
    const { fullPath, relPath, size, ext } = fileObj;
    const body = fs.readFileSync(fullPath);
    const host = `${CONFIG.accountId}.r2.cloudflarestorage.com`;
    const mimeType = getMimeType(ext);

    const now = new Date();
    const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
    const dateStamp = amzDate.substr(0, 8);
    const payloadHash = crypto.createHash('sha256').update(body).digest('hex');

    const canonicalUri = `/${CONFIG.bucket}/${encodePath(relPath)}`;
    const canonicalHeaders = 
      `host:${host}\n` +
      `x-amz-content-sha256:${payloadHash}\n` +
      `x-amz-date:${amzDate}\n`;
    const signedHeaders = 'host;x-amz-content-sha256;x-amz-date';

    const canonicalRequest = [
      'PUT',
      canonicalUri,
      '',
      canonicalHeaders,
      signedHeaders,
      payloadHash
    ].join('\n');

    const credentialScope = `${dateStamp}/${CONFIG.region}/${CONFIG.service}/aws4_request`;
    const stringToSign = [
      'AWS4-HMAC-SHA256',
      amzDate,
      credentialScope,
      crypto.createHash('sha256').update(canonicalRequest).digest('hex')
    ].join('\n');

    const signingKey = getSignatureKey(CONFIG.secretAccessKey, dateStamp, CONFIG.region, CONFIG.service);
    const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex');
    const authHeader = `AWS4-HMAC-SHA256 Credential=${CONFIG.accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

    const req = https.request({
      hostname: host,
      path: canonicalUri,
      method: 'PUT',
      headers: {
        'Host': host,
        'Content-Type': mimeType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'x-amz-date': amzDate,
        'x-amz-content-sha256': payloadHash,
        'Authorization': authHeader,
        'Content-Length': body.length
      }
    }, (res) => {
      let resBody = '';
      res.on('data', chunk => resBody += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ success: true, relPath, size });
        } else {
          if (retryCount < 3) {
            console.warn(`[Retry ${retryCount + 1}] Retrying ${relPath} (Status: ${res.statusCode})...`);
            setTimeout(() => {
              uploadFile(fileObj, retryCount + 1).then(resolve).catch(reject);
            }, 1000 * (retryCount + 1));
          } else {
            reject(new Error(`Failed to upload ${relPath}: Status ${res.statusCode} - ${resBody}`));
          }
        }
      });
    });

    req.on('error', (err) => {
      if (retryCount < 3) {
        console.warn(`[Retry ${retryCount + 1}] Network error for ${relPath}: ${err.message}`);
        setTimeout(() => {
          uploadFile(fileObj, retryCount + 1).then(resolve).catch(reject);
        }, 1000 * (retryCount + 1));
      } else {
        reject(err);
      }
    });

    req.write(body);
    req.end();
  });
}

// Queue runner with concurrency control
async function runUploadQueue(files) {
  let completed = 0;
  let totalBytes = 0;
  const total = files.length;
  const startTime = Date.now();

  console.log(`\n======================================================`);
  console.log(`🚀 Starting Cloudflare R2 Media Sync`);
  console.log(`📦 Bucket: ${CONFIG.bucket}`);
  console.log(`🌐 CDN URL: ${CONFIG.publicDomain}`);
  console.log(`📁 Total Media Files to Upload: ${total}`);
  console.log(`======================================================\n`);

  let index = 0;
  const workers = Array.from({ length: CONFIG.concurrency }, async (_, workerId) => {
    while (index < files.length) {
      const fileIndex = index++;
      const file = files[fileIndex];
      try {
        await uploadFile(file);
        completed++;
        totalBytes += file.size;
        const progress = ((completed / total) * 100).toFixed(1);
        const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
        console.log(`[${completed}/${total}] (${progress}%) ✓ ${file.relPath} (${sizeMb} MB)`);
      } catch (err) {
        console.error(`❌ [${fileIndex + 1}/${total}] Error uploading ${file.relPath}:`, err.message);
      }
    }
  });

  await Promise.all(workers);

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(1);
  const totalMb = (totalBytes / (1024 * 1024)).toFixed(2);

  console.log(`\n======================================================`);
  console.log(`🎉 Sync Complete!`);
  console.log(`✅ Uploaded: ${completed} / ${total} media files`);
  console.log(`📊 Total Transferred: ${totalMb} MB in ${durationSec}s`);
  console.log(`🔗 Media CDN Base: ${CONFIG.publicDomain}/`);
  console.log(`======================================================\n`);
}

// Main execution
async function main() {
  const mediaFiles = findMediaFiles('.');
  if (mediaFiles.length === 0) {
    console.log('No media files found to upload.');
    return;
  }
  await runUploadQueue(mediaFiles);
}

main().catch(err => {
  console.error('Fatal sync error:', err);
  process.exit(1);
});
