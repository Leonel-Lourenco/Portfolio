// Generate placeholder images for portfolio projects
// Usage: node infrastructure/generate-placeholders.js

const fs = require('fs');
const path = require('path');

const projects = [
    { name: 'brainwave', label: 'BrainWave', color: '#0066FF' },
    { name: 'spec2cad', label: 'Spec2CAD', color: '#00AA66' },
    { name: 'otto', label: 'Otto', color: '#FF6600' },
    { name: 'phantom', label: 'Phantom', color: '#6600FF' }
];

// Create SVG placeholder
function createPlaceholderSVG(label, color) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color};stop-opacity:0.8" />
      <stop offset="100%" style="stop-color:#000000;stop-opacity:0.9" />
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="800" height="450" fill="url(#grad)"/>
  <rect width="800" height="450" fill="url(#grid)"/>
  <text x="400" y="200" font-family="Inter, system-ui, sans-serif" font-size="48" font-weight="700" fill="white" text-anchor="middle">${label}</text>
  <text x="400" y="260" font-family="Inter, system-ui, sans-serif" font-size="20" fill="rgba(255,255,255,0.7)" text-anchor="middle">Demo Screenshot Coming Soon</text>
  <rect x="300" y="300" width="200" height="50" rx="8" fill="rgba(255,255,255,0.15)"/>
  <text x="400" y="332" font-family="Inter, system-ui, sans-serif" font-size="16" fill="white" text-anchor="middle">View Demo →</text>
</svg>`;
}

// Create OG image placeholder
function createOGImageSVG() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="oggrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0066FF;stop-opacity:0.3" />
      <stop offset="100%" style="stop-color:#000000;stop-opacity:1" />
    </linearGradient>
    <pattern id="oggrid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#oggrad)"/>
  <rect width="1200" height="630" fill="url(#oggrid)"/>
  <text x="600" y="260" font-family="Inter, system-ui, sans-serif" font-size="72" font-weight="700" fill="white" text-anchor="middle">Leonel Lourenco</text>
  <text x="600" y="340" font-family="Inter, system-ui, sans-serif" font-size="32" fill="rgba(255,255,255,0.7)" text-anchor="middle">Full-Stack Engineer • Portfolio</text>
  <text x="600" y="420" font-family="Inter, system-ui, sans-serif" font-size="24" fill="#0066FF" text-anchor="middle">BrainWave • Spec2CAD • Otto • Phantom</text>
</svg>`;
}

// Ensure directories exist and write files
const publicDir = path.join(__dirname, '..', 'public', 'images');

projects.forEach(project => {
    const projectDir = path.join(publicDir, project.name);
    if (!fs.existsSync(projectDir)) {
        fs.mkdirSync(projectDir, { recursive: true });
    }
    
    const svgPath = path.join(projectDir, 'thumbnail.svg');
    fs.writeFileSync(svgPath, createPlaceholderSVG(project.label, project.color));
    console.log(`✅ Created: ${svgPath}`);
});

// Create OG image
const ogPath = path.join(publicDir, 'og-image.svg');
fs.writeFileSync(ogPath, createOGImageSVG());
console.log(`✅ Created: ${ogPath}`);

console.log('\n📝 Note: SVG placeholders created. For production, replace with actual PNG screenshots.');
