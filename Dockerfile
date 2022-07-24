FROM node:16-alpine as build-stage
WORKDIR /server
COPY package.json .
RUN yarn install
COPY . .
RUN yarn build

FROM node:16-alpine
WORKDIR /server
COPY package.json .
RUN yarn install
COPY --from=build-stage /server/dist ./dist
CMD ["yarn", "start"]