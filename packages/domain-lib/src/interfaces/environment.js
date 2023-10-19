const {
  DATABASE_URL,
  SERVER_ADDRESS,
  SERVER_PORT,
  SERVER_COOKIE_DOMAIN,
  SERVER_COOKIE_NAME,
  SERVER_COOKIE_SECRET,
} = process.env;

export default {
  databaseUrl: DATABASE_URL,
  serverAddress: SERVER_ADDRESS,
  serverPort: SERVER_PORT,
  serverCookieDomain: SERVER_COOKIE_DOMAIN,
  serverCookieName: SERVER_COOKIE_NAME,
  serverCookieSecret: SERVER_COOKIE_SECRET,
}