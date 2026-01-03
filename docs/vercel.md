# Deploy en Vercel

- Build seguro sin `.env`: `USE_MOCK_DATA=true` es el default y tambien se activa si falta `STRAPI_URL`.
- Para usar Strapi en build: `USE_MOCK_DATA=false`, `STRAPI_URL=https://tu-strapi.com`, `STRAPI_API_TOKEN=<token>` si aplica. Usa `PUBLIC_STRAPI_URL` solo si necesitas la URL en cliente; los tokens nunca deben ser `PUBLIC_`.
- Pruebas rapidas locales:
  - `USE_MOCK_DATA=true npm run build`
  - `USE_MOCK_DATA=false STRAPI_URL=https://tu-strapi.com STRAPI_API_TOKEN=<token> npm run build`
- Node 20 esta fijado en `package.json` (`"node": "20.x"`). En Vercel se respeta o puedes fijar `NODE_VERSION=20`.
- Recordatorio: las variables expuestas al navegador deben llevar prefijo `PUBLIC_`.
