import API from 'public-host-api-lib';
import ENV from './environment';
const { APIHost } = ENV;

export default API(APIHost);