import StatementBuilder from './statement_builder';
import Database from '../connection/instance';

export default async function list(table, conditions, returning) {
  const condition = conditions && Object.keys(conditions).length ? conditions : null;
  const statement = StatementBuilder.Select({ table, condition, returning });
  const query = await Database.getInstance().Query(statement);
  return query;
}
