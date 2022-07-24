FROM node:16-alpine as build-stage

WORKDIR /server

COPY package.json .

RUN yarn install

COPY ./src .

CMD ["yarn", "build"]

FROM node:16-alpine

COPY --from=build-stage /server/dist /

CMD ["yarn", "start"]