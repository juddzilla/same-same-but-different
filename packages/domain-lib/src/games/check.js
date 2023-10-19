import DB from '../interfaces/db';

const { GameAttempts, Game } = DB;

export default async ({ id, userId }) => {
  try {
    const game = await Game.Find({ publicHash: id });
    // console.log('Game', id, game, userId);
    if (!game || !game.id) {
      return { game: { id: false } };
    }

    if (![game.userId, game.playerId].includes(userId)) {
      return {
        id: false,
      };
    }

    const {
      deck,
      duration,
      players,
      startedAt,
      completedAt,
    } = game;

    // console.log('deck spit', deck.split(','));
    console.log('deck parse', typeof deck);

    const nowInUnix = parseInt((new Date().getTime() / 1000).toFixed(0));
    const startedAtPlusDuration = parseInt((new Date(startedAt).getTime() / 1000).toFixed(0)) + duration;

    if (startedAtPlusDuration < nowInUnix) {

    }
    console.log();
    console.log();
    const response = {
      deck: deck[0].split(','),
      game: {
        completedAt,
        duration,
        id,
        players,
        startedAt,
      },
    };

    const atts = game.attempts.filter(Boolean);

    const score = { mine: 0, theirs: 0};
    const attempts = { mine: [], theirs: [] };

    for (let j = 0; j < atts.length; j ++) {
      const att = atts[j];
      const key = att.userId === userId ? 'mine' : 'theirs';
      score[key] += att.correct ? 10 : -5;
      const { attempt, correct, createdAt } = att;
      attempts[key].push({
        attempt,
        correct,
        createdAt
      });
    }

    response.attempts = attempts;
    response.score = score;

    return response;
  } catch (error) {
    console.log('ERR', error);
  }
};