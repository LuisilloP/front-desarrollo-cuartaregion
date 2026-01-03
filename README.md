# Desarrollo cuarta region (Astro)

Landing estatico en Astro + Tailwind con data opcional desde Strapi. Usa mocks si no hay backend disponible en build.

## Requisitos locales
- Node 24
- `npm ci` antes de desarrollar
- `.env` es opcional: sin variables el build usa los mocks

## Variables de entorno relevantes
- `USE_MOCK_DATA`: `true` por defecto (usa mock). Ponlo en `false` junto a `STRAPI_URL` para construir con datos reales.
- `STRAPI_URL`: base URL del backend para el build (ej. `https://tu-strapi.com`). En cliente usa `PUBLIC_STRAPI_URL`.
- `PUBLIC_STRAPI_URL` / `PUBLIC_STRAPI_GRAPHQL_URL`: solo si necesitas exponer la URL en cliente.
- `STRAPI_API_TOKEN` o `STRAPI_TOKEN`: token si el API no es publico.
- `PUBLIC_SITE_URL`: URL del sitio para sitemap/OG.

Nota: al ser un build estatico los datos se toman durante la fase de build; si cambian en Strapi hay que volver a desplegar.

## Despliegue en Dokploy con GitHub
1. Sube este directorio a tu repo en GitHub.
2. En Dokploy crea una aplicacion de tipo Docker/GitHub y selecciona el repo y rama a desplegar.
3. Contexto de build: raiz del proyecto. Dockerfile: `Dockerfile`.
4. Variables de entorno en Dokploy: define `STRAPI_URL`, `STRAPI_API_TOKEN` (si aplica) y `USE_MOCK_DATA` segun corresponda. Se usan en build para generar el estatico; si no estan, el sitio usa datos mock.
5. Puerto expuesto por la imagen: `80`. Configura Dokploy para publicar ese puerto.
6. Opcional: habilita auto deploy con webhooks de GitHub para que Dokploy reconstruya al hacer push.

## Despliegue en Vercel
- Recomendado: `USE_MOCK_DATA=true` para previews o cuando no tengas backend.
- Para usar Strapi: `USE_MOCK_DATA=false`, `STRAPI_URL=https://tu-strapi.com`, `STRAPI_API_TOKEN=<token>` (si aplica). Recuerda que las variables para cliente deben empezar con `PUBLIC_`.
- Node 24 ya esta fijado en `package.json`.
- Mas detalles en `docs/vercel.md`.

## Probar local
- `npm run dev` para desarrollo
- `npm run build` para validar el build estatico
- `docker build -t cuarta-region .` y `docker run -p 8080:80 cuarta-region` para probar la imagen que usa Dokploy
