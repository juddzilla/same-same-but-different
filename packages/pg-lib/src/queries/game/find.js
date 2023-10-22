import Database from '../../connection/instance';

export default async ({ publicHash }) => {
  const statement = `
    SELECT
      games.completed_at,
      games.duration,
      games.discoverable,
      games.player_id,
      games.players,
      games.public_hash as id,
      games.started_at,
      games.user_id,
      JSON_AGG(game_attempts.*) AS attempts,
      game_decks.deck as deck
    FROM
      games
    LEFT JOIN
      game_attempts ON games.id = game_attempts.game_id
    LEFT JOIN
      game_decks ON games.id = game_decks.game_id
    WHERE
      games.public_hash = '${publicHash}'
    GROUP BY
      games.id,
      game_decks.id
     ;
  `;

  try {
    const results = await Database.getInstance().Query(statement);
    return results[0] || {};
  } catch (e) {
    return { error: 'Find Error' };
  }
};
