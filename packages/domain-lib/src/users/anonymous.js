import DB from '../interfaces/db';

export default async () => {
  try {
    const User = await DB.User.Anonymous();
    return User;
  } catch (err) {
    console.warn('Create User err', err);
  }
};