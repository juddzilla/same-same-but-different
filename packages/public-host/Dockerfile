FROM node:18-alpine as build

WORKDIR /app

COPY package.json .
COPY yarn.lock .

COPY ./packages/public-host/ ./packages/public-host/
COPY ./packages/domain-lib/ ./packages/domain-lib/
COPY ./packages/pg-lib/ ./packages/pg-lib/
COPY ./packages/utils-lib/ ./packages/utils-lib/

FROM node:18-alpine

COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/yarn.lock /app/yarn.lock

COPY --from=build /app/packages/domain-lib/package.json /app/packages/domain-lib/package.json
COPY --from=build /app/packages/domain-lib/index.js /app/packages/domain-lib/index.js
COPY --from=build /app/packages/domain-lib/src /app/packages/domain-lib/src

COPY --from=build /app/packages/pg-lib/package.json /app/packages/pg-lib/package.json
COPY --from=build /app/packages/pg-lib/index.js /app/packages/pg-lib/index.js
COPY --from=build /app/packages/pg-lib/src /app/packages/pg-lib/src

COPY --from=build /app/packages/utils-lib/package.json /app/packages/utils-lib/package.json
COPY --from=build /app/packages/utils-lib/index.js /app/packages/utils-lib/index.js
COPY --from=build /app/packages/utils-lib/src /app/packages/utils-lib/src

COPY --from=build /app/packages/public-host/package.json /app/packages/public-host/package.json
COPY --from=build /app/packages/public-host/index.js /app/packages/public-host/index.js
COPY --from=build /app/packages/public-host/src /app/packages/public-host/src

WORKDIR /app/packages/public-host
RUN yarn install --pure-lockfile --non-interactive

CMD ["yarn", "run",  "start:prod"]
