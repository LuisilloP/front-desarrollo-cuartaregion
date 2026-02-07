import fs from "node:fs";
import path from "node:path";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const root = process.cwd();
const evidenceDir = path.join(root, "docs", "ui-evidence");
const beforeDir = path.join(evidenceDir, "before");
const afterDir = path.join(evidenceDir, "after");
const diffDir = path.join(evidenceDir, "diff");
const reportJson = path.join(evidenceDir, "report.json");
const reportMd = path.join(evidenceDir, "report.md");

if (!fs.existsSync(beforeDir) || !fs.existsSync(afterDir)) {
  console.error("Missing screenshot directories. Run capture script first.");
  process.exit(1);
}

fs.mkdirSync(diffDir, { recursive: true });

const beforeFiles = fs
  .readdirSync(beforeDir)
  .filter((file) => file.endsWith(".png"))
  .sort();

if (beforeFiles.length === 0) {
  console.error("No screenshots found in docs/ui-evidence/before");
  process.exit(1);
}

const results = [];
let failed = false;

for (const file of beforeFiles) {
  const beforePath = path.join(beforeDir, file);
  const afterPath = path.join(afterDir, file);

  if (!fs.existsSync(afterPath)) {
    failed = true;
    results.push({
      file,
      status: "missing-after",
      width: 0,
      height: 0,
      diffPixels: -1,
      diffPercent: -1
    });
    continue;
  }

  const before = PNG.sync.read(fs.readFileSync(beforePath));
  const after = PNG.sync.read(fs.readFileSync(afterPath));

  if (before.width !== after.width || before.height !== after.height) {
    failed = true;
    results.push({
      file,
      status: "size-mismatch",
      width: before.width,
      height: before.height,
      diffPixels: -1,
      diffPercent: -1
    });
    continue;
  }

  const diff = new PNG({ width: before.width, height: before.height });
  const diffPixels = pixelmatch(before.data, after.data, diff.data, before.width, before.height, {
    threshold: 0.1,
    includeAA: true
  });
  const totalPixels = before.width * before.height;
  const diffPercent = Number(((diffPixels / totalPixels) * 100).toFixed(4));

  const diffPath = path.join(diffDir, file);
  fs.writeFileSync(diffPath, PNG.sync.write(diff));

  results.push({
    file,
    status: "ok",
    width: before.width,
    height: before.height,
    diffPixels,
    diffPercent
  });
}

const maxDiff = results
  .filter((r) => r.status === "ok")
  .reduce((acc, curr) => (curr.diffPercent > acc ? curr.diffPercent : acc), 0);

const summary = {
  comparedAt: new Date().toISOString(),
  total: results.length,
  maxDiffPercent: maxDiff,
  hasFailures: failed,
  results
};

fs.writeFileSync(reportJson, `${JSON.stringify(summary, null, 2)}\n`);

const lines = [];
lines.push("# UI Evidence Report");
lines.push("");
lines.push(`Compared at: ${summary.comparedAt}`);
lines.push("");
lines.push("| File | Status | Diff % | Diff Pixels |");
lines.push("| --- | --- | ---: | ---: |");
for (const row of results) {
  lines.push(`| ${row.file} | ${row.status} | ${row.diffPercent} | ${row.diffPixels} |`);
}
lines.push("");
lines.push(`Max diff percent: ${maxDiff}`);

fs.writeFileSync(reportMd, `${lines.join("\n")}\n`);

console.log(`Compared ${results.length} screenshot pairs.`);
console.log(`Max diff percent: ${maxDiff}`);
console.log(`Report: ${path.relative(root, reportMd)}`);

if (failed) {
  process.exit(1);
}
