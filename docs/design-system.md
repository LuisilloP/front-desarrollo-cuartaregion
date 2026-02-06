# Design System: Promos y Banners

## 1) Conceptos

### AccentKey
`accentKey` controla la paleta visual desde tokens tipados:
- `"auto" | "sky" | "orange" | "slate" | "rose"`

Con `auto`, cada `variant` usa su acento por defecto.

### Tokens
Los estilos viven en tokens (`as const`) para:
- evitar clases dinamicas (`text-${x}`),
- mantener consistencia entre componentes,
- extender colores de forma segura.

### Sin clases dinamicas
No usamos composicion de clases con template strings dinamicos. Todas las clases Tailwind estan declaradas como strings literales en:
- `src/components/promos/config/promo.tokens.ts`
- `src/components/banners/config/banner.tokens.ts`

## 2) Promos

Base: `src/components/promos/PromoCard.astro`
Wrappers:
- `PromoWeb.astro`
- `PromoMarketing.astro`
- `PromoMixed.astro`
- `PromoCombo.astro` (alias legacy de `PromoMixed`)

### Props (PromoCard)
- Requerida: `title`
- Opcionales: `description`, `badgeText`, `badgeIcon`, `watermarkIcon`, `hintText`, `href`, `ariaLabel`, `variant`, `accentKey`, `tone`, `intensity`, `size`, `bgImage`, `class`

Comportamientos opcionales:
- sin `href`: renderiza `<div role="group">` (no link)
- sin `badgeText`: no se renderiza badge
- sin `badgeIcon`: badge sin icono
- sin `watermarkIcon`: no watermark
- sin `hintText` o sin `href`: no footer hint/rail

### Ejemplo promo con link
```astro
<PromoCard
  title="Web de alto rendimiento"
  description="SEO tecnico y base escalable"
  badgeText="DESARROLLO WEB"
  badgeIcon="lucide:monitor"
  watermarkIcon="lucide:layout-template"
  hintText="Ver planes"
  href="#planes-web"
  variant="web"
  accentKey="auto"
  tone="vivid"
  intensity="md"
/>
```

### Ejemplo promo informativa (sin link)
```astro
<PromoCard
  title="Roadmap digital"
  description="Documento inicial para planificar lanzamiento"
  badgeText="CONSULTORIA"
  variant="mixed"
  accentKey="slate"
/>
```

## 3) Banners

Base: `src/components/banners/BannerBase.astro`
Wrappers:
- `BannerWeb.astro`
- `BannerMarketing.astro`
- `BannerMixed.astro`
- `BannerCombo.astro` (alias legacy de `BannerMixed`)

### Props (BannerBase)
- Requerida: `title`
- Opcionales: `variant`, `badgeText`, `badgeIcon`, `subtitle`, `description`, `bullets`, `primaryLink`, `secondaryLink`, `watermarkIcon`, `rightIcon`, `media`, `bgImage`, `accentKey`, `tone`, `intensity`, `layout`, `reverse`, `size`, `class`

`media`:
```ts
media?: {
  bgImage?: string; // solo rutas locales validas
  icon?: string;    // iconify name, opcional
  grid?: boolean;   // reservado para custom media
} | null
```

Comportamientos opcionales:
- sin `primaryLink` y `secondaryLink`: no renderiza CTAs
- sin `badgeText`: no renderiza badge
- sin `badgeIcon`: badge sin icono
- sin `watermarkIcon` y sin `rightIcon`: no icono decorativo derecho
- `bullets` se limita a maximo 3 items

### Estado sin media (sin foto / sin slot)
- si no hay `bgImage` valida ni slot `media`, el panel derecho desaparece completamente
- el layout colapsa a 1 columna (sin huecos)
- el texto gana ancho (`max-w` mayor)
- se mantiene composicion premium con decorador absoluto derecho (`rightSheen` + `rightGlow`)
- si existe `rightIcon` (o fallback `watermarkIcon`), se renderiza icono flotante sin recuadro en la esquina superior derecha

### Ejemplo banner con CTAs y media
```astro
<BannerBase
  title="Campanas de intencion"
  variant="marketing"
  badgeText="META ADS"
  badgeIcon="simple-icons:meta"
  subtitle="Optimizacion continua"
  description="Segmentacion + tracking + iteracion"
  bullets={["Audiencias", "Creatividades", "Reporte mensual"]}
  primaryLink={{ label: "Cotizar", href: "#contacto-marketing" }}
  secondaryLink={{ label: "Ver planes", href: "/marketing#planes" }}
  rightIcon="lucide:target"
  media={{ bgImage: "/images/marketing/banner.webp" }}
  accentKey="orange"
  tone="vivid"
/>
```

### Ejemplo banner sin media (sin panel derecho)
```astro
<BannerBase
  title="Estrategia de lanzamiento"
  variant="mixed"
  description="Plan de implementacion en fases"
  rightIcon="lucide:layers"
  media={null}
/>
```

## 4) Agregar un nuevo AccentKey

1. Extender el type:
- `PromoAccentKey` en `src/components/promos/config/promo.types.ts`
- `BannerAccentKey` en `src/components/banners/config/banner.types.ts`

2. Agregar tokens con clases literales:
- `PROMO_ACCENT_TOKENS` en `src/components/promos/config/promo.tokens.ts`
- `BANNER_ACCENT_TOKENS` en `src/components/banners/config/banner.accents.ts`

3. (Opcional) Ajustar overrides de `tone="vivid"`:
- `VIVID_ACCENT_OVERRIDES` en promos
- `VIVID_VARIANT_OVERRIDES` en banners

## 5) Iconos (Iconify)

Se usan iconos inline con `astro-icon` (sin fetch remoto).
Colecciones disponibles:
- `lucide:*`
- `simple-icons:*`
- `mdi:*`

Defaults por wrappers:
- Promo Web: `lucide:monitor` / `lucide:layout-template`
- Promo Marketing: `simple-icons:meta` / `lucide:target`
- Promo Mixed: `lucide:sparkles` / `lucide:layers`
- Banner Web: `lucide:monitor` / `lucide:layout-template`
- Banner Marketing: `simple-icons:meta` / `lucide:target`
- Banner Mixed: `lucide:sparkles` / `lucide:layers`

## 6) Convenciones

- `title` es obligatoria en bases (`PromoCard` y `BannerBase`).
- Props opcionales: si no vienen, no se renderiza el bloque asociado.
- `bgImage` solo acepta rutas locales seguras (`/ruta-local`).
- No anidar `<a>` dentro de `<a>`.
- Decorativos siempre con `pointer-events-none`.

## 7) Snippets rapidos (wrappers)

```astro
<PromoWeb />
<PromoMarketing tone="default" intensity="low" />
<PromoMixed href="#planes-combo" />

<BannerWeb />
<BannerMarketing accentKey="orange" />
<BannerMixed primaryLink={undefined} secondaryLink={undefined} media={null} />
```