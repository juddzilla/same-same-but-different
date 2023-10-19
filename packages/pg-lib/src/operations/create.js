import StatementBuilder from './statement_builder';
import Database from '../connection/instance';

export default async function Create(table, values) {
  const statement = StatementBuilder.Insert({ table, values });
  const query = await Database.getInstance().Query(statement);

  if (Array.isArray(query)) {
    return query[0];
  } else {
    return query;
  }
}
