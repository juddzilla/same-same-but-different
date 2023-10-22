import DB from '../interfaces/db';

const { User } = DB;

export default async ({ userId }) => {
  const games = await User.Games({ userId });

  return games.reduce((acc, cur) => {
    const {
      attempts,
      completedAt,
      duration,
      players,
      publicHash,
    } = cur;

    acc.games.push({
      completedAt,
      duration,
      id: publicHash,
      players,
    });

    let correct = 0;
    let incorrect = 0;

    if (players === 1) {
      correct = attempts.filter(attempt => attempt.correct).length;
      incorrect = attempts.length - correct;
    } else {
      correct = attempts.filter(attempt => attempt.user_id === userId && attempt.correct).length;
      incorrect = attempts.filter(attempt => attempt.user_id === userId).length;
    }
    acc.outcomes[players.toString()].score += (correct * 10) + (incorrect * -5);
    acc.outcomes[players.toString()].attempts[0] += correct;
    acc.outcomes[players.toString()].attempts[1] += attempts.length;
    return acc;
  }, {
    games: [],
    outcomes: {
      '1': {
        score: 0,
        attempts: [0,0]
      },
      '2': {
        score: 0,
        attempts: [0,0]
      }
    }
  });
}