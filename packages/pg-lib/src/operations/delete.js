import StatementBuilder from './statement_builder';
import Database from '../connection/instance';

export default async function Delete(table, condition) {
  const statement = StatementBuilder.Delete({ table, condition });
  const result = await Database.getInstance().Query(statement);

  return result.length;
}
