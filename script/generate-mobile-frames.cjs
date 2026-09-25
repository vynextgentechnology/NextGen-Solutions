const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.resolve(__dirname, '../client/public/hero-frames');
const DEST_DIR = path.resolve(__dirname, '../client/public/hero-frames-mobile');

async function generateMobileFrames() {
  console.log('Generating dedicated mobile frames (800x450 Lanczos3)...');
  console.log(`Source: ${SOURCE_DIR}`);
  console.log(`Destination: ${DEST_DIR}`);

  if (!fs.existsSync(DEST_DIR)) {
    fs.mkdirSync(DEST_DIR, { recursive: true });
  }

  const files = fs.readdirSync(SOURCE_DIR)
    .filter(file => file.endsWith('.jpg') || file.endsWith('.jpeg'))
    .sort();

  console.log(`Found ${files.length} frames to resize for mobile.`);

  let totalOriginalSize = 0;
  let totalMobileSize = 0;
  let processedCount = 0;
  const startTime = Date.now();

  const BATCH_SIZE = 12;
  for (let i = 0; i < files.length; i += BATCH_SIZE) {
    const batch = files.slice(i, i + BATCH_SIZE);

    await Promise.all(batch.map(async (filename) => {
      const sourcePath = path.join(SOURCE_DIR, filename);
      const destPath = path.join(DEST_DIR, filename);

      const origStat = fs.statSync(sourcePath);
      totalOriginalSize += origStat.size;

      await sharp(sourcePath)
        .resize({ width: 800, height: 450, kernel: 'lanczos3' })
        .sharpen({ sigma: 0.9, m1: 1.2, m2: 0.5 })
        .jpeg({ quality: 84, mozjpeg: true })
        .toFile(destPath);

      const destStat = fs.statSync(destPath);
      totalMobileSize += destStat.size;

      processedCount++;
    }));

    if (processedCount % 50 === 0 || processedCount === files.length) {
      const pct = ((processedCount / files.length) * 100).toFixed(0);
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      console.log(`Processed ${processedCount}/${files.length} mobile frames (${pct}%) in ${elapsed}s...`);
    }
  }

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
  const origMB = (totalOriginalSize / (1024 * 1024)).toFixed(2);
  const mobMB = (totalMobileSize / (1024 * 1024)).toFixed(2);
  const reduction = (((totalOriginalSize - totalMobileSize) / totalOriginalSize) * 100).toFixed(1);

  console.log('\n===========================================');
  console.log(' Mobile Frame Generation Complete!');
  console.log(` Frames: ${processedCount}`);
  console.log(` Time: ${totalTime}s`);
  console.log(` Desktop Size: ${origMB} MB`);
  console.log(` Mobile Size: ${mobMB} MB (${reduction}% reduction)`);
  console.log(` Location: ${DEST_DIR}`);
  console.log('===========================================\n');
}

generateMobileFrames().catch(err => {
  console.error('Error generating mobile frames:', err);
  process.exit(1);
});
