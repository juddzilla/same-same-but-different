/* eslint-disable func-names */
import fastify from 'fastify';
import cookies from '@fastify/cookie';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import ENV from './interfaces/environment.js';
import Routing from './routing/server';

const { cookieSecret, serverAddress, serverPort } = ENV;

(async function () {
  const app = fastify();

  app.register(cookies, { secret: cookieSecret });
  app.register(cors, { origin: true, credentials: true });
  app.register(helmet);

  await Routing(app);

  app.listen({ port: serverPort, host: serverAddress }, (err) => {
    if (err) { throw err; }
    console.log('APP SERVER ADDRESS', app.server.address()); // eslint-disable-line
    console.log('Server listening on :', serverAddress, serverPort || app.server.address().port); // eslint-disable-line
  });
}());