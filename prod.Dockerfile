# Frontend build
FROM node:8-alpine as frontend

WORKDIR /home/app/sn-curtain.com
COPY . ./

RUN apk update && apk add git
RUN yarn install
RUN yarn build

ARG BACKEND_URI=${BACKEND_URI_PROD}