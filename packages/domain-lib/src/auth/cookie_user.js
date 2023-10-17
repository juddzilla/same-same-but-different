// import Cache from '../interfaces/cache';
import UserSessions from '../user-sessions';
import ENV from '../interfaces/environment';
const { serverCookieName } = ENV;

// const { AuthToken } = Cache;

export default async function tokens(tokens) {
  if (!tokens) {
    return false;
  }

  const token = tokens[serverCookieName];

  if (!token) {
    return 1000;
    // return false;
  }

  // BELOW IS FOR CHECKING AGAINST MEMORY CACHE FOR USER
  // const user = await AuthToken.check(token);
  // if (user) {
  //   return user;
  // }
  //
  // if (!user) {
    try {
      const session = await UserSessions.Find({ token });
      if (!session) {
        return false;
      }
      return session.userId;
    } catch (err) {
      console.log('ERR', err);
      return false;
    }
  // }
}