/**
 * Generates PWA / home-screen icons from public/images/logo.png (transparent PNG).
 * iOS requires opaque apple-touch-icon (transparent → white square).
 * Usage: node scripts/generate-pwa-icons.mjs
 */
import sharp from "sharp";
import { mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SOURCE = join(ROOT, "public/images/logo.png");
const ICONS_DIR = join(ROOT, "public/icons");

/** School brand maroon — opaque background for iOS / desktop shortcuts */
const BRAND_BG = { r: 82, g: 10, b: 14, alpha: 1 };
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

/** Full-bleed icon with logo on brand color (no white matte on iOS) */
async function iconOnBrandBackground(size, logoScale = 0.9) {
  const inner = Math.round(size * logoScale);
  const pad = Math.round((size - inner) / 2);
  const logo = await sharp(SOURCE)
    .resize(inner, inner, { fit: "contain", background: TRANSPARENT })
    .png()
    .toBuffer();

  return sharp({
    create: { width: size, height: size, channels: 4, background: BRAND_BG },
  })
    .composite([{ input: logo, top: pad, left: pad }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

/** Maskable — transparent padding for Android adaptive icons */
async function maskableIcon(size) {
  const inner = Math.round(size * 0.52);
  const pad = Math.round((size - inner) / 2);
  return sharp(SOURCE)
    .resize(inner, inner, { fit: "contain", background: TRANSPARENT })
    .extend({
      top: pad,
      bottom: pad,
      left: pad,
      right: pad,
      background: TRANSPARENT,
    })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

async function main() {
  mkdirSync(ICONS_DIR, { recursive: true });

  const sizes = [
    { name: "icon-192.png", size: 192, fn: () => iconOnBrandBackground(192, 0.9) },
    { name: "icon-512.png", size: 512, fn: () => iconOnBrandBackground(512, 0.9) },
    { name: "apple-touch-icon.png", size: 180, fn: () => iconOnBrandBackground(180, 0.88) },
    { name: "icon-maskable-512.png", size: 512, fn: () => maskableIcon(512) },
  ];

  for (const { name, size, fn } of sizes) {
    const buf = await fn();
    await sharp(buf).toFile(join(ICONS_DIR, name));
    console.log(`✓ ${name} (${size}×${size})`);
  }

  await sharp(await iconOnBrandBackground(512, 0.9)).toFile(join(ROOT, "src/app/icon.png"));
  console.log("✓ src/app/icon.png (512×512, brand background)");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
