/**
 * Removes only near-black outer matte (keeps all white inside the emblem).
 * Usage: node scripts/convert-black-matte-only.mjs <input> <output>
 */
import sharp from "sharp";

const BLACK_THRESHOLD = 45;

const [, , inputPath, outputPath] = process.argv;
if (!inputPath || !outputPath) {
  console.error("Usage: node scripts/convert-black-matte-only.mjs <input> <output>");
  process.exit(1);
}

async function convert() {
  const { data, info } = await sharp(inputPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const pixels = new Uint8Array(data);

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    if (r <= BLACK_THRESHOLD && g <= BLACK_THRESHOLD && b <= BLACK_THRESHOLD) {
      pixels[i + 3] = 0;
    }
  }

  await sharp(Buffer.from(pixels), {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  console.log(`✓ ${outputPath} (${info.width}x${info.height})`);
}

convert().catch((err) => {
  console.error(err);
  process.exit(1);
});
