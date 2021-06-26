FROM node:9.0.0 AS builder

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . ./

RUN npm run buildReact

FROM nginx

EXPOSE 80

COPY --from=builder /app/build /usr/share/nginx/html

