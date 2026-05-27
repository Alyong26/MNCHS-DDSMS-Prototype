/**
 * Masks a circular emblem out of a square PNG (e.g., logo on black background),
 * while preserving ALL inner details (including black text/lines).
 *
 * It works by:
 * 1) Detecting the outer emblem radius using pixels that differ from the corner background color.
 * 2) Setting alpha=0 for pixels outside that radius.
 *
 * Usage:
 *   node scripts/mask-circle.mjs <input> <output> [--resize=N]
 */
import sharp from "sharp";

function colorDist(r1, g1, b1, r2, g2, b2) {
  return Math.max(Math.abs(r1 - r2), Math.abs(g1 - g2), Math.abs(b1 - b2));
}

const [, , inputPath, outputPath, ...rest] = process.argv;
const resizeArg = rest.find((a) => a.startsWith("--resize="));
const resizeTo = resizeArg ? parseInt(resizeArg.split("=")[1], 10) : null;

if (!inputPath || !outputPath) {
  console.error("Usage: node scripts/mask-circle.mjs <input> <output> [--resize=N]");
  process.exit(1);
}

const BG_TOLERANCE = 18; // how different a pixel must be from corner background

async function main() {
  let pipeline = sharp(inputPath).ensureAlpha();
  if (resizeTo) {
    pipeline = pipeline.resize(resizeTo, resizeTo, { fit: "contain" });
  }

  const { data, info } = await pipeline.raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const cx = (width - 1) / 2;
  const cy = (height - 1) / 2;

  // Corner background seed (top-left)
  const cornerIdx = 0;
  const br = data[cornerIdx];
  const bg = data[cornerIdx + 1];
  const bb = data[cornerIdx + 2];

  // Estimate radius from pixels that are NOT background.
  let maxR = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      // If it's fully transparent already, ignore it.
      if (a === 0) continue;

      const dist = colorDist(r, g, b, br, bg, bb);
      if (dist > BG_TOLERANCE) {
        const dx = x - cx;
        const dy = y - cy;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d > maxR) maxR = d;
      }
    }
  }

  // Add a small cushion so we don't cut off the gear teeth.
  const radius = maxR + 2;
  const radius2 = radius * radius;

  // Mask outside circle
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const dx = x - cx;
      const dy = y - cy;
      const d2 = dx * dx + dy * dy;
      if (d2 > radius2) data[i + 3] = 0;
    }
  }

  await sharp(Buffer.from(data), {
    raw: { width, height, channels: 4 },
  })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  console.log(`✓ ${outputPath} masked as circle (${width}×${height})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

