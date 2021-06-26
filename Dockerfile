FROM node:14.1-alpine AS builder

WORKDIR /opt/web

COPY package.json ./

RUN npm install

COPY . ./

RUN npm run buildReact

FROM nginx

EXPOSE 80

COPY --from=builder /opt/web/build /usr/share/nginx/html

