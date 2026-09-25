const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.resolve(__dirname, '../hero page pics');
const PUBLIC_DIR = path.resolve(__dirname, '../client/public/hero-frames');

async function processFrames() {
  console.log('Starting enhancement and upscaling of hero frames...');
  console.log(`Source directory: ${SOURCE_DIR}`);
  console.log(`Public directory: ${PUBLIC_DIR}`);

  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`Source directory does not exist: ${SOURCE_DIR}`);
    process.exit(1);
  }

  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  const files = fs.readdirSync(SOURCE_DIR)
    .filter(file => file.endsWith('.jpg') || file.endsWith('.jpeg'))
    .sort();

  console.log(`Found ${files.length} frames to process.`);

  let totalOriginalSize = 0;
  let totalEnhancedSize = 0;
  let processedCount = 0;
  const startTime = Date.now();

  // Process in concurrent batches of 8 for optimal multicore CPU utilization
  const BATCH_SIZE = 8;
  for (let i = 0; i < files.length; i += BATCH_SIZE) {
    const batch = files.slice(i, i + BATCH_SIZE);

    await Promise.all(batch.map(async (filename) => {
      const sourcePath = path.join(SOURCE_DIR, filename);
      const publicPath = path.join(PUBLIC_DIR, filename);

      const origStat = fs.statSync(sourcePath);
      totalOriginalSize += origStat.size;

      // Read to buffer first to allow safe overwrite of source
      const inputBuffer = fs.readFileSync(sourcePath);

      // Enhanced 1080p pipeline with Lanczos3, unsharp-mask sharpening, and 4:4:4 full chroma
      const processedBuffer = await sharp(inputBuffer)
        .resize({ width: 1920, height: 1080, kernel: 'lanczos3' })
        .sharpen({ sigma: 1.1, m1: 1.3, m2: 0.5 })
        .jpeg({ quality: 86, mozjpeg: true, chromaSubsampling: '4:4:4' })
        .toBuffer();

      totalEnhancedSize += processedBuffer.length;

      // Write to both directories
      fs.writeFileSync(sourcePath, processedBuffer);
      fs.writeFileSync(publicPath, processedBuffer);

      processedCount++;
    }));

    if (processedCount % 30 === 0 || processedCount === files.length) {
      const pct = ((processedCount / files.length) * 100).toFixed(0);
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      console.log(`Processed ${processedCount}/${files.length} frames (${pct}%) in ${elapsed}s...`);
    }
  }

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
  const origMB = (totalOriginalSize / (1024 * 1024)).toFixed(2);
  const newMB = (totalEnhancedSize / (1024 * 1024)).toFixed(2);

  console.log('\n===========================================');
  console.log(' Enhancement Complete! ');
  console.log(` Frames processed: ${processedCount}`);
  console.log(` Total Time: ${totalTime}s`);
  console.log(` Original Size: ${origMB} MB`);
  console.log(` Enhanced Size: ${newMB} MB (Full 4:4:4 Chroma, Lanczos3 & Unsharp Mask)`);
  console.log(` Updated: ${SOURCE_DIR}`);
  console.log(` Updated: ${PUBLIC_DIR}`);
  console.log('===========================================\n');
}

processFrames().catch(err => {
  console.error('Error processing frames:', err);
  process.exit(1);
});
