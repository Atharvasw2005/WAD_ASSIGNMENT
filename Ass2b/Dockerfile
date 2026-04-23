FROM node:20-alpine

WORKDIR /app

COPY package.json ./
COPY server.js ./
COPY site ./site

ENV SITE_DIR=/app/site
EXPOSE 8000

CMD ["node", "server.js"]
