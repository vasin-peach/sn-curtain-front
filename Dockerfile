# Frontend build
FROM node:8-alpine as frontend

# Create folder
RUN mkdir -p /home/ && mkdir -p /home/app && mkdir -p /home/app/sn-curtain.com

# Copy current to build folder
COPY . /home/app/sn-curtain.com

# Change workdir to build folder
WORKDIR /home/app/sn-curtain.com

# Run build
RUN yarn install
RUN yarn build