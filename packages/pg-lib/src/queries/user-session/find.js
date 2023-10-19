import Database from '../../connection/instance';

export default async ({ token }) => {
  const statement = `
    SELECT
      user_sessions.user_id as id     
    FROM
      user_sessions
    LEFT JOIN
      sessions ON user_sessions.session_id = sessions.id
    WHERE
      sessions.token = '${token}'
    GROUP BY
      user_sessions.user_id
     ;
  `;

  try {
    const results = await Database.getInstance().Query(statement);
    return results[0] || {};
  } catch (e) {
    return { error: 'Find Error' };
  }
};
