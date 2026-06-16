const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Define directories to optimize
const IMAGES_DIR = path.join(__dirname, 'public', 'images');

// Install sharp if not present
try {
  require('sharp');
} catch (e) {
  console.log('sharp not found, installing...');
  execSync('npm install -D sharp', { stdio: 'inherit' });
}

const sharp = require('sharp');

// Recursive function to get all files in a directory
function getFiles(dir, files = []) {
  const fileList = fs.readdirSync(dir);
  for (const file of fileList) {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files);
    } else {
      if (/\.(jpe?g|png)$/i.test(file)) {
        files.push(name);
      }
    }
  }
  return files;
}

async function optimize() {
  console.log('Scanning images directory...');
  const files = getFiles(IMAGES_DIR);
  console.log(`Found ${files.length} images to optimize.`);

  for (const file of files) {
    const ext = path.extname(file);
    const webpPath = file.substring(0, file.length - ext.length) + '.webp';

    try {
      console.log(`Converting: ${path.relative(__dirname, file)} -> ${path.relative(__dirname, webpPath)}`);
      await sharp(file)
        .webp({ quality: 80 })
        .toFile(webpPath);
      
      const oldSize = fs.statSync(file).size;
      const newSize = fs.statSync(webpPath).size;
      const savings = ((oldSize - newSize) / oldSize * 100).toFixed(1);
      console.log(`Optimized: Saved ${savings}% (${(oldSize / 1024).toFixed(1)} KB -> ${(newSize / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`Error optimizing ${file}:`, err);
    }
  }

  console.log('Image optimization completed!');
}

optimize();
