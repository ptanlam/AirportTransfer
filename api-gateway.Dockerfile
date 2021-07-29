FROM node:14.17.3-alpine AS builder
WORKDIR /www/var
COPY api-gateway/package*.json ./
RUN npm install glob rimraf
RUN npm install
COPY api-gateway ./
RUN npm run build

FROM node:14.17.3-alpine
WORKDIR /www/var
COPY api-gateway/package*.json ./
RUN npm install
COPY --from=builder /www/var/dist ./dist
COPY api-gateway ./
CMD [ "node", "dist/main.js"]