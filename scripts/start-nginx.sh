#!/bin/sh
set -eu

APP_ROOT="${APP_ROOT:-$(pwd)}"
PORT="${PORT:-80}"
NGINX_CONF="/tmp/nginx-nixpacks.conf"

cat > "${NGINX_CONF}" <<EOF
worker_processes auto;
pid /tmp/nginx.pid;

events {
  worker_connections 1024;
}

http {
  default_type application/octet-stream;

  types {
    text/html html;
    text/css css;
    application/javascript js mjs;
    application/json json;
    application/manifest+json webmanifest;
    application/xml xml;
    image/svg+xml svg;
    image/png png;
    image/jpeg jpg jpeg;
    image/webp webp;
    image/avif avif;
    image/gif gif;
    image/x-icon ico;
    font/woff2 woff2;
    font/woff woff;
    font/ttf ttf;
    font/otf otf;
  }

  sendfile on;
  tcp_nopush on;

  server {
    listen ${PORT};
    listen [::]:${PORT};
    server_name _;

    root ${APP_ROOT}/dist;
    index index.html;

    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;

    location ^~ /_astro/ {
      add_header Cache-Control "public, max-age=31536000, immutable" always;
      expires 1y;
      try_files \$uri =404;
    }

    location ~* \.(?:png|jpe?g|webp|gif|avif|svg|ico|woff2?|ttf|otf|eot)\$ {
      add_header Cache-Control "public, max-age=2592000, must-revalidate" always;
      expires 30d;
      try_files \$uri =404;
    }

    location = /site.webmanifest {
      add_header Cache-Control "public, max-age=86400, must-revalidate" always;
      try_files \$uri =404;
    }

    location ~* \.html\$ {
      add_header Cache-Control "public, max-age=0, must-revalidate" always;
      expires -1;
      try_files \$uri =404;
    }

    location / {
      try_files \$uri \$uri/ \$uri.html =404;
      add_header Cache-Control "public, max-age=0, must-revalidate" always;
    }
  }
}
EOF

exec nginx -c "${NGINX_CONF}" -g "daemon off;"
