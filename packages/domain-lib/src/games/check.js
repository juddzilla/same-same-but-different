import DB from '../interfaces/db';

const { Games } = DB;

export default async ({ id, userId }) => {
  console.log('id', id);
  try {
    const game = await Games.Find({ publicHash: id });
    console.log(115511, game);

    if (!game || !game.id) {
      return { game: { id: false } };
    }

    if (game.players === 1 && game.userId !== userId) {
      console.log('redirect');
    }

    return game;
  } catch (error) {
    console.log('ERR', error);
  }
};