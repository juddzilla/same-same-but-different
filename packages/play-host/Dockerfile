FROM node:18-alpine as build

WORKDIR /app

COPY package.json .
COPY yarn.lock .

COPY ./packages/play-host/ ./packages/play-host/
COPY ./packages/domain-lib/ ./packages/domain-lib/
COPY ./packages/utils-lib/ ./packages/utils-lib/

WORKDIR /app/packages/play-host/

RUN yarn install --pure-lockfile --non-interactive
RUN yarn build

FROM node:18-alpine

COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/yarn.lock /app/yarn.lock

COPY --from=build /app/packages/domain-lib/package.json /app/packages/domain-lib/package.json
COPY --from=build /app/packages/domain-lib/index.js /app/packages/domain-lib/index.js
COPY --from=build /app/packages/domain-lib/src /app/packages/domain-lib/src

COPY --from=build /app/packages/utils-lib/package.json /app/packages/utils-lib/package.json
COPY --from=build /app/packages/utils-lib/index.js /app/packages/utils-lib/index.js
COPY --from=build /app/packages/utils-lib/src /app/packages/utils-lib/src

COPY --from=build /app/packages/play-host/package.json /app/packages/play-host/package.json
COPY --from=build /app/packages/play-host/index.js /app/packages/play-host/index.js
COPY --from=build /app/packages/play-host/src /app/packages/play-host/src

WORKDIR /app/packages/play-host
RUN yarn install --pure-lockfile --non-interactive

CMD ["yarn", "run",  "start:prod"]
