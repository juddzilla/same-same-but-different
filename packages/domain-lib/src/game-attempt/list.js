import DB from '../interfaces/db';
const { GameAttempts } = DB;

export default async (gameId) => {
  try {
    const attempts = await GameAttempts.List({ gameId });
    return attempts;
  } catch (err) {
    console.warn('game attempts err', err);
  }
};