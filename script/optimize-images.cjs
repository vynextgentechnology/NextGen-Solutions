const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImages() {
  const assetsDir = path.resolve(__dirname, '../attached_assets');
  const files = [
    'valiullah_founder_chairman.png',
    'narendra_prasath_ceo.png',
    'yuvan_shankar_raja_co_founder.png',
    'santhosh_managing_director.png',
    'yeswanth_director.png',
    'sri_prajith_cto_cfo.png',
    'vy_nextgen_logo.png'
  ];

  for (const file of files) {
    const inputPath = path.join(assetsDir, file);
    if (!fs.existsSync(inputPath)) continue;
    const baseName = path.parse(file).name;
    const outputPath = path.join(assetsDir, `${baseName}.webp`);

    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Resize if too large (avatars need max width ~800 for 2x retina display)
    let pipeline = sharp(inputPath);
    if (metadata.width > 800 && file !== 'vy_nextgen_logo.png') {
      pipeline = pipeline.resize({ width: 800, withoutEnlargement: true });
    }

    await pipeline
      .webp({ quality: 82, effort: 6 })
      .toFile(outputPath);

    const origStat = fs.statSync(inputPath);
    const newStat = fs.statSync(outputPath);
    console.log(`${file}: ${(origStat.size / 1024).toFixed(1)} KB -> ${(newStat.size / 1024).toFixed(1)} KB (${(((origStat.size - newStat.size) / origStat.size) * 100).toFixed(1)}% reduction)`);
  }

  // Also optimize client/public/images/web_dev_consultation.png
  const webDevPng = path.resolve(__dirname, '../client/public/images/web_dev_consultation.png');
  if (fs.existsSync(webDevPng)) {
    const webDevWebp = path.resolve(__dirname, '../client/public/images/web_dev_consultation.webp');
    await sharp(webDevPng)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(webDevWebp);
    const origStat = fs.statSync(webDevPng);
    const newStat = fs.statSync(webDevWebp);
    console.log(`web_dev_consultation.png: ${(origStat.size / 1024).toFixed(1)} KB -> ${(newStat.size / 1024).toFixed(1)} KB`);
  }
}

optimizeImages().catch(console.error);
