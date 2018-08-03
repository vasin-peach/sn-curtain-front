

# Frontend build
FROM node:8-alpine as static

WORKDIR /home/app/sn-curtain.com
COPY . ./

ARG BACKEND_URI

RUN apk update && apk add git
RUN yarn install
RUN yarn build


# Nginx
FROM nginx:stable-alpine

COPY --from=static /home/app/sn-curtain.com/dist /usr/share/nginx/html/
COPY .nginx /etc/nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]