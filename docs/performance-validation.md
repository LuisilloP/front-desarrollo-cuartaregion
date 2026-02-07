# Performance Validation Checklist

Use this checklist for performance-related PRs without visual regressions.

## 1) Build and quality gates

```bash
npm ci
npm run build
npm run typecheck
npm run lint
npm run test
```

## 2) Cache headers validation (Nginx)

Run against staging/production URL:

```bash
curl -I https://<host>/_astro/<asset>.js
curl -I https://<host>/index.html
curl -I https://<host>/site.webmanifest
curl -I https://<host>/favicon.svg
```

Expected:

- `/_astro/*` -> `Cache-Control: public, max-age=31536000, immutable`
- `*.html` -> `Cache-Control: public, max-age=0, must-revalidate`
- non-fingerprinted public assets -> moderate TTL (`max-age=2592000` or similar)
- `site.webmanifest` -> short TTL (`max-age=86400`)

## 3) Bundle analysis

```bash
npm run analyze
```

Output report:

- `dist/bundle-report.html`

## 4) Lighthouse

Run Lighthouse for:

- `/`
- `/desarrollo`
- `/marketing`
- `/casos/<slug>`
- `/blog`
- `/privacidad`

Focus metrics:

- Efficient cache lifetimes
- Remove unused JavaScript
- Remove unused CSS

## 5) Visual regression (UI equal)

- Capture before/after screenshots:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/capture-ui-evidence.ps1 -Root "<repo>" -BaselineRoot "<repo-baseline>"
node scripts/compare-ui-evidence.mjs
```

- Verify:
  - `docs/ui-evidence/report.md`
  - `docs/ui-evidence/diff/*.png`
