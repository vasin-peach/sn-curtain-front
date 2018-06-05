# Frontend build
FROM node:8-alpine as frontend

RUN mkdir -p /home && mkdir -p /home/app && mkdir -p /home/app/sn-curtain.com && mkdir -p /home/app/sn-curtain.com/frontend

COPY . /home/app/sn-curtain.com/frontend

WORKDIR /home/app/sn-curtain.com/frontend

RUN yarn install
RUN yarn build


# Backend build
FROM node:8-alpine

RUN mkdir -p /home/app/sn-curtain.com/backend

# # Create folder
# RUN mkdir -p /home/ && mkdir -p /home/app && mkdir -p /home/app/sn-curtain.com

# # Copy current to build folder
# COPY . /home/app/sn-curtain.com

# # Change workdir to build folder
# WORKDIR /home/app/sn-curtain.com

# # Run build
# RUN yarn install
# RUN yarn build