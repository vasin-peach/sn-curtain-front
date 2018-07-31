

# Frontend build
FROM node:8-alpine as static

WORKDIR /home/${LINUX_USERNAME}/sn-curtain.com
COPY . ./

ARG BACKEND_URI

RUN apk update && apk add git
RUN yarn install
RUN yarn build


# Nginx
FROM nginx:stable-alpine

COPY --from=static /home/${LINUX_USERNAME}/sn-curtain.com/dist /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# VOLUME /home/${LINUX_USERNAME}/html/dev.sn-curtain.com/dist/ /var/www/dev.sn-curtain.com/html
# # Runner build
# FROM node:8-alpine

# WORKDIR /home/app/sn-curtain.com

# COPY . ./

# RUN rm -rf frontend

# RUN mkdir frontend

# COPY --from=frontend /home/app/sn-curtain.com/frontend/ ./frontend

# RUN yarn install

# EXPOSE 5000

# CMD [ "yarn", "start" ]