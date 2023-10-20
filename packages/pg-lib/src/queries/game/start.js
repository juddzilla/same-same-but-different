import Database from '../../connection/instance.js';

export default async ({ publicHash }) => {
  const statement = `
    UPDATE 
      games 
    SET
      started_at = NOW()
    WHERE
      public_hash = '${publicHash}';
  `;

  try {
    const results = await Database.getInstance().Query(statement);
    return results[0] || {};
  } catch (e) {
    return { error: 'Complete Error' };
  }
}