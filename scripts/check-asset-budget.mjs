import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const JS_BUDGET_BYTES = 220 * 1024;
const IMAGE_BUDGET_BYTES = 1024 * 1024;

const walkFiles = (root) => {
  const stack = [root];
  const files = [];
  while (stack.length) {
    const current = stack.pop();
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const fullPath = join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
      } else {
        files.push(fullPath);
      }
    }
  }
  return files;
};

const distAstroFiles = walkFiles("dist/_astro").filter((file) => file.endsWith(".js"));
const publicImageFiles = walkFiles("public").filter((file) =>
  /\.(png|jpe?g|webp|svg|ico)$/i.test(file)
);

const oversizedJs = distAstroFiles
  .map((file) => ({ file, size: statSync(file).size }))
  .filter((item) => item.size > JS_BUDGET_BYTES);

const oversizedImages = publicImageFiles
  .map((file) => ({ file, size: statSync(file).size }))
  .filter((item) => item.size > IMAGE_BUDGET_BYTES);

if (oversizedJs.length || oversizedImages.length) {
  console.error("Asset budget exceeded:");
  oversizedJs.forEach(({ file, size }) => {
    console.error(` - JS: ${file} (${size} bytes > ${JS_BUDGET_BYTES})`);
  });
  oversizedImages.forEach(({ file, size }) => {
    console.error(` - IMG: ${file} (${size} bytes > ${IMAGE_BUDGET_BYTES})`);
  });
  process.exit(1);
}

console.log("Asset budgets OK");
