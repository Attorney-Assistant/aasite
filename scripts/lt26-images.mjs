import sharp from 'sharp';
import { mkdirSync, writeFileSync, statSync } from 'fs';
import { join } from 'path';

const ADS = '/Users/nicole/Library/CloudStorage/OneDrive-EOLLLC(DBATurnKeyOps)/Marketing/Ads';
const HERO = join(ADS, '1 Comic Service Hero Ads');
const FT = join(ADS, 'Free Trial');
const OUT = '/Users/nicole/Documents/AttorneyAssistant/public/images/lp/late2026';
mkdirSync(OUT, { recursive: true });

// kind: 'hero' (<200KB, widths 1600/800) or 'square' (<80KB, widths 800/400)
const files = [
  { src: join(HERO, 'answer phones/page-asset answer phones.png'), slug: 'answer-phones-hero', kind: 'hero' },
  { src: join(HERO, 'answer phones/1.1 square 1200x1200 answer phones.jpeg'), slug: 'answer-phones-square', kind: 'square' },
  { src: join(HERO, 'overnight intake/page-asset Overnight intake.png'), slug: 'overnight-intake-hero', kind: 'hero' },
  { src: join(HERO, 'overnight intake/ad 2 1.1 square 1200×1200 Overnight intake.jpeg'), slug: 'overnight-intake-square', kind: 'square' },
  { src: join(HERO, 'calendar inbox/page-asset calendar inbox.png'), slug: 'calendar-inbox-hero', kind: 'hero' },
  { src: join(HERO, 'we sort your mail/1-1.png'), slug: 'sort-mail-square', kind: 'square' },
  { src: join(HERO, 'medical records/1.1 medical records.jpeg'), slug: 'medical-records-square', kind: 'square' },
  { src: join(HERO, 'clean your crm/1-1 clean your crm.png'), slug: 'clean-crm-square', kind: 'square' },
  { src: join(HERO, 'pleadings/page-asset pleadings.png'), slug: 'pleadings-hero', kind: 'hero' },
  { src: join(HERO, 'calendar inbox/1-1 calendar inbox.png'), slug: 'calendar-inbox-square', kind: 'square' },
  { src: join(HERO, 'we sort your mail/page-asset.png'), slug: 'sort-mail-hero', kind: 'hero' },
  { src: join(HERO, 'medical records/page-asset medical records.png'), slug: 'medical-records-hero', kind: 'hero' },
  { src: join(HERO, 'negotiate liens/page-asset negotiate liens.png'), slug: 'negotiate-liens-hero', kind: 'hero' },
  { src: join(HERO, 'negotiate liens/1-1 negotiate liens.png'), slug: 'negotiate-liens-square', kind: 'square' },
  { src: join(HERO, 'clean your crm/page-asset clean your crm.png'), slug: 'clean-crm-hero', kind: 'hero' },
  { src: join(FT, 'Concept 1/Comic_THE-VOICE-MAILVOID_1440x1440_OfferA.jpg'), slug: 'villain-voicemail-void', kind: 'square', villain: true, cropTop: 572 },
  { src: join(FT, 'Concept 2/Comic_THE-18-SECOND-BANDIT_1-1_1440x1440_OfferA.jpg'), slug: 'villain-18-second-bandit', kind: 'square', villain: true, cropTop: 634 },
  { src: join(FT, 'Concept 3/Comic_THE-MONEY-SHREDDER_1-1_1440x1440_OfferA.jpg'), slug: 'villain-money-shredder', kind: 'square', villain: true, cropTop: 620 },
  { src: join(FT, 'Concept 4/Comic_THE-PAPER-KRAKEN_1-1_1440x1440_OfferA.jpg'), slug: 'villain-paper-kraken', kind: 'square', villain: true, cropTop: 636 },
  { src: join(FT, 'Concept 6/Comic_THE-HOLD-MUSIC-HYDRA_1-1_1440x1440_OfferA.jpg'), slug: 'villain-hold-music-hydra', kind: 'square', villain: true, cropTop: 690 },
  { src: join(FT, 'Concept 7/Comic_THE-REVOLVING-DOOR_1440x1440_OfferA.jpg'), slug: 'villain-revolving-door', kind: 'square', villain: true, cropTop: 630 },
  { src: join(FT, 'Concept 8/Comic_THE-CALENDAR-GREMLINS_1-1_1440x1440_OfferA.jpg'), slug: 'villain-calendar-gremlins', kind: 'square', villain: true, cropTop: 672 },
  { src: join(FT, 'Concept 9/Comic_THE DUPLICATE BLOB_1-1_1440x1440_OfferA.jpg'), slug: 'villain-duplicate-blob', kind: 'square', villain: true, cropTop: 678 },
];

