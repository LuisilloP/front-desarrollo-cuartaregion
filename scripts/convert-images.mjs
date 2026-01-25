
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';

const imageDir = 'public';

async function convertImages() {
  const imagePaths = await glob(`${imageDir}/**/*.{png,jpg,jpeg}`);

  for (const imagePath of imagePaths) {
    const parsedPath = path.parse(imagePath);
    const newPath = path.join(parsedPath.dir, `${parsedPath.name}.webp`);

    try {
      await sharp(imagePath)
        .webp({ quality: 80 })
        .toFile(newPath);

      console.log(`Converted ${imagePath} to ${newPath}`);

      await fs.unlink(imagePath);
      console.log(`Deleted ${imagePath}`);
    } catch (err) {
      console.error(`Error processing ${imagePath}:`, err);
    }
  }
}

convertImages();
