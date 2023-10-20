import Database from '../../connection/instance';

export default async () => {
  const statement = `
    INSERT INTO
      users     
    (email, name)
    values
      (NULL, NULL)
    RETURNING *
     ;
  `;

  console.log('anon statement', statement);
  try {
    const results = await Database.getInstance().Query(statement);
    return results[0] || {};
  } catch (e) {
    return { error: 'Anonymous User Create Error' };
  }
};
