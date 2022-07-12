FROM node:16-alpine

WORKDIR /app
COPY package.json yarn.lock ./

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then yarn install; \
        else yarn install --production=true; \
        fi

COPY . .

ENV PORT 5000
EXPOSE $PORT

CMD ["node", "server.js"]
