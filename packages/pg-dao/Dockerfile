FROM node:18-alpine as build

WORKDIR /app

COPY package.json .
COPY yarn.lock .

COPY ./packages/pg-dao/ ./packages/pg-dao/

FROM node:18-alpine

COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/yarn.lock /app/yarn.lock

COPY --from=build /app/packages/pg-dao/package.json /app/packages/pg-dao/package.json
COPY --from=build /app/packages/pg-dao/migrations/ /app/packages/pg-dao/migrations/
COPY --from=build /app/packages/pg-dao/src/ /app/packages/pg-dao/src/

WORKDIR /app/packages/pg-dao
RUN yarn install --pure-lockfile --non-interactive

CMD ["yarn", "run",  "migrate:up:prod"]
