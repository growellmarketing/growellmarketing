const fs = require('fs');
const path = require('path');

// 1. Update css/style.css for .sidebar-author-name
let css = fs.readFileSync('css/style.css', 'utf8');
if (!css.includes('.sidebar-author-name')) {
    css += `
.sidebar-author-box h4,
.sidebar-author-box .sidebar-author-name {
    font-size: 17px;
    font-weight: 800;
    color: #1a162b;
    margin: 0 0 4px;
}
`;
    fs.writeFileSync('css/style.css', css, 'utf8');
    console.log('Added .sidebar-author-name to css/style.css');
}

// 2. Fix in all blog files
const blogFiles = fs.readdirSync('blog').filter(f => f.endsWith('.html'));

for (const f of blogFiles) {
    const fullPath = path.join('blog', f);
    let content = fs.readFileSync(fullPath, 'utf8');

    // Sidebar author h4 -> div.sidebar-author-name
    content = content.replace(/<div class="sidebar-widget sidebar-author-box">\s*<div class="avatar">(.*?)<\/div>\s*<h4>(.*?)<\/h4>/gis,
        '<div class="sidebar-widget sidebar-author-box">\n                        <div class="avatar">$1</div>\n                        <div class="sidebar-author-name">$2</div>');

    // Also match when class or spacing differs
    content = content.replace(/<div class="avatar">([^<]*?)<\/div>\s*<h4>([^<]*?)<\/h4>/gi,
        '<div class="avatar">$1</div>\n                        <div class="sidebar-author-name">$2</div>');

    // Replace callout box h4 with div or h3
    // Callouts: Pro-tip, Ask Yourself, The Hybrid Search Strategy, Efficiency Gain, etc.
    content = content.replace(/<h4>(Pro-Tip[^<]*?)<\/h4>/gi, '<div class="protip-title" style="font-weight:700; color:#654E9F; margin-bottom:8px;">$1</div>');
    content = content.replace(/<h4>(Ask Yourself:?)<\/h4>/gi, '<div class="protip-title" style="font-weight:700; color:#654E9F; margin-bottom:8px;">$1</div>');
    content = content.replace(/<h4>(The Hybrid Search Strategy:?)<\/h4>/gi, '<div class="protip-title" style="font-weight:700; color:#654E9F; margin-bottom:8px;">$1</div>');
    content = content.replace(/<h4>(Topic Cluster Architecture:?)<\/h4>/gi, '<div class="protip-title" style="font-weight:700; color:#654E9F; margin-bottom:8px;">$1</div>');
    content = content.replace(/<h4>(High-ROI Ad Strategy[^<]*?)<\/h4>/gi, '<div class="protip-title" style="font-weight:700; color:#654E9F; margin-bottom:8px;">$1</div>');
    content = content.replace(/<h4>(High-Converting Google Ads Formula:?)<\/h4>/gi, '<div class="protip-title" style="font-weight:700; color:#654E9F; margin-bottom:8px;">$1</div>');
    content = content.replace(/<h4>(High-Impact Ajmer Hashtag Mix:?)<\/h4>/gi, '<div class="protip-title" style="font-weight:700; color:#654E9F; margin-bottom:8px;">$1</div>');
    content = content.replace(/<h4>(Efficiency Gain:?)<\/h4>/gi, '<div class="protip-title" style="font-weight:700; color:#654E9F; margin-bottom:8px;">$1</div>');
    content = content.replace(/<h4>(The CTA Rule of Thumb:?)<\/h4>/gi, '<div class="protip-title" style="font-weight:700; color:#654E9F; margin-bottom:8px;">$1</div>');

    // Subsections in content strategy and organic social: change h4 to h3 (valid under h2)
    content = content.replace(/<h4>(Week [1-4]:[^<]*?)<\/h4>/gi, '<h3>$1</h3>');
    content = content.replace(/<h4>(Discovery &amp; Education|Comparison &amp; Proof|Conversion &amp; Close)<\/h4>/gi, '<h3>$1</h3>');
    content = content.replace(/<h4>(9 High-Converting[\s\S]*?)<\/h4>/gi, '<h3>$1</h3>');
    content = content.replace(/<h4>(The 5-Step Follower-to-Buyer Conversion Pipeline)<\/h4>/gi, '<h3>$1</h3>');
    content = content.replace(/<h4>(The 6 High-Converting Call to[\s\S]*?)<\/h4>/gi, '<h3>$1</h3>');

    fs.writeFileSync(fullPath, content, 'utf8');
}

console.log('Cleaned up blog h4 tags!');
