FROM node:12.16.3-alpine as build

ARG version

WORKDIR /app
COPY ./src/ ./src/
COPY ./public/ ./public/
COPY babel.config.js ./
COPY package.json ./
COPY package-lock.json ./

RUN npm install
RUN npm run build

# production environment
FROM nginx:1.17.5-alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /data/www

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]