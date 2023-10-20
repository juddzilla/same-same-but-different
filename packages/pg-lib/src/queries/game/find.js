import Database from '../../connection/instance';

export default async ({ publicHash }) => {
  const statement = `
    SELECT
      games.completed_at,
      games.duration,
      games.id,
      games.player_id,
      games.players,
      games.started_at,
      games.user_id,
      ARRAY_AGG(game_attempts.attempt) as attempts,
      ARRAY_AGG(game_decks.deck) as deck
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
      game_attempts.attempt::TEXT,
      game_decks.deck::TEXT
     ;
  `;

  try {
    const results = await Database.getInstance().Query(statement);
    return results[0] || {};
  } catch (e) {
    return { error: 'Find Error' };
  }
};
