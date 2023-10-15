import AuthPreValidation from './preValidations/auth';
import findRoutes from './files';
import PreHandlers from './preHandlers';
import Wrapper from './response/wrapper';

export default async (app) => {
  const routes = await findRoutes();
  await routes.forEach((config) => {
    if (config) {
      if (!Object.hasOwn(config, 'public')) {
        config.preValidation = AuthPreValidation;
      } else {
        delete config.public;
      }

      const handler = Object.hasOwn(config, 'handler')
          ? config.handler
          : Wrapper.bind(null, config.passthrough);

      const preHandler = PreHandlers[config.method];

      const route = {
        ...config,
        handler,
        preHandler,
      };

      app.route(route);
    }
  });
};
