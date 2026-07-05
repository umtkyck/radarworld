// One-shot generator for PNG app icons, favicon.ico, and the OG image.
// Run with: node scripts/generate-icons.mjs
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const root = path.resolve(import.meta.dirname, "..");
const iconSvg = fs.readFileSync(path.join(root, "app", "icon.svg"));

const ogSvg = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="sweep" x1="210" y1="315" x2="292" y2="233" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#34D399" stop-opacity="0"/>
      <stop offset="1" stop-color="#34D399" stop-opacity="0.85"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#0F172A"/>

  <!-- Radar mark -->
  <circle cx="210" cy="315" r="118" fill="none" stroke="#FFFFFF" stroke-opacity="0.18" stroke-width="12"/>
  <circle cx="210" cy="315" r="70" fill="none" stroke="#FFFFFF" stroke-opacity="0.38" stroke-width="12"/>
  <path d="M210 315 L210 197 A118 118 0 0 1 293.4 231.6 Z" fill="url(#sweep)"/>
  <line x1="210" y1="315" x2="293.4" y2="231.6" stroke="#34D399" stroke-width="14" stroke-linecap="round"/>
  <circle cx="293.4" cy="231.6" r="18" fill="#34D399"/>
  <circle cx="210" cy="315" r="20" fill="#FFFFFF"/>

  <!-- Text -->
  <text x="420" y="290" font-family="Arial, sans-serif" font-size="96" font-weight="bold" fill="#FFFFFF">Radar<tspan fill="#94A3B8">Cart</tspan></text>
  <text x="422" y="360" font-family="Arial, sans-serif" font-size="34" fill="#CBD5E1">Doppler radar sensors, engineered for precision</text>
  <text x="422" y="420" font-family="Arial, sans-serif" font-size="26" fill="#34D399">Rail &#183; Agriculture &#183; Sports Electronics &#183; Custom OEM</text>
</svg>
`);

// Next's apple-icon file convention does not support SVG, so ship a PNG.
const appleSvg = iconSvg.toString().replace('rx="24"', 'rx="0"');
await sharp(Buffer.from(appleSvg), { density: 300 }).resize(180, 180).png().toFile(path.join(root, "app", "apple-icon.png"));

await sharp(iconSvg, { density: 300 }).resize(192, 192).png().toFile(path.join(root, "public", "icon-192.png"));
await sharp(iconSvg, { density: 300 }).resize(512, 512).png().toFile(path.join(root, "public", "icon-512.png"));
await sharp(ogSvg, { density: 150 }).resize(1200, 630).png().toFile(path.join(root, "app", "opengraph-image.png"));

const favPng = await sharp(iconSvg, { density: 300 }).resize(48, 48).png().toBuffer();
const ico = await pngToIco([favPng]);
fs.writeFileSync(path.join(root, "app", "favicon.ico"), ico);

console.log("done");
