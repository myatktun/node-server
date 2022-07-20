FROM node:16.16-alpine AS base
WORKDIR /app
COPY package.json yarn.lock ./

FROM base as dev
RUN yarn install && yarn cache clean
CMD ["yarn", "dev"]

FROM base AS prod
RUN yarn install --production && yarn cache clean
COPY . .
CMD ["node", "/app/src/server.js"]
