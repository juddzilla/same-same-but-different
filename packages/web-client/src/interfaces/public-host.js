import API from 'public-host-api-lib';
const PublicHostUrl = document.querySelector('meta[name=api]');

export default API(PublicHostUrl.content);