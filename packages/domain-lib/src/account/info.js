import DB from '../interfaces/db';
import ScoreValues from '../games/score-values';

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
      acc.outcomes[players.toString()].attempts[1] += attempts.length;
    } else {
      correct = attempts.filter(attempt => attempt.user_id === userId && attempt.correct).length;
      incorrect = attempts.filter(attempt => attempt.user_id === userId && !attempt.correct).length;
      acc.outcomes[players.toString()].attempts[1] += correct + incorrect;
    }
    acc.outcomes[players.toString()].score += (correct * ScoreValues.correct) + (incorrect * ScoreValues.incorrect);
    acc.outcomes[players.toString()].attempts[0] += correct;
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