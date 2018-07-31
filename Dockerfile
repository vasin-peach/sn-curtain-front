# Frontend build
FROM node:8-alpine as frontend

WORKDIR /home/app/sn-curtain.com
COPY . ./


ARG BACKEND_URI

RUN apk update && apk add git
RUN yarn install
RUN yarn build

# Deploy static
FROM node:8-alpine

WORKDIR /home/app/sn-curtain.com
RUN mkdir dist
COPY --from=frontend  /home/app/sn-curtain.com/dist ./dist

RUN apk update
RUN apk add --no-cache py-pip rsync git openssh
RUN pip install --no-cache-dir docker-compose
RUN git submodule update --init --recursive
RUN mkdir ${HOME}/.ssh
RUN echo ${SSH_HOST_KEY} > ${HOME}/.ssh/known_hosts
RUN echo ${SSH_PRIVATE_KEY} > ${HOME}/.ssh/id_rsa
RUN chmod 700 ${HOME}/.ssh/id_rsa
RUN echo ${SSH_HOST_KEY} > ${HOME}/.ssh/known_hosts
RUN echo ${SSH_PRIVATE_KEY} > ${HOME}/.ssh/id_rsa
RUN chmod 700 ${HOME}/.ssh/id_rsa

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