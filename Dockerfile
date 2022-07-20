FROM node:16-alpine

WORKDIR /server

COPY package.json .

RUN yarn install

COPY . .

CMD ["yarn", "start"]