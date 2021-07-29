FROM node:14.17.3-alpine AS builder
WORKDIR /var/www
COPY package*.json ./
RUN npm install glob rimraf
RUN npm install
COPY . ./
RUN npm run build

FROM node:14.17.3-alpine
WORKDIR /var/www
COPY package*.json ./
RUN npm install
COPY --from=builder /var/www/dist ./dist
COPY . ./
CMD [ "node", "dist/main.js"]