FROM node:14.17.3-alpine AS builder
WORKDIR /www/var
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build && npm prune --production

FROM node:14.17.3-alpine
WORKDIR /www/var
COPY --from=builder /www/var/dist ./dist
COPY --from=builder /www/var/node_modules ./node_modules
CMD [ "node", "dist/listener.js"]