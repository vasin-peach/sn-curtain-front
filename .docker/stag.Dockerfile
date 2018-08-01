

# Frontend build
FROM node:8-alpine as static

WORKDIR /home/${LINUX_USERNAME}/dev.sn-curtain.com
COPY . ./

ARG BACKEND_URI=${BACKEND_URI_DEV}
ARG GITLAB_USERNAME=${GITLAB_USERNAME}

RUN apk update && apk add git
RUN yarn install
RUN yarn build


# Nginx
FROM nginx:stable-alpine

COPY --from=static /home/${LINUX_USERNAME}/dev.sn-curtain.com/dist /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]