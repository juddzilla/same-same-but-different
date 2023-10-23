import Database from '../../connection/instance';

export default async ({ userId }) => {
  const statement = `
    SELECT
      games.completed_at,
      games.duration,
      games.player_id,
      games.players,
      games.id,
      games.public_hash,
      games.started_at,
      games.user_id,
      JSON_AGG(game_attempts.*) AS attempts
    FROM
      games
    LEFT JOIN
      game_attempts ON games.id = game_attempts.game_id
    WHERE
      (games.user_id = '${userId}' OR games.player_id = '${userId}')
      AND
      (games.started_at IS NOT NULL AND games.completed_at IS NOT NULL)
    AND
    game_attempts.attempt IS NOT NULL
      GROUP BY
      games.id
     ;
  `;
  try {
    const results = await Database.getInstance().Query(statement);
    return results || [];
  } catch (e) {
    return { error: 'Find Error' };
  }
};
