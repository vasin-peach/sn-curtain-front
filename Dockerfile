# Frontend build
FROM node:8-alpine as frontend

WORKDIR /home/app/sn-curtain.com
COPY . ./

RUN apk update && apk add git
RUN yarn install
RUN yarn build

ARG BACKEND_URI=${BACKEND_URI}

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