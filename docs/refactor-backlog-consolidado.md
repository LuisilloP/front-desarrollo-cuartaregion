# Backlog Consolidado de Auditoria (P0-P3)

Fuente de prioridad: `Informe_Formalizado_Auditoria_Aliado_Digital.docx` (autoridad principal), con complemento de los otros informes.

## P0 - Bloqueadores / Seguridad / Estabilidad

1) Docker y deploy reproducible
- Estado: Implementado
- Archivos:
  - `Dockerfile`
  - `.dockerignore`
  - `nginx.conf`

2) Typecheck real y gate en CI
- Estado: Implementado
- Archivos:
  - `package.json` (`typecheck`)
  - `.github/workflows/ci.yml`
  - `src/lib/api/types.ts`
  - `src/lib/api/media.ts`
  - `src/lib/api/services.ts`

3) Contratos de datos consistentes (social links y mapeos)
- Estado: Implementado
- Archivos:
  - `src/lib/api/types.ts`
  - `src/lib/api/services.ts`
  - `src/lib/api/domains/contracts.ts`
  - `src/lib/api/domains/*.ts`

4) Mitigacion XSS en HTML de CMS
- Estado: Implementado
- Archivos:
  - `src/lib/security/sanitizeHtml.ts`
  - `src/pages/privacidad.astro`
  - `package.json` (`sanitize-html`)

5) Hardening de secretos/env (no token en bundle cliente)
- Estado: Implementado
- Archivos:
  - `src/lib/env.ts`
  - `src/env.d.ts`
  - `src/lib/api/strapi.ts`

6) Vulnerabilidades de dependencias (sin HIGH/CRITICAL)
- Estado: Implementado (HIGH/CRITICAL eliminados)
- Archivos:
  - `package.json` (`overrides`)
  - `package-lock.json`

## P1 - Calidad base / Mantenibilidad

7) Lint + format
- Estado: Implementado
- Archivos:
  - `eslint.config.mjs`
  - `.prettierrc`
  - `.prettierignore`
  - `package.json` scripts

8) Tests minimos para capa fragil
- Estado: Implementado
- Archivos:
  - `vitest.config.ts`
  - `src/lib/api/services.test.ts`
  - `src/lib/api/media.test.ts`
  - `src/lib/security/sanitizeHtml.test.ts`

9) CI de PR con gates
- Estado: Implementado
- Archivos:
  - `.github/workflows/ci.yml`

10) Refactor incremental de data layer (`services.ts` monolitico)
- Estado: Implementado
- Archivos:
  - `src/lib/api/services.ts` (facade)
  - `src/lib/api/domains/queries.ts`
  - `src/lib/api/domains/contracts.ts`
  - `src/lib/api/domains/serviceDomain.ts`
  - `src/lib/api/domains/caseDomain.ts`
  - `src/lib/api/domains/postDomain.ts`
  - `src/lib/api/domains/globalDomain.ts`

## P2 - Performance / Consistencia (sin cambios visuales)

11) Hidratacion mas tardia en bloques no criticos
- Estado: Implementado (hero islands a `client:idle`)
- Archivos:
  - `src/components/sections/Hero.astro`
  - `src/components/marketing/MarketingHero.astro`
  - `src/components/common/sections/SectionHero.astro`
  - `src/pages/desarrollo.astro`

12) Centralizacion de scripts inline repetidos
- Estado: Implementado parcialmente (migrados los repetidos mas criticos)
- Archivos:
  - `src/scripts/ui/cardShine.ts`
  - `src/scripts/ui/heroTypewriter.ts`
  - `src/components/ui/ServiceCard.astro`
  - `src/components/ui/PlanCard.astro`
  - `src/components/sections/Hero.astro`

13) Budget de assets y optimizacion de favicon
- Estado: Implementado
- Archivos:
  - `scripts/check-asset-budget.mjs`
  - `package.json` (`budget`)
  - `public/favicon.svg`
  - `.github/workflows/ci.yml`

14) SEO/duplicacion de metas + sitemap consistente
- Estado: Implementado
- Archivos:
  - `src/components/SEO.astro`
  - `src/pages/sitemap.xml.ts`

## P3 - Escalabilidad / Hardening final

15) Centralizacion de constantes repetidas
- Estado: Implementado parcialmente
- Archivos:
  - `src/styles/accents.ts`
  - `src/config/site.ts`
  - `src/components/ui/ServiceCard.astro`
  - `src/components/SEO.astro`
  - `src/pages/sitemap.xml.ts`

16) Hardening adicional (noopener, logs sensibles, limpieza)
- Estado: Implementado
- Archivos:
  - `src/components/layout/Footer.astro`
  - `src/components/layout/WhatsAppFloatingButton.astro`
  - `src/components/sections/ContactSection.astro`
  - `src/components/sections/HostingSection.astro`
  - `src/components/promos/PromoCard.astro`
  - `src/pages/casos/[slug].astro`
  - `src/pages/servicios/[slug].astro`
  - `src/lib/api/strapi.ts`

## Evidencia UI Igual

- Capturas before/after:
  - `docs/ui-evidence/before/*.png`
  - `docs/ui-evidence/after/*.png`
- Comparacion:
  - `docs/ui-evidence/report.md`
  - `docs/ui-evidence/report.json`
- Script de captura:
  - `scripts/capture-ui-evidence.ps1`
- Script de comparacion:
  - `scripts/compare-ui-evidence.mjs`
