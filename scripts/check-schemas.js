const fs = require('fs');
const report = JSON.parse(fs.readFileSync('scripts/meta-report.json', 'utf8'));

for (const item of report) {
    const content = fs.readFileSync(item.file, 'utf8');
    const schemaMatches = [...content.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)];
    const types = [];
    for (const sm of schemaMatches) {
        try {
            const data = JSON.parse(sm[1]);
            if (data['@type']) types.push(data['@type']);
            if (data['@graph']) types.push(...data['@graph'].map(g => g['@type']));
        } catch (e) {
            types.push('JSON_PARSE_ERROR');
        }
    }
    console.log(`${item.file}: schemas=[${types.join(', ')}]`);
}
