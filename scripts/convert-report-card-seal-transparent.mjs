/**
 * Converts the report-card seal to a true transparent PNG.
 * This is intentionally "black-matte only" so we don't accidentally
 * remove white elements that exist inside the seal.
 *
 * Usage: node scripts/convert-report-card-seal-transparent.mjs
 */
import sharp from "sharp";

const INPUT = "public/images/report-card-seal.png";
const BLACK_THRESHOLD = 45;

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

    // Remove dark background/matte; keep whites inside the seal.
    if (r <= BLACK_THRESHOLD && g <= BLACK_THRESHOLD && b <= BLACK_THRESHOLD) {
      pixels[i + 3] = 0;
    }
  }

  const pngBuffer = await sharp(pixels, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png({ compressionLevel: 9 })
    .toBuffer();

  await sharp(pngBuffer).toFile(inputPath);
}

convert(INPUT).catch((err) => {
  console.error(err);
  process.exit(1);
});

