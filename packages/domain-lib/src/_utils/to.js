// https://github.com/scopsy/await-to-js
// to.js
export default (promise) => promise
    .then(data => [null, data])
    .catch(err => [err]);
