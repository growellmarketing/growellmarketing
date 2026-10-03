const fs = require('fs');
const path = require('path');

function getWebPDimensions(filePath) {
    const buffer = fs.readFileSync(filePath);
    // Check RIFF header
    if (buffer.toString('ascii', 0, 4) !== 'RIFF' || buffer.toString('ascii', 8, 12) !== 'WEBP') {
        return null;
    }
    const format = buffer.toString('ascii', 12, 16);
    if (format === 'VP8 ') {
        // Lossy
        const width = buffer.readUInt16LE(26) & 0x3fff;
        const height = buffer.readUInt16LE(28) & 0x3fff;
        return { width, height, format: 'VP8' };
    } else if (format === 'VP8L') {
        // Lossless
        const b1 = buffer[21];
        const b2 = buffer[22];
        const b3 = buffer[23];
        const b4 = buffer[24];
        const width = 1 + (((b2 & 0x3f) << 8) | b1);
        const height = 1 + (((b4 & 0xf) << 10) | (b3 << 2) | ((b2 & 0xc0) >> 6));
        return { width, height, format: 'VP8L' };
    } else if (format === 'VP8X') {
        // Extended
        const width = 1 + buffer.readUIntLE(24, 3);
        const height = 1 + buffer.readUIntLE(27, 3);
        return { width, height, format: 'VP8X' };
    }
    return { format };
}

const dir = 'blog-assets';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.webp'));
for (const file of files) {
    const dim = getWebPDimensions(path.join(dir, file));
    const ratio = dim && dim.width && dim.height ? (dim.width / dim.height).toFixed(3) : 'unknown';
    console.log(`${file}: ${dim ? `${dim.width}x${dim.height}` : 'unknown'} | ratio: ${ratio}`);
}
