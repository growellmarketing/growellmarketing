const fs = require('fs');

function getJpegDimensions(buffer) {
    let offset = 2;
    while (offset < buffer.length) {
        if (buffer[offset] !== 0xFF) break;
        const marker = buffer[offset + 1];
        if (marker === 0xC0 || marker === 0xC2) {
            const height = buffer.readUInt16BE(offset + 5);
            const width = buffer.readUInt16BE(offset + 7);
            return { width, height };
        }
        const length = buffer.readUInt16BE(offset + 2);
        offset += 2 + length;
    }
    return null;
}

const files = [
    'how-much-does-digital-marketing-cost-in-ajmer.webp',
    'digital-marketing-for-real-estate-businesses-in-ajmer.webp',
    'google-ads-vs-seo-for-ajmer-businesses.webp',
    'social-media-marketing-for-businesses-in-ajmer.webp'
];

for (const f of files) {
    const buf = fs.readFileSync('blog-assets/' + f);
    const dim = getJpegDimensions(buf);
    console.log(`${f}: ${dim ? `${dim.width}x${dim.height} (ratio: ${(dim.width/dim.height).toFixed(3)})` : 'not jpeg'}`);
}
