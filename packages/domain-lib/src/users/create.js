import DB from '../interfaces/db';

export default async (values) => {
  try {
    const User = await DB.Users.Create(values);
    return User;
  } catch (err) {
    console.warn('Create User err', err);
  }
};