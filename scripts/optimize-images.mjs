import sharp from 'sharp';
import { readdir, stat, access } from 'node:fs/promises';
import { join, extname, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, '..', 'public');
const SKIP_DIRS = ['brand/logos', 'legacy', 'wp-content/uploads'];
const CONVERTIBLE_EXTS = new Set(['.png', '.jpg', '.jpeg']);
const WEBP_QUALITY = 80;

async function findImages(dir, images = []) {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    const relativePath = fullPath.slice(PUBLIC_DIR.length + 1);

    if (entry.isDirectory()) {
      // Skip directories in the skip list
      const shouldSkip = SKIP_DIRS.some(
        (skipDir) => relativePath === skipDir || relativePath.startsWith(skipDir + '/')
      );
      if (shouldSkip) {
        console.log(`  Skipping directory: ${relativePath}`);
        continue;
      }
      await findImages(fullPath, images);
    } else if (CONVERTIBLE_EXTS.has(extname(entry.name).toLowerCase())) {
      images.push(fullPath);
    }
  }

  return images;
}

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function convertToWebP(imagePath) {
  const ext = extname(imagePath);
  const webpPath = imagePath.slice(0, -ext.length) + '.webp';

  // Skip if WebP sibling already exists
  if (await fileExists(webpPath)) {
    return { skipped: true, path: imagePath };
  }

  try {
    await sharp(imagePath).webp({ quality: WEBP_QUALITY }).toFile(webpPath);

    const [originalStat, webpStat] = await Promise.all([
      stat(imagePath),
      stat(webpPath),
    ]);

    const savings = (
      ((originalStat.size - webpStat.size) / originalStat.size) *
      100
    ).toFixed(1);

    return {
      skipped: false,
      path: imagePath,
      originalSize: originalStat.size,
      webpSize: webpStat.size,
      savings,
    };
  } catch (err) {
    console.error(`  Error converting ${imagePath}: ${err.message}`);
    return { skipped: true, path: imagePath, error: err.message };
  }
}

async function main() {
  console.log('Image Optimization: Finding images in public/...\n');

  const images = await findImages(PUBLIC_DIR);
  console.log(`\nFound ${images.length} PNG/JPG/JPEG images to process.\n`);

  if (images.length === 0) {
    console.log('No images to convert.');
    return;
  }

  let converted = 0;
  let skipped = 0;
  let totalSaved = 0;

  // Process in batches of 10 to avoid overwhelming the system
  const BATCH_SIZE = 10;
  for (let i = 0; i < images.length; i += BATCH_SIZE) {
    const batch = images.slice(i, i + BATCH_SIZE);
    const results = await Promise.all(batch.map(convertToWebP));

    for (const result of results) {
      const rel = result.path.slice(PUBLIC_DIR.length + 1);
      if (result.skipped) {
        skipped++;
      } else {
        converted++;
        totalSaved += result.originalSize - result.webpSize;
        console.log(
          `  Converted: ${rel} (${(result.originalSize / 1024).toFixed(0)}KB -> ${(result.webpSize / 1024).toFixed(0)}KB, ${result.savings}% smaller)`
        );
      }
    }
  }

  console.log(`\nDone!`);
  console.log(`  Converted: ${converted} images`);
  console.log(`  Skipped:   ${skipped} images (WebP already exists)`);
  if (totalSaved > 0) {
    console.log(
      `  Saved:     ${(totalSaved / 1024 / 1024).toFixed(2)} MB total`
    );
  }
}

main().catch((err) => {
  console.error('Image optimization failed:', err);
  process.exit(1);
});
