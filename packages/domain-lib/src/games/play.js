import DB from '../interfaces/db';
import ClientUtils from '../interfaces/clients-util';

const { Values } = ClientUtils.Game.ScoreUtil;
const { Game } = DB;

export default async ({ id, userId }) => {
  try {
    const game = await Game.Find({ publicHash: id });
    if (!game || !game.id) {
      return { game: { id: false } };
    }

    if (game.players === 1 && game.userId !== userId) {
      console.log('redirect');
    }

    const attempts = game.attempts.filter(Boolean);

    const a = { mine: [], theirs: []};
    const s = { mine: 0, theirs: 0};

    for (let j = 0; j < attempts.length; j ++) {
      const { attempt, correct, created_at, user_id } = attempts[j];
      const obj = parseInt(attempts[j].user_id, 10) === parseInt(userId, 10) ? 'mine' : 'theirs';
      const addToScore = correct ? Values.correct : Values.incorrect;
      s[obj] += addToScore;
      a[obj].push({
        attempt,
        correct,
        createdAt: created_at,
      })
    }

    game.attempts = a;
    game.score = s;

    // delete game.playerId;
    // delete game.userId;

    return game;
  } catch (error) {
    console.log('ERR', error);
  }
};