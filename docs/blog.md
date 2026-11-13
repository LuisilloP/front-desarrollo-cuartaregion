# Cómo publicar en el blog

Cada artículo es un archivo `.mdx` en `src/content/blog/`. El nombre del archivo es la URL:
`src/content/blog/mi-articulo.mdx` → `aliadodigital.cl/blog/mi-articulo`.

## 1. Crea el archivo

Copia uno existente y cambia el encabezado:

```mdx
---
title: "Título con la palabra clave al inicio (máx. 110 caracteres)"
description: "Resumen de 1-2 frases para Google y el listado (máx. ~160 caracteres)."
pubDate: 2026-12-01
category: paginas-web        # datos-personales | paginas-web | marketing-digital | herramientas
tags: ["página web", "pymes"]
author: "Nombre Apellido"    # opcional; debe coincidir con src/data/equipo.ts. Si se omite, firma el equipo.
cover: "/images/blog/mi-articulo.webp"   # opcional, 1600x800, menos de 200 KB
coverAlt: "Descripción de la imagen"
destacado: false             # true = va primero y grande en /blog
draft: false                 # true = no se publica
faq:                         # opcional; genera el bloque y el schema FAQPage
  - question: "¿Pregunta?"
    answer: "Respuesta corta y directa."
---

Primer párrafo: responde la pregunta del título en 2-3 líneas.

## Subtítulo (H2)

Texto...
```

## 2. Componentes disponibles (sin importar nada)

```mdx
<ArticleCTA
  title="¿Quieres que lo hagamos por ti?"
  text="Te respondemos en 1 día hábil."
  mensaje="Hola, leí el artículo de ... y quiero ..."
/>

<VideoEmbed id="ID_DE_YOUTUBE" title="Título del video" uploadDate="2026-12-01" />
```

- `ArticleCTA` abre WhatsApp con el mensaje indicado. Con `href="/planes"` lleva a otra página.
- `VideoEmbed` carga el video solo al hacer clic y agrega el schema `VideoObject`.
- El índice ("En este artículo") se arma solo con los `##` y `###`.

## 3. Reglas de contenido

- Español de Chile, con tildes. Nada de cifras, testimonios ni casos inventados.
- Precios: nunca en el artículo. Enlaza a `/planes`.
- Temas legales: citar el artículo de la ley y enlazar la fuente oficial (bcn.cl).
- Un enlace interno a otro artículo o página del sitio en cada artículo.

## 4. Publicar

`npm run build` debe pasar. Al hacer push a la rama de producción, el artículo aparece en
`/blog`, en su categoría, en el RSS (`/blog/rss.xml`) y en el sitemap.
