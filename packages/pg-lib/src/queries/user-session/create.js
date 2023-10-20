import Create from '../../operations/create';

export default async (values) => {
  try {
    const UserSession = await Create('user_sessions', values);
    return UserSession;
  } catch (err) {
    console.warn('create user session', err);
  }
};