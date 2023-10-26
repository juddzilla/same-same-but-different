import API from 'public-host';
import ENV from './environment';
const { APIHost } = ENV;

export default API(APIHost);