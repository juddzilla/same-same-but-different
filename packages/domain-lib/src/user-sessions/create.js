import DB from '../interfaces/db';
const { UserSession } = DB;


export default async ({ sessionId, userId }) => {
  try {
    const newUserSession = await UserSession.Create({ userId, sessionId });
    return newUserSession;
  } catch (err) {
    console.warn('User Session Creare Err', err);
  }
}