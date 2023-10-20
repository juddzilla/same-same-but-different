import StatementBuilder from './statement_builder';
import Database from '../connection/instance';

export default async function Create(table, values) {
  const statement = StatementBuilder.Insert({ table, values });
  console.log('statement', statement);
  const query = await Database.getInstance().Query(statement);
  console.log('query', query);
  if (Array.isArray(query)) {
    return query[0];
  } else {
    return query;
  }
}
