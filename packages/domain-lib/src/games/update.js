import DB from '../interfaces/db';

const { Games } = DB;

export default async ({ publicHash, ...rest }) => {
  try {
    const game = await Games.Update({
      condition: { publicHash },
      values: { ...rest },
    });

    return game;
  } catch (err) {
    console.warn('update game error', err);
    return false;
  }
};