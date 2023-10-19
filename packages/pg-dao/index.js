import Db from './src/connection/instance';
import Queries from './src/queries';

export default (envs) => {
  if (!Db.getInstance()) {
    Db.createInstance(envs);
  }
  console.log('Queries', Queries);

  return Queries;
}