import DB from '../interfaces/db';
const { Sessions } = DB;
import { nanoid } from 'nanoid';

export default async () => {
  const token = nanoid();
  try {
    const Session = await Sessions.Create({ token });
    return Session;
  } catch (err) {
    console.warn('User Session Creare Err', err);
  }
};