FROM node:15.12.0-alpine3.10

ENV TZ="Europe/Brussels"

WORKDIR /app

RUN npm install pm2 -g
RUN pm2 install pm2-logrotate
RUN pm2 set pm2-logrotate:max_size 1M

COPY . .
RUN npm install

EXPOSE 3000 3001
CMD pm2-runtime start ecosystem.config.js