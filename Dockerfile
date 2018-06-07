# Frontend build
FROM node:alpine as frontend

WORKDIR /home/app/sn-curtain.com
COPY . ./
WORKDIR /home/app/sn-curtain.com/frontend

RUN yarn install
RUN yarn build

# Runner build
FROM node:alpine

WORKDIR /home/app/sn-curtain.com

COPY . ./

RUN rm - rf frontend

RUN mkdir frontend

COPY --from=frontend /home/app/sn-curtain.com/frontend/dist ./frontend

RUN yarn install

EXPOSE 5000

CMD [ "yarn", "start" ]