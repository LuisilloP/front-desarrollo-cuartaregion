# Desarrollo cuarta region (Astro)

Landing estatico en Astro + Tailwind con data opcional desde Strapi. Usa mocks si no hay backend disponible en build.

## Requisitos locales
- Node 20
- `npm ci` antes de desarrollar
- Variables en `.env` (copiar desde `.env.example`) si quieres usar Strapi

## Variables de entorno relevantes
- `STRAPI_URL`: base URL de tu Strapi (ej. `https://tu-strapi.com`)
- `STRAPI_API_TOKEN`: token de API si Strapi no es publico
- `STRAPI_CASES_ENDPOINT`: endpoint de casos si cambiaste el nombre de la collection (ej. `/api/casos`)
- `USE_MOCK_DATA`: por defecto es `true` (usa los datos mock). Ponlo en `false` junto a `STRAPI_URL` para construir con datos reales.
Nota: al ser un build estatico los datos se toman durante la fase de build; si cambian en Strapi hay que volver a desplegar.

## Despliegue en Dokploy con GitHub
1. Sube este directorio a tu repo en GitHub.
2. En Dokploy crea una aplicacion de tipo Docker/GitHub y selecciona el repo y rama a desplegar.
3. Contexto de build: raiz del proyecto. Dockerfile: `Dockerfile`.
4. Variables de entorno en Dokploy: define `STRAPI_URL`, `STRAPI_API_TOKEN` y `STRAPI_CASES_ENDPOINT` si corresponde. Se usan en build para generar el estatico; si no estan, el sitio usa datos mock.
5. Puerto expuesto por la imagen: `80`. Configura Dokploy para publicar ese puerto.
6. Opcional: habilita auto deploy con webhooks de GitHub para que Dokploy reconstruya al hacer push.

## Probar local
- `npm run dev` para desarrollo
- `npm run build` para validar el build estatico
- `docker build -t cuarta-region .` y `docker run -p 8080:80 cuarta-region` para probar la imagen que usa Dokploy
