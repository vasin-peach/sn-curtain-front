# Frontend build
FROM node:9-alpine as frontend

WORKDIR /home/app/sn-curtain.com

COPY ./package.json /home/app/sn-curtain.com
RUN yarn install

COPY . /home/app/sn-curtain.com
RUN yarn build

CMD ["/bin/bash"]


# Backend build
# FROM node:8-alpine

# RUN mkdir -p /home/app/sn-curtain.com/backend

# # Create folder
# RUN mkdir -p /home/ && mkdir -p /home/app && mkdir -p /home/app/sn-curtain.com

# # Copy current to build folder
# COPY . /home/app/sn-curtain.com

# # Change workdir to build folder
# WORKDIR /home/app/sn-curtain.com

# # Run build
# RUN yarn install
# RUN yarn build