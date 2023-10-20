import DB from '../interfaces/db';

const { Games } = DB;

export default async ({ publicHash, ...rest }) => {
  const game = await Games.Update({
    condition: { publicHash },
    values: { ...rest },
  });
  console.log('game', game);
  return game;
};