const BUDGET = { hero: 200 * 1024, square: 80 * 1024 };
const WIDTHS = { hero: [1600, 800], square: [800, 400] };

async function encodeUnderBudget(pipelineFactory, dest, budget, startQ) {
  for (let q = startQ; q >= 34; q -= 6) {
    await pipelineFactory().webp({ quality: q, effort: 5 }).toFile(dest);
    if (statSync(dest).size <= budget) return { q, size: statSync(dest).size };
  }
  return { q: 'floor', size: statSync(dest).size };
}


// Villain cards ship only the top comic strip: crop before resizing.
function srcPipe(f) {
  const p = sharp(f.src);
  return f.cropTop ? p.extract({ left: 0, top: 0, width: 1440, height: f.cropTop }) : p;
}

const manifest = {};
for (const f of files) {
  const meta = await sharp(f.src).metadata();
  if (f.villain && (meta.width !== 1440 || meta.height !== 1440)) {
    throw new Error(`Villain ${f.slug} is ${meta.width}x${meta.height}, expected 1440x1440`);
  }
  const widths = WIDTHS[f.kind];
  const entry = { source: f.src.split('/Ads/')[1], sourceW: meta.width, sourceH: meta.height, variants: {} };
  for (const w of widths) {
    const dest = join(OUT, `${f.slug}${w === widths[0] ? '' : '-' + w}.webp`);
    const budget = w === widths[0] ? BUDGET[f.kind] : BUDGET[f.kind] / 2;
    // Prefer the largest width that fits the budget at a reasonable quality:
    // step quality down first, then width, so dense comic art still fits.
    const widthLadder = f.kind === 'square' && w === widths[0] ? [w, 720, 640, 560] : [w];
    let r = null, usedWidth = w;
    outer: for (const tryW of widthLadder) {
      const width = Math.min(tryW, meta.width);
      for (let q = f.kind === 'hero' ? 74 : 66; q >= 42; q -= 6) {
        await srcPipe(f).resize({ width }).webp({ quality: q, effort: 5 }).toFile(dest);
        const size = statSync(dest).size;
        if (size <= budget) { r = { q, size }; usedWidth = tryW; break outer; }
      }
    }
    if (!r) { r = { q: 'floor', size: statSync(dest).size }; usedWidth = widthLadder[widthLadder.length - 1]; }
    const outMeta = await sharp(dest).metadata();
    entry.variants[w] = { file: dest.split('/public')[1], w: outMeta.width, h: outMeta.height, kb: Math.round(r.size / 1024), q: r.q };
  }
  // JPEG fallback at primary width, same budget
  const jpgDest = join(OUT, `${f.slug}.jpg`);
  const jpgLadder = f.kind === 'square' ? [widths[0], 720, 640, 560] : [widths[0]];
  jpgOuter: for (const tryW of jpgLadder) {
    for (let q = 68; q >= 36; q -= 6) {
      await srcPipe(f).resize({ width: Math.min(tryW, meta.width) }).jpeg({ quality: q, mozjpeg: true }).toFile(jpgDest);
      if (statSync(jpgDest).size <= BUDGET[f.kind]) break jpgOuter;
    }
  }
  entry.variants.jpg = { file: jpgDest.split('/public')[1], kb: Math.round(statSync(jpgDest).size / 1024) };
  manifest[f.slug] = entry;
  console.log(`${f.slug}: ${Object.entries(entry.variants).map(([k, v]) => `${k}=${v.kb}KB`).join(' ')} (${entry.variants[widths[0]].w}x${entry.variants[widths[0]].h})`);
}
writeFileSync('/Users/nicole/Documents/AttorneyAssistant/src/data/lt26-images.json', JSON.stringify(manifest, null, 2));
console.log('DONE');
