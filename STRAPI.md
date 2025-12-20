# Strapi v5 + Astro: flujo y estructura

Este documento explica como funciona la integracion Strapi v5 (GraphQL) en este frontend Astro, que carpetas participan y como usar Strapi en este caso.

## 1) Flujo de datos (de ENV a la UI)

1. **Variables de entorno** se cargan desde `.env` / `.env.example`.
2. **`src/lib/env.ts`** expone `env` con `strapiGraphqlUrl`, `strapiToken`, `useMock`, etc.
3. **`src/lib/api/strapi.ts`** usa `env` para ejecutar GraphQL (`fetchGraphQL`).
4. **`src/lib/api/services.ts`** define queries y mapea la respuesta a tipos del frontend.
5. **Paginas Astro** llaman funciones como `fetchCases`, `getServicesList`, `fetchSiteSettings`.
6. **Componentes** reciben props tipados y renderizan.

En modo dev, si hay errores de Strapi, el wrapper puede caer a mocks (`withFallback`) para no romper la UI.

## 2) Variables de entorno

Revisa `.env.example` y `.env`. Variables usadas:

- `PUBLIC_STRAPI_URL`: base URL del backend (ej: `http://localhost:1337`).
- `PUBLIC_STRAPI_GRAPHQL_URL`: endpoint GraphQL (ej: `http://localhost:1337/graphql`).
- `STRAPI_TOKEN`: token Bearer si el API no es publico.
- `PUBLIC_SITE_URL`: URL del front para OG/sitemap.
- `PUBLIC_ENV`: `development` o `production`.
- `STRAPI_USE_MOCK`: `true` fuerza mocks en dev.

Resolucion en `src/lib/env.ts`:
- `strapiGraphqlUrl` usa `PUBLIC_STRAPI_GRAPHQL_URL`, o cae a `${PUBLIC_STRAPI_URL}/graphql`.
- `strapiToken` usa `STRAPI_TOKEN` o `STRAPI_API_TOKEN`.

## 3) Carpeta y archivos clave

**`src/lib/api/`**
- `strapi.ts`: wrapper GraphQL y helpers (`fetchGraphQL`, `withFallback`).
- `services.ts`: capa de servicios para content types (services, cases, posts, etc).
- `media.ts`: normaliza URLs de media a URL absoluta.
- `types.ts`: tipos TS usados en frontend.

**`src/data/`**
- `mock.ts`: data mock usada cuando Strapi falla o `STRAPI_USE_MOCK=true`.

**`src/pages/`**
- Paginas Astro que llaman la capa `services` y pasan props a componentes.

**`src/components/`**
- UI que consume props tipados y renderiza.

## 4) GraphQL en Strapi v5 (reglas)

Reglas aplicadas en este proyecto:
- No usar `data { attributes { ... } }` (eso era v4).
- Usar `documentId` como id principal.
- Listados usan `services_connection` con `nodes` y `pageInfo`.
- `status: PUBLISHED` para el front publico.
- Filtros con `filters`, sort con `sort: ["campo:asc"]`.

Ejemplo de listado:
```
query ServicesList($page: Int!, $pageSize: Int!, $filters: ServiceFiltersInput, $sort: [String], $status: PublicationStatus) {
  services_connection(
    pagination: { page: $page, pageSize: $pageSize }
    filters: $filters
    sort: $sort
    status: $status
  ) {
    nodes { documentId title slug featured order }
    pageInfo { page pageSize pageCount total }
  }
}
```

## 5) Servicios disponibles en el frontend

En `src/lib/api/services.ts`:
- `fetchSiteSettings()`
- `getServicesList({ page, pageSize, featured, type, tag })`
- `getServiceBySlug(slug)`
- `fetchCases()`
- `fetchCaseBySlug(slug)`
- `fetchTestimonials()`
- `fetchFaqs(serviceSlug?)`
- `fetchPostsPage({ page, pageSize, category, tag })`
- `fetchPostBySlug(slug)`

Notas:
- **Cases** y **Testimonials** filtran `publicAllowed=true`.
- **Services** usa `featured` en Home; si no hay featured, el listado puede quedar vacio.
- `blocksToText` convierte JSON rich text a string (problem/solution, etc).

## 6) Uso en paginas Astro (ejemplo)

En `src/pages/index.astro`:
```
const [siteSettings, featuredServices, cases, testimonials, faqs] = await Promise.all([
  fetchSiteSettings(),
  fetchFeaturedServices(),
  fetchCases(),
  fetchTestimonials(),
  fetchFaqs()
]);
```

En `src/pages/casos/[slug].astro`:
```
const cases = await fetchCases();
return cases.map((item) => ({ params: { slug: item.slug }, props: { caseStudy: item } }));
```

## 7) Como usar Strapi en este caso

1. Crea entries en Strapi para:
   - `siteSettings` (single)
   - `services`, `cases`, `testimonials`, `faqs`, `posts`
2. Publica cada entry (si no publicas, no aparece con `status: PUBLISHED`).
3. Para **cases** y **testimonials** marca `publicAllowed = true`.
4. Para **services** marca `featured = true` si quieres que aparezca en Home.
5. Si cargas media, el frontend usa `getMediaUrl` para convertir `/uploads/...` a URL absoluta.

## 8) Debug rapido

- Verifica `PUBLIC_STRAPI_GRAPHQL_URL` y `STRAPI_TOKEN`.
- Usa Thunder/GraphQL Playground con el mismo token.
- Si ves `fallback to mock data` en dev, revisa errores de query.
- En output `static`, necesitas rebuild para ver cambios de Strapi (`npm run build`).

## 9) Extender o agregar un content type

1. Agrega tipos en `src/lib/api/types.ts`.
2. Crea query y mapper en `src/lib/api/services.ts`.
3. Usa `fetchGraphQL` para ejecutar y mapear.
4. Consume la funcion en paginas/componentes.

