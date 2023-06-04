FROM node:alpine AS builder
WORKDIR /client
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
COPY --from=builder /client/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf