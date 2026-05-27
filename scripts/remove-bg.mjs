/**
 * Removes outer background from a logo PNG using flood-fill from all four corners.
 * This preserves white/light colours inside the emblem (dove, text, etc.).
 *
 * Usage: node scripts/remove-bg.mjs <input> [output] [--resize=N]
 */
import sharp from "sharp";

const TOLERANCE = 35; // colour distance from seed pixel to consider "background"

function colorDist(r1, g1, b1, r2, g2, b2) {
  return Math.max(Math.abs(r1 - r2), Math.abs(g1 - g2), Math.abs(b1 - b2));
}

async function removeBg(inputPath, outputPath, resizeTo) {
  let pipeline = sharp(inputPath).ensureAlpha();
  if (resizeTo) pipeline = pipeline.resize(resizeTo, resizeTo, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } });

  const { data, info } = await pipeline.raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const pixels = new Uint8Array(data);

  function idx(x, y) { return (y * width + x) * 4; }
  function getPixel(x, y) {
    const i = idx(x, y);
    return [pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3]];
  }
  function setAlpha(x, y, a) { pixels[idx(x, y) + 3] = a; }

  // Collect seed colour from all four corners
  const corners = [
    [0, 0], [width - 1, 0], [0, height - 1], [width - 1, height - 1],
  ];
  const seeds = corners.map(([x, y]) => getPixel(x, y));

  const visited = new Uint8Array(width * height);
  const queue = [];

  function enqueue(x, y) {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const pos = y * width + x;
    if (visited[pos]) return;
    visited[pos] = 1;
    const [r, g, b] = getPixel(x, y);
    // Must be close to at least one corner seed
    const match = seeds.some(([sr, sg, sb]) => colorDist(r, g, b, sr, sg, sb) <= TOLERANCE);
    if (match) queue.push([x, y]);
  }

  corners.forEach(([x, y]) => enqueue(x, y));

  while (queue.length > 0) {
    const [x, y] = queue.pop();
    setAlpha(x, y, 0);
    enqueue(x - 1, y);
    enqueue(x + 1, y);
    enqueue(x, y - 1);
    enqueue(x, y + 1);
  }

  const out = await sharp(Buffer.from(pixels), {
    raw: { width, height, channels: 4 },
  }).png({ compressionLevel: 9 }).toBuffer();

  await sharp(out).toFile(outputPath || inputPath);
  console.log(`✓ ${outputPath || inputPath} (${width}x${height})`);
}

const [, , input, ...rest] = process.argv;
const resizeArg = rest.find(a => a.startsWith("--resize="));
const resize = resizeArg ? parseInt(resizeArg.split("=")[1]) : null;
const output = rest.find(a => !a.startsWith("--")) || input;

if (!input) {
  console.error("Usage: node scripts/remove-bg.mjs <input> [output] [--resize=N]");
  process.exit(1);
}

removeBg(input, output, resize).catch(err => { console.error(err); process.exit(1); });
