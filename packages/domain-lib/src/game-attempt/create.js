import DB from '../interfaces/db';

const { GameAttempt } = DB;

export default async ({ attempt, correct, publicHash, userId }) => {
  try {
   await GameAttempt.Create({
     attempt,
     correct,
     publicHash,
     userId,
   });
  } catch (err) {
    console.warn('err', err);
  }
}