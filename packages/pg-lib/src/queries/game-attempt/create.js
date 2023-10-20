import Database from '../../connection/instance';

export default async ({ publicHash, userId, attempt, correct }) => {
  const statement = `
    INSERT INTO
      game_attempts
      (game_id, user_id, attempt, correct)
    SELECT
      games.id, ${userId}, ${attempt}, ${correct}
    FROM
        games
    WHERE
      games.public_hash = '${publicHash}' 
  `;

  try {
    const results = await Database.getInstance().Query(statement);
    return results[0] || {};
  } catch (e) {
    return { error: 'Find Error' };
  }
}