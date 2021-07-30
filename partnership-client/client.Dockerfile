FROM node:14.17.3-alpine AS builder
WORKDIR /www/var
COPY package*.json ./
RUN npm install -g react-scripts 
RUN npm install
COPY . ./
RUN npm run build

FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /www/var/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]  
