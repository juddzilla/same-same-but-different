import path from 'path';
import Utils from '../interfaces/utils-lib';

const paths = path.join(process.cwd(), 'src', 'routes', '*', '*.js');

export default async () => {
  const filepaths = await Utils.FindFilesInDir(paths);
  const routes = await Promise.all(filepaths.map(async (handler) => {
    const config = await import(handler);

    if (config) {
      return config.default;
    }
    return null;
  }));

  return routes.filter(Boolean);
};