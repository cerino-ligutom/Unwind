FROM node:lts-alpine

WORKDIR /usr/src/app

# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md#node-gyp-alpine
RUN apk add --no-cache --virtual .gyp python make g++

COPY package*.json ./

RUN npm install

# Copy files from host to container
COPY ./ ./

RUN ls -al

EXPOSE 3000

CMD [ "npm", "start" ]