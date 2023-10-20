// import Cache from '../interfaces/cache';
import ENV from '../interfaces/environment';
const { serverCookieName } = ENV;
import DB from '../interfaces/db';

const { UserSession } = DB;
// const { AuthToken } = Cache;

export default async function tokens(tokens) {
  if (!tokens) {
    return false;
  }

  const token = tokens[serverCookieName];
  if (!token) {
    return false;
  }

  // BELOW IS FOR CHECKING AGAINST MEMORY CACHE FOR USER
  // const user = await AuthToken.check(token);
  // if (user) {
  //   return user;
  // }
  //
  // if (!user) {
    try {
      const session = await UserSession.Find({ token });
      if (!session) {
        return false;
      }
      return session.id;
    } catch (err) {
      console.log('ERR', err);
      return false;
    }
  // }
}