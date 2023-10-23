import Domain from '../../interfaces/domain';
import ENV from '../../interfaces/environment';

const { serverCookieName, serverCookieDomain } = ENV;
const auth = async (req, res) => {
  try {
    let user = await Domain.Auth.CookieUser(req.cookies);

    if (!user) {
      // create anonymous user
      // if they register, user will be updated
      const newUser = await Domain.Users.Anonymous();
      const newSession = await Domain.Sessions.Create();
      await Domain.UserSessions.Create({ userId: newUser.id, sessionId: newSession.id });
      const expires = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
      res
        .setCookie(
            serverCookieName,
            newSession.token,
            {
              domain: serverCookieDomain,
              expires,
              httpOnly: true,
              path: '/',
              sameSite: 'none',
              secure: true,
            });
      user = newUser.id;
    }

    req.USER = user;
  } catch (err) {
    console.log('E', err);
  }
};

export default auth;
