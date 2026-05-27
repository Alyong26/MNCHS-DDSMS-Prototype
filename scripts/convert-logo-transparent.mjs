/**
 * Converts logo to true PNG with transparency (removes near-black JPEG matte).
 * Usage: node scripts/convert-logo-transparent.mjs [inputPath]
 */
import sharp from "sharp";
import { copyFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, "..");
const DEFAULT_INPUT = join(
  PROJECT_ROOT,
  "public/images/logo.png",
);
const OUTPUT = join(PROJECT_ROOT, "public/images/logo.png");
const ICON_OUTPUT = join(PROJECT_ROOT, "src/app/icon.png");

const BLACK_THRESHOLD = 45;
const WHITE_THRESHOLD = 248;

async function convert(inputPath) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = new Uint8Array(data);
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    if (r <= BLACK_THRESHOLD && g <= BLACK_THRESHOLD && b <= BLACK_THRESHOLD) {
      pixels[i + 3] = 0;
      continue;
    }
    if (r >= WHITE_THRESHOLD && g >= WHITE_THRESHOLD && b >= WHITE_THRESHOLD) {
      pixels[i + 3] = 0;
    }
  }

  const pngBuffer = await sharp(pixels, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png({ compressionLevel: 9 })
    .toBuffer();

  await sharp(pngBuffer).toFile(OUTPUT);
  copyFileSync(OUTPUT, ICON_OUTPUT);

  const header = pngBuffer.subarray(0, 8).toString("hex");
  console.log(`Wrote ${OUTPUT} (${info.width}x${info.height}, PNG sig: ${header})`);
  console.log(`Wrote ${ICON_OUTPUT}`);
}

const input = process.argv[2] || DEFAULT_INPUT;
convert(input).catch((err) => {
  console.error(err);
  process.exit(1);
});
