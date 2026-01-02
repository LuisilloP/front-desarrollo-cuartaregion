FROM node:20-bookworm
WORKDIR /opt/app

COPY package*.json ./
RUN npm ci

COPY . .

ENV NODE_ENV=production

EXPOSE 4321
CMD ["node", "./scripts/run-frontend.mjs"]
