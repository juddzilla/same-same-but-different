import DB from '../interfaces/db';
import Utils from '../interfaces/utils';

const { Values } = Utils.Game.ScoreUtil;
const { Game, Games } = DB;

export default async ({ id, userId }) => {
  try {
    const game = await Game.Find({ publicHash: id });
    if (!game || !game.id) {
      return { game: { id: false } };
    }

    if (game.players === 1 && game.userId !== userId) {
      return { game: { id: null } };
    }

    if (game.startedAt !== null && game.completedAt === null) {
      const gameStart = parseInt((new Date(game.startedAt).getTime()).toFixed(0));
      const willEndAt = gameStart + (game.duration * 1000);
      const now = parseInt((new Date().getTime()).toFixed(0));

      if (now >= willEndAt) {
        const completedAt = new Date(willEndAt).toISOString();
        await Games.Update({ condition: { publicHash: id }, values: { completedAt: completedAt }});
        game.completedAt = completedAt;
      }
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
        userId: user_id,
      });
    }

    game.attempts = a;
    game.score = s;

    return game;
  } catch (error) {
    console.log('ERR', error);
  }
};