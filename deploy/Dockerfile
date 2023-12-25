ARG NODE_VERSION=18.18.0

FROM node:${NODE_VERSION} as base

ARG PORT=3000

ENV NODE_ENV=production

WORKDIR /src

# Build
FROM base as build

RUN yarn -v || npm install -g yarn
COPY --link package.json yarn.lock ./
RUN yarn install --production=false

COPY --link . .

RUN yarn build

# Run
FROM base

ENV PORT=$PORT

COPY --from=build /src/.output /src/.output
# Optional, only needed if you rely on unbundled dependencies
# COPY --from=build /src/node_modules /src/node_modules

CMD [ "node", ".output/server/index.mjs" ]