

# Frontend build
FROM node:8-alpine as static

WORKDIR /home/${LINUX_USERNAME}/dev.sn-curtain.com
COPY . ./

ARG BACKEND_URI
ARG OMISE_CLIENT

RUN apk update && apk add git
RUN yarn install
RUN yarn build


# Nginx
FROM nginx:stable-alpine

COPY --from=static /home/${LINUX_USERNAME}/dev.sn-curtain.com/dist /usr/share/nginx/html/
COPY .nginx /etc/nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]