import DB from 'pg-lib';
import ENV from './environment';

const { databaseUrl } = ENV;

export default DB(databaseUrl);