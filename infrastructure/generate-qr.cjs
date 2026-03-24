// QR Code Generator for Portfolio
// Usage: node infrastructure/generate-qr.js <url>

const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const url = process.argv[2] || 'https://example.cloudfront.net';
const outputPath = path.join(__dirname, '..', 'public', 'images', 'portfolio-qr.png');

// Ensure output directory exists
const outputDir = path.dirname(outputPath);
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Generate QR code with high error correction for print
QRCode.toFile(outputPath, url, {
    type: 'png',
    width: 400,  // High resolution for print
    margin: 2,
    errorCorrectionLevel: 'H',  // Highest error correction
    color: {
        dark: '#000000',
        light: '#FFFFFF'
    }
}, (err) => {
    if (err) {
        console.error('❌ Error generating QR code:', err);
        process.exit(1);
    }
    console.log('✅ QR code generated:', outputPath);
    console.log('🔗 URL encoded:', url);
    console.log('📐 Size: 400x400px (suitable for print)');
});
