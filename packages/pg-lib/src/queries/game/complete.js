import Database from '../../connection/instance.js';

export default async ({ publicHash }) => {
  const statement = `
    UPDATE 
      games 
    SET
      completed_at = COALESCE(games.completed_at, NOW())
    WHERE
      public_hash = '${publicHash}';
  `;

  console.log('statement', statement);
  try {
    const results = await Database.getInstance().Query(statement);
    return results[0] || {};
  } catch (e) {
    return { error: 'Complete Error' };
  }
}