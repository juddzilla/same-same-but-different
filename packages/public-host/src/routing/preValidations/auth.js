import Domain from '../../interfaces/domain';

const auth = async (req, res) => {
  try {
    const user = await Domain.Auth.CookieUser(req.cookies);
    console.log('user', user);
    if (!user) {
      return res.status(401).send({ success: false });
    }

    req.USER = user;
  } catch (err) {
    console.log('E', err);
  }
};

export default auth;
